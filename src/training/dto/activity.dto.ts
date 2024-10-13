import { IsInt, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsInt()
  dayNumber: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}
