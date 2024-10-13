import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Curriculum } from './curriculum.entity';

@Entity()
export class Training {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  durationInDays: number;

  @Column()
  location: string;

  @Column()
  trainer: string;

  @Column()
  type: string;

  @Column()
  status: string;

  @Column()
  thumbnail: string;

  @Column("simple-array")
  targetAudience: string[];

  @OneToOne(() => Curriculum, { cascade: true, eager: true })
  @JoinColumn()
  curriculum: Curriculum;
}
