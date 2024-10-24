import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MasterWine } from './MasterWine';

@Entity('wine_product')
export class WineProduct {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'float' })
  price!: number;

  @ManyToOne(() => MasterWine)
  master_wine!: MasterWine;
}


