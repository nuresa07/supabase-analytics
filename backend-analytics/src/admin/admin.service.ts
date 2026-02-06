import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class AdminService {

  private supabaseAdmin = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  async getAllUsers() {
    const { data, error } = await this.supabaseAdmin.auth.admin.listUsers();

    if (error) {
      console.error('❌ Supabase Admin Error:', error.message)
      throw new Error(error.message);
    }

    return data.users;
  }

  async updateUserRole(userId: string, role: string) {
    const { data, error } = await this.supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: {
        role: role
      }
    })
    // userid
    if (error) {
      console.error('❌ Failed to update user role:', error.message);
      throw new Error(error.message);
    }

    return {
      message: 'Role updated',
      user: data
    }
  }

}
