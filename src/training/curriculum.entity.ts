import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Training } from './training.entity'; 
import { Activity } from './activity.entity'; 

@Entity()
export class Curriculum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: number;

  @ManyToOne(() => Training, training => training.curriculum)
  training: Training; 

  @OneToMany(() => Activity, activity => activity.curriculum, { cascade: true })
  activities: Activity[];
}
