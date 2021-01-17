import { User } from '../entities/user-entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import {
  ConfigService,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} from '../config/config.service';
import { TokenCache } from 'src/entities/token-cache-entity';
import { ToDoList } from 'src/entities/to-do-list-entity';
export const DEFAULT = 'default';

export function connectTypeORM(config: ConfigService): MysqlConnectionOptions {
  return {
    type: 'mysql',
    host: config.get(MYSQL_HOST),
    port: 3306,
    username: config.get(MYSQL_USER),
    password: config.get(MYSQL_PASSWORD),
    database: config.get(MYSQL_DATABASE),
    entities: [User, TokenCache, ToDoList],
    synchronize: false,
    logging: false,
  };
}
