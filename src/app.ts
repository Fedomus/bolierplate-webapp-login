import express, { Application } from "express";
import mongoose from "mongoose";
import {IRouter} from '../src/interfaces/IRouter';

declare module 'express-session' {
    interface SessionData {
        usuarioLogueado?: boolean;
        adminLogueado?: boolean; 
        email?: string;
    }
}

export class App {
    public app: Application;
    public middleware: any[];
    public routers: IRouter[];

    constructor(

        private port: number,
        middleware: any[],
        routers: IRouter[],
        private staticPath: string = "/public",
    
    ) {
        
        this.app = express();
        this.middleware = middleware;
        this.routers = routers;

    }

    public start(){
        this.startMiddleware(this.middleware);

        this.startRouters(this.routers);

        this.assets(this.staticPath);

        this.setTemplateEngine();

        this.listen();
    }


    private startMiddleware(mware: any[]) {
        mware.forEach((m) => {
            this.app.use(m);
        });
    }

    public addMiddleWare(middleWare: any[]) {
        this.app.use(middleWare);
    }

    private startRouters(routers: IRouter[]) {
        routers.forEach((r) => {
            this.app.use(r.path, r.name);
        });
    }


    private assets(path: string) {
        this.app.use(express.static(path));
    }

    private setTemplateEngine() {
        this.app.set('view engine', 'ejs');
        this.app.set('views', './src/views');
    }

    public connectDB(uri: string) {
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
