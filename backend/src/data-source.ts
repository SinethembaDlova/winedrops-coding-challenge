import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './db/winedrops.db',
  synchronize: true,
  logging: true,
  entities: ['src/entity/*.ts'],
});
