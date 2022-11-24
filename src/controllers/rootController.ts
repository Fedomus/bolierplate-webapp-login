import { Response, Request } from "express";

export default class rootController {
    
    public async getRoot(req: Request, res: Response): Promise<any> {
        try {
            return res.sendFile(__dirname + '/index.html')
        }catch(err) {
            return console.log('Error en getRoot. ', err);
        }
    }

    public async getHome(req: Request, res: Response): Promise<any> {
        try {
            return res.sendFile(__dirname + '/home.html')
        } catch(err) {
            return console.log('Error en getHome. ', err);
        }
    }

}