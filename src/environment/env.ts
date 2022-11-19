import { IEnv } from "../interfaces/IEnv";

export const ENV:IEnv = {
    stage: process.env.NODE_ENV,
    port: process.env.PORT ?? 8080,
    db: {
        uri: process.env.MONGO_URI
    }
    
}