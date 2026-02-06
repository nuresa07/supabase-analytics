import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AdminService } from './admin.service';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(SupabaseAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get('users')
  @Roles('admin')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Patch('users/:id')
  @Roles('admin')
  async updateUserRole(
    @Param('id') id: string,
    @Body('role') role: string,
  ) {
    return this.adminService.updateUserRole(id, role);
  }



}
