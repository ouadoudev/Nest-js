import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Training } from 'src/training/training.entity';
import { Repository } from 'typeorm';
import { CreateTrainingDto } from './training.dto';

@Injectable()
export class TrainingService {
    constructor(
        @InjectRepository(Training)
        private readonly trainingRepository: Repository<Training>
    ) {}

    async newTraining(createTrainingDto: CreateTrainingDto): Promise<Training> {
        const newTraining = this.trainingRepository.create(createTrainingDto);
        return await this.trainingRepository.save(newTraining);
    }

    async findAll(): Promise<Training[]> {
        return this.trainingRepository.find();
    }

    async findOne(id: number): Promise<Training> {
        const training = await this.trainingRepository.findOneBy({ id });
        if (!training) {
            throw new NotFoundException(`Training with id ${id} not found`);
        }
        return training;
    }

    async updateTraining(id: number, updateTrainingDto: CreateTrainingDto): Promise<Training> {
        const training = await this.findOne(id); 
        this.trainingRepository.merge(training, updateTrainingDto); 
        return this.trainingRepository.save(training);
    }

    async removeTraining(id: number): Promise<void> {
        const training = await this.findOne(id); 
        await this.trainingRepository.remove(training); 
    }
}
