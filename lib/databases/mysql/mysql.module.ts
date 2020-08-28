import { IDriver } from "../interfaces/driver.interface";

import { IMySQLConfigs, IMySQLDriver } from "./mysql.interfaces";

export class MySQL implements IDriver {
  readonly client: IMySQLDriver;

  constructor(mysqlConfigs: IMySQLConfigs) {
    this.client = this.connect(mysqlConfigs);
  }

  connect<IMySQLConfigs, IMySQLDriver>(connectionParams: IMySQLConfigs): IMySQLDriver {
    const driver = this.loadDriver();

    return driver.createConnection(connectionParams);
  }

  loadDriver() {
    return require('mysql2');
  }

  async sendQuery<T = any>(query: string): Promise<T[]> {
    const [rows] = await this.client.execute<T>(query);

    return rows;
  }
}