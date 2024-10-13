import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateTrainingDto {
    @IsNotEmpty()
    @MaxLength(255) // Assuming 255 characters max for title
    titre: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    instructor: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsEnum(['online', 'hybrid', 'presentiel'])
    type: 'online' | 'hybrid' | 'presentiel';

    @IsArray()
    @IsString({ each: true }) 
    targetAudience: string[];

    @IsNotEmpty()
    @IsNumber()
    numberOfDays: number;

    @IsEnum(['brouillon', 'publié', 'programmé'])
    statut: 'brouillon' | 'publié' | 'programmé';

    @IsDateString()
    start_date: Date;

    @IsDateString()
    end_date: Date;
}
