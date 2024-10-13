import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Curriculum } from './curriculum.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dayNumber: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @ManyToOne(() => Curriculum, (curriculum) => curriculum.activities)
  curriculum: Curriculum;
}
