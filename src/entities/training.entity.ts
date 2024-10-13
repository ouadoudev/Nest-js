import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('training')
export class Training {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true })
    titre: string; 

    @Column({ type: 'text' })
    description: string; 

    @Column()
    instructor: string;
  
    @Column()
    location: string;

    @Column()
    type: 'online' | 'hybrid' | 'presentiel';

    @Column('text', { array: true })
    targetAudience: string[];
  
    @Column()
    numberOfDays: number;
  
    @Column()
    statut: 'brouillon' | 'publié' | 'programmé';

    @Column({ type: 'date' })
    start_date: Date;

    @Column({ type: 'date' })
    end_date: Date; 

}