import { Databases } from '../makkari/interfaces/makkari.interface';

import { Postgres } from './postgres/postgres.module';
import { IDatabase } from './interfaces/databases.interface';
import { MySQL } from './mysql/mysql.module';

type InstanceOfDriver = MySQL | Postgres;

export class Database {
  private readonly driver: InstanceOfDriver;

  constructor(databaseConfig: IDatabase) {
    this.driver = this.loadDriver(databaseConfig);
  }

  private loadDriver(databaseConfig: IDatabase) {
    switch (databaseConfig.type) {
      case Databases.MYSQL:
        return new MySQL(databaseConfig.config);
      default:
        return new Postgres({ ...databaseConfig.config, min: 1, max: 10 });
    }
  }

  public sendQuery<T = any>(query: string) {
    return this.driver.sendQuery<T>(query);
  }
}
