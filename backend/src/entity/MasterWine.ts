import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MasterWine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'int' })
  vintage!: number;
}
