import express, { Application } from "express";
import mongoose from "mongoose";
import {IRouter} from '../src/interfaces/IRouter';

declare module 'express-session' {
    interface SessionData {
        loggedUser?: boolean;
        loggedAdmin?: boolean; 
        userId?: number;
    }
}

export class App {
    public app: Application;

    constructor(

        private port: number,
        middleware: Array<any>,
        routers: Array<IRouter>,
        private staticPath: string = "/public"
    
    ) {
        
        this.app = express();

        this.middleware(middleware);

        this.routes(routers);

        this.assets(this.staticPath);
    }


    private middleware(mware: any[]) {
        mware.forEach((m) => {
            this.app.use(m);
        });
    }

    public addMiddleWare(middleWare: any) {
        this.app.use(middleWare);
    }

    private routes(routes: Array<IRouter>) {
        routes.forEach((r) => {
            this.app.use(r.path, r.name);
        });
    }


    private assets(path: string) {
        this.app.use(express.static(path));
    }


    public mongoDB(uri: string) {
        const connect = () => {
            mongoose.connect(uri)
            .then(() => {
                return;
            })
            .catch((error) => {
                console.log("Falló la conexión a la Base de Datos \n", error);
                return process.exit(1);
            });
        };
        connect();

        mongoose.connection.on("disconnected", connect);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log("Aplicación escuchando en puerto ", this.port);
        });
    }
}
