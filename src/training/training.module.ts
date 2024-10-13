import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from 'src/training/training.entity';
import { Curriculum } from './curriculum.entity';
import { Activity } from './activity.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Training, Curriculum,Activity])],
  controllers: [TrainingController],
  providers: [TrainingService]
})
export class TrainingModule {}
