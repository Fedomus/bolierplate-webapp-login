import session from 'express-session';
import bodyParser = require('body-parser');
import cors from 'cors';


export const middleware = [
    session({
        secret: 'mapachitos',
        resave: true,
        saveUninitialized: true
    }),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    cors()
]