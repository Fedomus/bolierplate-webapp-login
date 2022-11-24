import { StringExpression } from "mongoose";

export interface IEnv {
      stage?: string;
      port: any;
      mongo_uri: any;
      client_id: string | undefined;
      client_secret: string | undefined;
      acces_token: string | undefined;
      refresh_token: string | undefined;
      tiempo_expiracion: number;
}