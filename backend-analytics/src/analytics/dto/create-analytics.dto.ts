import { IsDateString, IsNumber, IsOptional } from "class-validator";

export class CreateAnalyticsDto {
  @IsDateString()
  date: string;

  @IsNumber()
  users: number;

  @IsNumber()
  revenue: number;

  @IsOptional()
  @IsNumber()
  session_duration?: number;

  @IsOptional()
  @IsNumber()
  active_users?: number;

  @IsNumber()
  @IsOptional()
  revenue_growth?: number;

  @IsOptional()
  @IsNumber()
  conversion_rate?: number;
}