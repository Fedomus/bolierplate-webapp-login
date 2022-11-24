import authController from "../controllers/authController";
import rootController from '../controllers/rootController';
import {Request, Response, Router} from 'express';
import middlewareAutorizacion from '../middlewares/middlewareAutorizacion';
import turnosController from '../controllers/turnosController';

export default class Routes {

    authController: authController
    rootController: rootController
    turnosController: turnosController

    constructor(){
        this.authController = new authController()
        this.rootController = new rootController()
        this.turnosController = new turnosController()
    }

    public auth(): Router {

        const routerAuth = Router();

        routerAuth.get('/login', (req: Request, res: Response) => {this.authController.getLogin(req,res)})
        routerAuth.post('/login', (req: Request, res: Response) => {this.authController.postLogin(req,res)})
        routerAuth.get('/signup', (req: Request, res: Response) => {this.authController.getSignUp(req, res)})
        routerAuth.post('/signup', (req: Request, res: Response) => {this.authController.postSignUp(req, res)})

        return routerAuth
    }

    public root(): Router {

        const routerRoot = Router();

        routerRoot.get('/', (req, res) => {this.rootController.getRoot(req, res)})
        routerRoot.get('/home', (req, res, next) => middlewareAutorizacion(req, res, next), (req, res) => {this.rootController.getHome(req, res)})

        return routerRoot
    }

    public turnos(): Router {
        
        const routerTurnos = Router()

        routerTurnos.get('/:id?', (req, res) => {this.turnosController.obtenerTurnos(req, res)})
        routerTurnos.post('/', (req, res) => {this.turnosController.guardarTurno(req, res)})
        routerTurnos.put('/:id', (req, res) => {this.turnosController.actualizarTurno(req, res)})
        routerTurnos.delete('/:id', (req, res) => {this.turnosController.borrarTurno(req, res)})

        return routerTurnos
    }

}

