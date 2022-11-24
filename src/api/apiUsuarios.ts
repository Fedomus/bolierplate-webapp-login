import {usuariosDAO} from '../models/DAOs/usuariosDAO';

export default class apiUsuarios {
    dao: usuariosDAO;

    constructor(){
        this.dao = new usuariosDAO()
    }

    public async comprobarAutorizacion(email: string, contrasenia: string): Promise<any> {
        try {
            const existeUsuario: boolean = await this.dao.validarEmail(email);
            if(existeUsuario){
                const contraseniaValida: boolean = await this.dao.validarContrasenia(email, contrasenia);
                if(contraseniaValida) {
                    return 'contrasenia correcta'
                } 
                return 'contrasenia incorrecta'
            }
            return 'email incorrecto'
        } catch(err) {
            return console.log('Error en comprobarAutorizacion. ', err);
        }
    }

    public async agregarUsuario(email: string, contrasenia: string) {
        const existeUsuario: any = await this.dao.validarEmail(email);
        if(!existeUsuario){
            await this.dao.agregarUsuario(email, contrasenia)
            return true
        } else {
            return false
        }
    }

}