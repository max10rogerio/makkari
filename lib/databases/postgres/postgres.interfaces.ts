import { IDatabaseConfigs } from '../interfaces/databases.interface'

export interface IPostgresConfigs extends IDatabaseConfigs {
  min: number
  max: number
}

export interface IPostgresDriver {
  connect: () => Promise<any>;
  query<R = any>(queryString: string): Promise<{ rows: R[] }>;
}
