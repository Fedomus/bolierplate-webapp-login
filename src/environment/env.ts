import { IEnv } from "../interfaces/IEnv";
import dotenv from "dotenv"

dotenv.config()

export const ENV:IEnv = {
    stage: process.env.NODE_ENV,
    port: process.env.PORT ?? 8080,
    mongo_uri: process.env.MONGO_URI,
    client_secret: process.env.CLIENT_SECRET,
    client_id: process.env.CLIENT_ID,
    refresh_token: process.env.REFRESH_TOKEN,
    acces_token: process.env.ACCES_TOKEN,
    tiempo_expiracion: process.env.TIEMPO_EXPIRACION ? parseInt(process.env.TIEMPO_EXPIRACION) : 100000
}