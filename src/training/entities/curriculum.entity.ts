import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Activity } from './activity.entity';

@Entity()
export class Curriculum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalDays: number;

  @OneToMany(() => Activity, (activity) => activity.curriculum, { cascade: true, eager: true })
  activities: Activity[];
}
