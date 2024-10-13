import { IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateActivityDto } from './activity.dto';

export class CreateCurriculumDto {
  @IsInt()
  totalDays: number;

  @ValidateNested({ each: true })
  @Type(() => CreateActivityDto)
  activities: CreateActivityDto[];
}
