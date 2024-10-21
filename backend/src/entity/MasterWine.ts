import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MasterWine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  vintage: number;
}
