import express from 'express';
import authController from "../controllers/authController";
import {Request, Response} from 'express'

const controller: authController = new authController()
const router = express.Router();

export default class authRouter {
    controller: authController

    constructor(){
        this.controller = new authController()
    }

    public start(): express.Router {

        router.get('/', (req: Request,res: Response) => {controller.getRoot(req, res)})
        router.get('/login', (req: Request, res: Response) => { controller.getLogin(req,res)})
        router.get('/signup', (req: Request, res: Response) => { controller.getSignUp(req, res)})

        return router
    }

}

