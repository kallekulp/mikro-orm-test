import 'dotenv/config';

import { MySqlDriver, ReflectMetadataProvider, Options } from '@mikro-orm/mysql';

import * as entities from './entities'

const mikroOrmConfig = {
  user: 'root',
  host: 'localhost',
  password: '1234',
  dbName: 'mikro_orm_test',
  port: 6603,
  debug: true,
  driver: MySqlDriver,
  entities: Object.values(entities),
  metadataProvider: ReflectMetadataProvider,
  allowGlobalContext: true,
  migrations: {
    tableName: 'migration',
    path: './libs/database/src/lib/migrations',
    snapshot: true
  },
  seeder: {
    path: './seeders',
    pathTs: './seeders',
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className
  }
} as Options

export default mikroOrmConfig;
