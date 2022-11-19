import apiUsuarios from '../api/apiUsuarios'
import { Response, Request } from "express";

export default class authController {
    public api: any

    constructor() {
        this.api = new apiUsuarios()
    }

    public async getRoot(req: Request, res: Response): Promise<any> {
        try {
            if (req.session.loggedUser){
                return res.sendFile(__dirname + '/home.html');
            } else {
                return res.sendFile(__dirname + '/index.html');
            }
        } catch(err){
            console.log('Error en getRoot. ', err)
        }
    }

    public async getLogin(req: Request, res: Response): Promise<any> {
        try {
            if (req.session.loggedUser){
                return res.sendFile(__dirname + '/home.html');
            } else {
                return res.sendFile(__dirname + '/login.html')
            }
        } catch(err){
            return console.log("Error en getLogin. ", err)
        }
    }

    public async getSignUp(req: Request, res: Response): Promise<any> {
        try {
            return res.sendFile(__dirname + '/signup.html')
        } catch(err) {
            return console.log('Error en getSignUp. ', err);
        }
    }
    
}
