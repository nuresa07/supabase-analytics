import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from './supabase-auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

  @UseGuards(SupabaseAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    const user = req.user as any

    return user;
  }

}
