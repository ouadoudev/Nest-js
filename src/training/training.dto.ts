import { IsString, IsNumber, IsArray } from 'class-validator';


export class CreateTrainingDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  date: string;

  @IsString()
  location: string;

  @IsString()
  targetAudience: string;

  @IsNumber()
  numberOfDays: number;

  @IsString()
  trainer: string;

  @IsString()
  type: string;

  @IsString()
  status: string;

  @IsString()
  thumbnail: string;

}