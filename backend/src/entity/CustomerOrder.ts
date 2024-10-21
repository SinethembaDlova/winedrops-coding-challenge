import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { WineProduct } from './WineProduct';

@Entity()
export class CustomerOrder {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => WineProduct)
  wine_product!: WineProduct;

  @Column('int')
  quantity!: number;

  @Column('decimal')
  total_amount!: number;

  @Column()
  status!: string;
}
