import {usuariosDAO} from '../models/DAOs/usuariosDAO';

export default class apiUsuarios {
    dao: usuariosDAO;

    constructor(){
        this.dao = new usuariosDAO()
    }

    public async obtenerUsuarios(): Promise<any>{
        return await this.dao.obtenerElementos()
    }

    public async obtenerUsuarioPorId(id: number): Promise<any>{
        return await this.dao.obtenerElementos(id)
    }

}