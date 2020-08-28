import { IPostgresConfigs, IPostgresDriver } from './postgres.interfaces'
// import { Client } from 'pg'
import { IDriver } from '../interfaces/driver.interface'

export class Postgres implements IDriver {
  readonly client: IPostgresDriver;

  constructor(postgresConfigs: IPostgresConfigs) {
    this.client = this.connect(postgresConfigs);
  }

  connect<IPostgresConfigs, IPostgresDriver>(connectionParams: IPostgresConfigs): IPostgresDriver {
    const pg = this.loadDriver();

    return new pg.Client(connectionParams);
  }

  loadDriver() {
    return require('pg');
  }

  async sendQuery<T = any>(query: string): Promise<T[]> {
    await this.client.connect();

    const result = await this.client.query<T>(query);
    return result.rows;
  }
}
