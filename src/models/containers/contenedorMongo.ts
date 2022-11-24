import { Model, ObjectId } from 'mongoose';
import {IUser} from '../../interfaces/IUser'


export default class contenedorMongo {
    model: Model<IUser>;

    constructor(model: Model<IUser>) {
        this.model = model;
    }

    public async guardarElemento(elem: IUser): Promise<any> {
        try {
            return await this.model.insertMany(elem)
        } catch(err) {
            return console.log('Error en guardarElemento. ', err);
        }
    }

    public async obtenerElementos(id?: number): Promise<any> {
        try{
            if(id){
                return await this.model.findOne({id: id})
            }
            return await this.model.find({})
        } catch(err){
            return console.log("Error en obtenerElementos. ", err);
        }
    }

    public async eliminarPorId(id: number): Promise<any>{
        try{
            return await this.model.deleteOne({id: id})
        } catch(err) {
            return console.log("Error en eliminarPorId. ", err);
        }
    }

    public async actualizarPorId(id: number, elem: object): Promise<any> {
        try {
            return await this.model.updateOne({id: id}, { $set: {elem}})
        } catch(err) {
            return console.log('Error en actualizarPorId. ', err);
        }
    }

}
