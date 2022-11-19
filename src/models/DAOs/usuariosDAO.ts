import contenedorMongo from '../containers/contenedorMongo';
import {usuariosModel} from '../usuariosModel';

export class usuariosDAO extends contenedorMongo {
    public id: number;

    constructor() {
        super(usuariosModel)
        this.id = 1; 
    }

}