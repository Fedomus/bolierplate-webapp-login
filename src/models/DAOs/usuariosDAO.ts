import contenedorMongo from '../containers/contenedorMongo';
import {usuariosModel} from '../usuariosModel';
import {IUser} from '../../interfaces/IUser'
import { createHash } from '../../utils/hashGenerator';
import contraseniaValida from '../../utils/passValidator';

export class usuariosDAO extends contenedorMongo {
    public id: number;

    constructor() {
        super(usuariosModel)
        this.id = 1; 
    }

    private async obtenerPorEmail(email: string): Promise<any> {
        try {
            return await this.model.findOne({email: email})
            .then(result => {
                if(result){
                    return result
                }
                return null
            })
        } catch(err) {
            return console.log('Error en obtenerPorEmail. ', err);
            
        }
    }

    public async validarEmail(email: string): Promise<any> {
        try {
            return await this.model.findOne({email: email})
            .then(result => {
                if(result) {
                    return true
                }
                return false
            })
        } catch(err) {
            return console.log('Error en validarEmail. ', err);
        }
    }

    public async validarContrasenia(email: string, contrasenia: string){
        const user: IUser = await this.obtenerPorEmail(email);
        if(contraseniaValida(user, contrasenia)){
            return true
        }
        return false
    }
    
    public async agregarUsuario(email: string, contrasenia: string): Promise<any> {
        try {
            const nuevoUsuario: IUser = {
                id: this.id,
                email: email,
                contrasenia: createHash(contrasenia)
            };
            await this.guardarElemento(nuevoUsuario)
            this.id = this.id + 1;
            return
        } catch(err) {
            return console.log('Error en agregarUsuario. ', err);
        }
    }
}