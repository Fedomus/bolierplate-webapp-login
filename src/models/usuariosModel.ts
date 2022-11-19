import {Model, Schema, model} from 'mongoose';
import {IUser} from '../interfaces/IUser'

type usuariosModelType = Model<IUser>;

const UsuarioSchema = new Schema<IUser, usuariosModelType>({
    id: {type: Number, required: true},
    email: {type: String, required: true, max: 100},
    password: {type: String, required: true}
});

export const usuariosModel: usuariosModelType = model<IUser, usuariosModelType>('usuarios', UsuarioSchema);