import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';

export class CreateActivityDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}

export class CreateCurriculumDto {
    @IsNumber()
    day: number; 

    @IsArray()
    @ValidateNested({ each: true }) 
    @Type(() => CreateActivityDto) 
    activities: CreateActivityDto[];
}

export class CreateTrainingDto {
    @IsString()
    @IsNotEmpty() 
    title: string;

    @IsString()
    @IsNotEmpty() 
    description: string;

    @IsString()
    @IsNotEmpty() 
    date: string;

    @IsString()
    @IsNotEmpty() 
    location: string;

    @IsString()
    @IsNotEmpty() 
    targetAudience: string;

    @IsNumber()
    numberOfDays: number;

    @IsString()
    @IsNotEmpty() 
    trainer: string;

    @IsString()
    @IsNotEmpty() 
    type: string;

    @IsString()
    @IsNotEmpty() 
    status: string;

    @IsString()
    @IsNotEmpty() 
    thumbnail: string;

    @IsArray()
    @ValidateNested({ each: true }) 
    @Type(() => CreateCurriculumDto) 
    curriculum: CreateCurriculumDto[];
}
