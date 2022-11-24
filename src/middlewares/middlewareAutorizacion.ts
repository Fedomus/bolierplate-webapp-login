import {Request, Response} from 'express';

export default function middlewareAutorizacion(req: Request, res: Response, next: any) {
    if(req.session.usuarioLogueado){
        next()
    } else {
        return res.redirect('/')
    }
}