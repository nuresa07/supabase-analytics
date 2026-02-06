import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { query, Request } from 'express';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { InsightQueryDto } from './dto/insight-query.dto';

@UseGuards(SupabaseAuthGuard, RolesGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) { }

  @Patch(':id')
  async updateAnalytics(
    @Param('id') id: string,
    @Body() dto: Partial<CreateAnalyticsDto>,
    @Req() req: Request
  ) {
    const user = req['user'] as { id: string }
    return this.analyticsService.updateAnalytics(id, dto, user.id)
  }

  // DELETE /analytics/:id
  @Delete(':id')
  @Roles('admin')
  async deleteAnalytics(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    const user = req['user'] as { id: string };
    return this.analyticsService.deleteAnalitcs(id, user.id);
  }

  @Get()
  async get(@Req() req: Request) {
    const user = req['user'] as { id: string, email: string };;
    return this.analyticsService.getAnalyticsByUser(user.id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createAnalytics(@Body() dto: CreateAnalyticsDto, @Req() req: Request) {
    const user = req['user'] as { id: string, email: string };
    return this.analyticsService.createAnalytics(dto, user.id)
  }

  @Get('insight')
  getInsight(@Query() query: InsightQueryDto) {
    return this.analyticsService.getInsight(query.from, query.to)
  }

  @Get("dotnet")
  async getFromDotNet() {
    return this.analyticsService.getAnalyticsFromDotNet();
  }
}



// @Get()
// async getAnalytics() {
//   return this.analyticsService.getAnalytics()
// }