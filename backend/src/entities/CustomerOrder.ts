import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { WineProduct } from './WineProduct';

@Entity()
export class CustomerOrder {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  quantity!: number;

  @Column({ type: 'float' })
  total_amount!: number;

  @Column({ type: 'varchar' })
  status!: string;

  @ManyToOne(() => WineProduct)
  wine_product: WineProduct;
}
