import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from 'src/entities/training.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Training])],
  controllers: [TrainingController],
  providers: [TrainingService]
})
export class TrainingModule {}
