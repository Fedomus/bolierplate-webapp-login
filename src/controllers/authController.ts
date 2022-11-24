import apiUsuarios from '../api/apiUsuarios';
import { Response, Request } from "express";
import createPass from '../utils/passGenerator';
import enviarEmail from '../utils/enviarEmail';


export default class authController {
    public api: any

    constructor() {
        this.api = new apiUsuarios()
    }

    public async getLogin(req: Request, res: Response): Promise<any> {
        try {
            return res.render('../views/pages/login.ejs', {
                error: false
            })
        } catch(err){
            return console.log("Error en getLogin. ", err)
        }
    }

    public async postLogin(req: Request, res: Response): Promise<any> {
        try {
            const {email, contrasenia} = req.body;
            if(email && contrasenia) {
                const autorizacion: string = await this.api.comprobarAutorizacion(email, contrasenia);
                switch(autorizacion) {
                    case 'email incorrecto':
                        return res.render('../views/pages/login', {
                            error: 'Error, email incorrecto'
                        })
                    case 'contrasenia incorrecta':
                        return res.render('../views/pages/login', {
                            error: 'Error, contraseña incorrecta'
                        })
                    case 'contrasenia correcta':
                        req.session.email = email;
                        req.session.usuarioLogueado= true;
                        req.session.save()
                        return res.redirect('/home')
                }
            }  else {
                return res.render('../views/pages/login', {
                    error: 'Debe completar todos los campos.'
                })
            }
        } catch(err) {
            console.log('Error en postLogin. ', err);
            return;
        }
    }

    public async getSignUp(req: Request, res: Response): Promise<any> {
        try {
            return res.render('../views/pages/signup', {
                error: false,
                mensaje: null
            })
        } catch(err) {
            return console.log('Error en getSignUp. ', err);
        }
    }

    public async postSignUp(req: Request, res: Response): Promise<any> {
        try {
            const email: string | null = req.body.email;
            if(email) {
                const contrasenia: string = createPass(8);
                return await this.api.agregarUsuario(email, contrasenia)
                .then(async (result: boolean): Promise<any> => {
                    if(result) {
                        const emailEnviado: boolean = await enviarEmail(email, contrasenia);
                        if(emailEnviado){
                            return res.render('../views/pages/login', {
                                error: false, 
                                mensaje: 'Se le fue enviada la contraseña a su dirección de email.'
                            });
                        } else {
                            return res.render('../views/pages/signup', {
                                error: true, 
                                mensaje: 'Hubo un error al intentar enviarle el mail.'
                            });
                        }
                    } else {
                        return res.render('../views/pages/signup', {
                            error: true, 
                            mensaje: 'Ya existe un usuario registrado con ese email.'
                        });
                    }
                });
            } else {
                return res.render('../views/pages/signup', {
                    error: true, 
                    mensaje: 'Debe completar todos los campos.'
                });
            }
        } catch(err) {
            return console.log('Error en postSignUp. ', err);
        }
    }
    
}
