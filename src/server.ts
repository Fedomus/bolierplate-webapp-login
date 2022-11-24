import { ENV } from "./environment/env";
import { App } from "./app";
import { middlewareGlobal } from "./middlewares/middlewareGlobal";
import Routes from "./routes/routes";

const routes = new Routes()

const port: number = ENV.port;

let dbConString: string | null;

try {
    dbConString = ENV.mongo_uri;
} catch {
    dbConString = null
    console.log("Error al obtener la URI de MongoDB");
}

const app = new App(
    port,
    middlewareGlobal,
    [
        {path: '/auth', name: routes.auth()},
        {path:'/', name: routes.root()},
        {path: '/api/turnos', name: routes.turnos()}
    ]
);

dbConString ? app.connectDB(dbConString) : console.log(
    "El servidor no se conectó a la Base de Datos porque no fue ingresada la variable de entorno correspondiente."
);

app.start();
