interface IMongoDBConn {
      uri: any;
}

export interface IEnv {
      stage?: string;
      port: any;
      db: IMongoDBConn;
}