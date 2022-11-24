import session from 'express-session';
import bodyParser = require('body-parser');
import cors from 'cors';
import compression from 'compression';
import MongoStore from 'connect-mongo';
import {ENV} from '../environment/env';

const mongoOptions: object = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
} 

export const middlewareGlobal: any[] = [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    cors(),
    compression(),
    session({
        store: MongoStore.create({
            mongoUrl: ENV.mongo_uri,
            mongoOptions: mongoOptions
        }),
        secret: 'mafalda',
        resave: false, 
        saveUninitialized: false,
        cookie: {
              maxAge: ENV.tiempo_expiracion
        }
    })
]