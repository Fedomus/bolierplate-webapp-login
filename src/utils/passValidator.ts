import bcrypt from 'bcrypt';
import {IUser} from '../interfaces/IUser';

export default function contraseniaValida(user: IUser, contrasenia: string) {
    return bcrypt.compareSync(contrasenia, user.contrasenia)
}

