import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'int', nullable: true })
  PPR: number;

  @Column({ type: 'varchar', nullable: true })
  CIN: string;

  @Column({ type: 'date', nullable: true })
  DATE_NAISSANCE: Date;

  @Column({ type: 'varchar', nullable: true })
  SITUATION: string;

  @Column({ type: 'varchar', nullable: true })
  SEXE: string;

  @Column({ type: 'varchar', nullable: true })
  SIT_F_AG: string;

  @Column({ type: 'date', nullable: true })
  DATE_RECRUTEMENT: Date;

  @Column({ type: 'date', nullable: true })
  ANC_ADM: Date;

  @Column({ type: 'varchar', nullable: true })
  COD_POS: string;

  @Column({ type: 'date', nullable: true })
  DAT_POS: Date;

  @Column({ type: 'varchar', nullable: true })
  GRADE_fonction: string;

  @Column({ type: 'varchar', nullable: true })
  GRADE_ASSIMILE: string;

  @Column({ type: 'date', nullable: true })
  DAT_EFF_GR: Date;

  @Column({ type: 'date', nullable: true })
  ANC_GRADE: Date;

  @Column({ type: 'int', nullable: true })
  ECHEL: number;

  @Column({ type: 'int', nullable: true })
  ECHELON: number;

  @Column({ type: 'int', nullable: true })
  INDICE: number;

  @Column({ type: 'date', nullable: true })
  DAT_EFF_ECHLON: Date;

  @Column({ type: 'date', nullable: true })
  ANC_ECHLON: Date;

  @Column({ type: 'varchar', nullable: true })
  AFFECTATION: string;

  @Column({ type: 'varchar', nullable: true })
  DEPARTEMENT_DIVISION: string;

  @Column({ type: 'varchar', nullable: true })
  SERVICE: string;

  @Column({ type: 'varchar', nullable: true })
  Localite: string;

  @Column({ type: 'varchar', nullable: true })
  FONCTION: string;

  @Column({ type: 'varchar', nullable: true })
  LIBELLE_SST: string;

  @Column({ type: 'date', nullable: true })
  DAT_S_ST: Date;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber: string;

  @Column({ type: 'date', nullable: true })
  lastLogin: Date;

  @Column({ type: 'int', default: 0 })
  loginCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  isActive: boolean;
}
