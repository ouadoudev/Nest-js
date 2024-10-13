import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Training {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column()
  location: string;

  @Column()
  targetAudience: string;

  @Column()
  numberOfDays: number;

  @Column()
  trainer: string;

  @Column()
  type: string;

  @Column()
  status: string;

  @Column()
  thumbnail: string;

}
