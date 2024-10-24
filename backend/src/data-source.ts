import { DataSource } from 'typeorm';
import { MasterWine } from './entities/MasterWine';
import { WineProduct } from './entities/WineProduct';
import { CustomerOrder } from './entities/CustomerOrder';

 export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: './backend/db/winedrops.db',
    entities: [CustomerOrder, MasterWine, WineProduct],
    synchronize: true,
  });