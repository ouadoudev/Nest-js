import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Training } from './entities/training.entity';
import { Curriculum } from './entities/curriculum.entity';
import { Activity } from './entities/activity.entity';
import { CreateTrainingDto } from './dto/training.dto';

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

  // Create a new training
  async newTraining(createTrainingDto: CreateTrainingDto): Promise<Training> {
    const { curriculum: curriculumDto, ...trainingData } = createTrainingDto;
    if (
      !curriculumDto ||
      !curriculumDto.activities ||
      curriculumDto.activities.length === 0
    ) {
      throw new BadRequestException(
        'Curriculum must contain at least one activity',
      );
    }

    const activities = curriculumDto.activities.map((activityDto) => {
      return this.activityRepository.create(activityDto);
    });

    const curriculum = this.curriculumRepository.create({
      totalDays: curriculumDto.totalDays,
      activities,
    });

    const newTraining = this.trainingRepository.create({
      ...trainingData,
      curriculum,
    });

    await this.trainingRepository.save(newTraining);

    return newTraining;
  }

  // Fetch all trainings with curriculum and activities
  async findAll(): Promise<Training[]> {
    return this.trainingRepository.find({
      relations: ['curriculum', 'curriculum.activities'],
    });
  }

  // Fetch a specific training by ID
  async findOne(id: number): Promise<Training> {
    const training = await this.trainingRepository.findOne({
      where: { id },
      relations: ['curriculum', 'curriculum.activities'],
    });

    if (!training) {
      throw new NotFoundException(`Training with id ${id} not found`);
    }

    return training;
  }

  // Update an existing training
  async updateTraining(
    id: number,
    updateTrainingDto: CreateTrainingDto,
  ): Promise<Training> {
    const training = await this.findOne(id);
    const { curriculum: updatedCurriculumDto, ...updatedTrainingData } =
      updateTrainingDto;

    // Update the main training fields
    Object.assign(training, updatedTrainingData);

    if (updatedCurriculumDto) {
      // Clear existing activities and replace with new ones
      await this.activityRepository.delete({
        curriculum: { id: training.curriculum.id },
      });

      const updatedActivities = updatedCurriculumDto.activities.map(
        (activityDto) => {
          return this.activityRepository.create(activityDto);
        },
      );

      // Update the curriculum entity
      Object.assign(training.curriculum, {
        totalDays: updatedCurriculumDto.totalDays,
        activities: updatedActivities,
      });

      await this.curriculumRepository.save(training.curriculum);
    }

    return this.trainingRepository.save(training);
  }

  // Remove a specific training by ID along with its curriculum and activities
  async removeTraining(id: number): Promise<void> {
    const training = await this.findOne(id);

    if (!training) {
      throw new NotFoundException(`Training with id ${id} not found`);
    }
    if (training.curriculum) {
      const curriculumId = training.curriculum.id;
      await this.activityRepository.delete({
        curriculum: { id: curriculumId },
      });
      await this.curriculumRepository.delete(curriculumId);
    }
    await this.trainingRepository.remove(training);
  }
}
