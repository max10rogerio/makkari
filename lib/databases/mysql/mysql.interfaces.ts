import { IDatabaseConfigs } from "../interfaces/databases.interface";

export interface IMySQLConfigs extends IDatabaseConfigs { }

export interface IMySQLDriver {
  execute: <R = any>(query: string) => Promise<[R[], any]>;
}