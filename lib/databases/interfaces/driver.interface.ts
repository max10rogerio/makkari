export interface IDriver {
  readonly client: any;

  connect<P, T>(connectionParams: P): T;
  loadDriver(): any;
  sendQuery<T = any>(query: string): Promise<T[]>;
}