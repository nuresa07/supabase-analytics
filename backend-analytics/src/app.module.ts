import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalyticsModule } from './analytics/analytics.module';
import { ConfigModule } from '@nestjs/config';
import { DashboardController } from './dashboard/dashboard.controller';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './common/guards/roles.guard';
import { AuthController } from './auth/auth.controller';
import { AdminModule } from './admin/admin.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AnalyticsModule,
    AdminModule,
    BlogModule,
  ],
  controllers: [AppController, DashboardController, AuthController],
  providers: [
    AppService
  ],
})
export class AppModule { }
