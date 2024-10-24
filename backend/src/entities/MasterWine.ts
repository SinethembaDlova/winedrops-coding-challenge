import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('master_wine')
export class MasterWine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'int' })
  vintage!: number;
}
