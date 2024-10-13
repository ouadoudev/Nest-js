import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './training.dto';
import { Training } from 'src/training/training.entity';

@Controller('trainings')
export class TrainingController {
    constructor(private readonly trainingService: TrainingService) {}

    @Post()
    async create(@Body() createTrainingDto: CreateTrainingDto): Promise<Training> {
        return await  this.trainingService.newTraining(createTrainingDto);
    }

    @Get()
    findAll(): Promise<Training[]> {
        return this.trainingService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Training> {
        return this.trainingService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateTrainingDto: CreateTrainingDto): Promise<Training> {
        return this.trainingService.updateTraining(id, updateTrainingDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.trainingService.removeTraining(id);
    }
}
