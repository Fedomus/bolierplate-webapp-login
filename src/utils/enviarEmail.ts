import nodemailer from 'nodemailer';
import {ENV} from '../environment/env';

export default async function enviarEmail(email: string, contrasenia: string): Promise<boolean> {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'turnomapache@gmail.com',
            type: 'OAuth2',
            clientId: ENV.client_id,
            clientSecret: ENV.client_secret,
            refreshToken: ENV.refresh_token,
            accessToken: ENV.acces_token
        }
    });
    const opcionesMail = {
        from: 'turnomapache@gmail.com',
        to: email,
        subject: `turnoMapache - Alta de usuario`,
        html: `
        <h3>Bienvenido/a!</h3>
        <br>
        <p>Le informamos que fue dado/a de alta con éxito, y su contraseña generada aleatoriamente es la siguiente: ${contrasenia}</p>
        <br>
        <p style='font-size: large;'>turnoMapache</p>
        `
    }
    try {
        await transporter.sendMail(opcionesMail)
        return true
    } catch(err) {
        console.log('Error en enviarEmail. ', err);
        return false
    }
}




