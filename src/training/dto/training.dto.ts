import { IsString, IsInt, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCurriculumDto } from './curriculum.dto';

export class CreateTrainingDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  durationInDays: number;

  @IsString()
  location: string;

  @IsString()
  trainer: string;

  @IsString()
  type: string;

  @IsString()
  status: string;

  @IsString()
  thumbnail: string;

  @IsArray()
  @IsString({ each: true })
  targetAudience: string[];

  @ValidateNested()
  @Type(() => CreateCurriculumDto)
  curriculum: CreateCurriculumDto;
}
