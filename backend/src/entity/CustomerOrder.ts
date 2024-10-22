import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { WineProduct } from './WineProduct';

@Entity()
export class CustomerOrder {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => WineProduct)
  wine_product!: WineProduct;

  @Column({ type: 'int' })
  quantity!: number;

  @Column({ type: 'float' })
  total_amount!: number;

  @Column({ type: 'varchar' })
  status!: string;
}
