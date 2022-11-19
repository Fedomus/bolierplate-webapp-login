import { ENV } from "./environment/env";
import { App } from "./app";
import { middleware } from "./middleware";
import authRouter from "./routers/authRouter";
const routerAuth = new authRouter()

const port: number = ENV.port;
let dbConString: string | null;


try {
    dbConString = ENV.db.uri;
} catch {
    dbConString = null
    console.log("Error al obtener la URI de MongoDB");
}


const app = new App(
    port,
    middleware,
    [
        {path: '/', name: routerAuth.start()}
    ] 
);


dbConString ? app.mongoDB(dbConString) : console.log("El servidor no se conectó aún a la Base de datos.");


app.listen();
