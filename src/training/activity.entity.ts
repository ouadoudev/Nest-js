import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Curriculum } from './curriculum.entity'; 

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Curriculum, curriculum => curriculum.activities)
  curriculum: Curriculum; 
}
