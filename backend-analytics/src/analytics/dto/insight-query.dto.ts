import { IsDateString } from "class-validator";

export class InsightQueryDto {
  @IsDateString()
  from: string;

  @IsDateString()
  to: string;
}