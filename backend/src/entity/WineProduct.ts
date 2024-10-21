import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MasterWine } from './MasterWine';

@Entity()
export class WineProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MasterWine)
  master_wine: MasterWine;

  @Column()
  name: string;

  @Column('decimal')
  price: number;
}
