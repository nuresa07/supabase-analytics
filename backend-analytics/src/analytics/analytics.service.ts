import { Injectable, NotFoundException } from '@nestjs/common';
import { supabase } from '../lib/supabaseClient';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { redis } from '../lib/redis.client';


@Injectable()
export class AnalyticsService {

  private dotNetServiceUrl = process.env.DOTNET_SERVICE_URL || "http://localhost:5186";

  async getAnalytics() {
    const cacheKey = 'analytics:data';

    const cached = await redis.get(cacheKey);
    console.log("📦 [Redis GET]", cached);

    if (cached) {
      // return { source: 'cache', data: JSON.parse(cached) };
      return JSON.parse(cached);
    }

    const { data, error } = await supabase.rpc("formatted_analytics")
    if (error) throw new Error(error.message);

    await redis.set(cacheKey, JSON.stringify(data), 'EX', 300);
    console.log("📦 [Redis SET] Data cached");

    return data;
  }

  async getAnalyticsByUser(userId: string) {
    const cacheKey = `analytics:data:${userId}`;

    const cached = await redis.get(cacheKey)
    if (cached) {
      console.log('✅ Redis HIT');
      return JSON.parse(cached);
    }

    console.log('❌ Redis MISS. Fetching from Supabase...');

    const { data, error } = await supabase.rpc("formatted_analytics", {
      user_id: userId,
    });

    if (error) {
      console.error("Error fetching analytics:", error.message);
      throw new Error(error.message);
    }

    // Simpan ke cache Redis dengan key unik per user
    await redis.set(cacheKey, JSON.stringify(data));
    console.log('🟢 Redis SET for user');

    return data[0];
  }

  async createAnalytics(dto: CreateAnalyticsDto, userId: string) {
    const { error } = await supabase.from('analytics').insert([{ ...dto, created_by: userId }])

    if (error) {
      console.error("Error inserting analytics:", error);
      throw new Error(error.message);
    }

    await redis.del(`analytics:data:${userId}`);
    console.log('🗑️ Redis cache invalidated');

    return { message: 'Analytics created successfully!' }
  }


  // Edit data analytics
  async updateAnalytics(id: string, dto: Partial<CreateAnalyticsDto>, userId: string) {
    const { error, data } = await supabase
      .from('analytics')
      .update(dto)
      .eq('id', id)
      .eq('created_by', userId)
      .select()

    if (error) {
      console.error("Error updating analytics:", error);
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      throw new NotFoundException('Data tidak ditemukan atau kamu tidak punya akses');
    }

    // Refresh cache Redis
    await redis.del(`analytics:data:${userId}`);
    console.log('🗑️ Redis cache invalidated after update');

    return {
      message: 'Analytics updated successfully!',
      data: data[0]
    }
  }

  // hapus data analytics
  async deleteAnalitcs(id: string, userId: string) {
    const { error, data } = await supabase
      .from('analytics')
      .delete()
      .eq('id', id)
      .eq('created_by', userId)
      .select()

    if (error) {
      console.error("Error deleting analytics:", error);
      throw new Error(error.message);
    }

    console.log("data delete:", data);

    if (!data || data.length === 0) {
      throw new NotFoundException('Analytics not found or unauthorized');
    }

    // Refresh cache Redis
    await redis.del(`analytics:data:${userId}`);
    console.log('🗑️ Redis cache invalidated after delete');

    return { message: 'Analytics deleted successfully!' };
  }



  async getAnalyticsFromDotNet() {
    try {
      const response = await fetch(`${this.dotNetServiceUrl}/api/analytics`);
      if (!response.ok) throw new Error("Failed to fetch analytics from .NET");
      return await response.json();
    } catch (error) {
      throw new Error(`.NET API error: ${error.message}`);
    }
  }

  async getInsight(from: string, to: string) {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const durationMs = toDate.getTime() - fromDate.getTime();
    // intinya ms dua hari 

    // sebelumnya from
    const prevFrom = new Date(fromDate.getTime() - durationMs).toISOString();
    const prevTo = new Date(toDate.getTime() - durationMs).toISOString();

    // current priode
    const { data: currentData, error: currentError } = await supabase
      .from('analytics')
      .select('revenue, created_by, date')
      .gte('date', fromDate.toISOString())
      .lte('date', toDate.toISOString());

    if (currentError) throw currentError;

    // previous period = periode sebelumnya
    const { data: prevData, error: prevError } = await supabase
      .from('analytics')
      .select('revenue, created_by, date')
      .gte('date', prevFrom)
      .lte('date', prevTo);

    if (prevError) throw prevError;

    // aggregate, sum = jumlah, 
    const sum = (arr: any[], key: string) => arr.reduce((acc, item) => acc + (item[key] ?? 0), 0);
    const uniq = (arr: any[], key: string) => [...new Set(arr.map((x) => x[key]))].length;

    // total pendapatan
    const totalRevenue = sum(currentData, 'revenue');
    const totalUsers = uniq(currentData, 'created_by');

    const prevRevenue = sum(prevData, 'revenue');
    const prevUsers = uniq(prevData, 'created_by');

    const revenueGrowth = prevRevenue
      ? ((totalRevenue - prevRevenue) / prevRevenue) * 100
      : 0;

    const userGrowth = prevUsers
      ? ((totalUsers - prevUsers) / prevUsers) * 100
      : 0;

    const summaryText = `Revenue ${revenueGrowth >= 0 ? 'naik' : 'turun'} ${Math.abs(revenueGrowth).toFixed(1)}% dan user ${userGrowth >= 0 ? 'naik' : 'turun'} ${Math.abs(userGrowth).toFixed(1)}% dibanding periode sebelumnya.`;

    return {
      totalRevenue,
      totalUsers,
      revenueGrowth: +revenueGrowth.toFixed(2),
      userGrowth: +userGrowth.toFixed(2),
      summaryText,
    }
  }
}
