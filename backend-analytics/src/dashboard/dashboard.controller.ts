import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('dashboard')
export class DashboardController {
  constructor() { }

  @Get()
  @UseGuards()
  getDashboardData() {
    return { data: "dashboard data" }
  }
}
