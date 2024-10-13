import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Training } from 'src/training/training.entity';
import { Repository } from 'typeorm';
import { CreateTrainingDto } from './training.dto';
import { Curriculum } from './curriculum.entity';
import { Activity } from './activity.entity';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepository: Repository<Training>,
    @InjectRepository(Curriculum)
    private readonly curriculumRepository: Repository<Curriculum>,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async newTraining(createTrainingDto: CreateTrainingDto): Promise<Training> {
    // Ensure curriculum is defined and is an array
    if (
      !createTrainingDto.curriculum ||
      !Array.isArray(createTrainingDto.curriculum)
    ) {
      throw new Error('Curriculum must be provided and should be an array');
    }
    const newTraining = this.trainingRepository.create({
      ...createTrainingDto,
      curriculum: createTrainingDto.curriculum.map((curriculumDto) => {
        if (
          !curriculumDto.activities ||
          !Array.isArray(curriculumDto.activities)
        ) {
          throw new Error(
            `Activities for day ${curriculumDto.day} must be provided and should be an array`,
          );
        }
        const curriculum = new Curriculum();
        curriculum.day = curriculumDto.day;
        curriculum.activities = curriculumDto.activities.map((activityDto) => {
          const activity = new Activity();
          activity.title = activityDto.title;
          activity.description = activityDto.description;
          return activity;
        });

        return curriculum;
      }),
    });
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

  async updateTraining(
    id: number,
    updateTrainingDto: CreateTrainingDto,
  ): Promise<Training> {
    const training = await this.findOne(id);
    this.trainingRepository.merge(training, updateTrainingDto);
    return this.trainingRepository.save(training);
  }

  async removeTraining(id: number): Promise<void> {
    const training = await this.findOne(id);
    await this.trainingRepository.remove(training);
  }
}
