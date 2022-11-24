# bolierplate-webapp-login
Plantilla de aplicación web con login en TypeScript, empleando node.js, express.js y mongoose/mongoDB 


Tecnologías empleadas

TypeScript
Express.js 
Webpack
EJS
Nodemailer
Bcrypt
Mongoose

Estructura de carpetas.

Dentro de /src, la carpeta “src/routers” administra las diferentes routers que definen las URLs que reciben los requests, mientras que la carpeta “src/controllers” contiene 
los archivos que administran las funciones de callback de esos requests, con los diferentes responses. Dentro de los responses, se renderizan los archivos que 
contiene la carpeta “views”, enviando a las views la data que el controller previamente consultó a la base de datos, invocando primero a la capa donde se encuentra 
la lógica de negocio, que es en la carpeta src/api, que a su vez invoca a los archivos DAO (Data Access Object) que se contienen en la carpeta “src/models”.

Ejecución de la aplicación

Debido a que se ignoran la carpeta node_modules y el archivo .env, el primer paso luego de descargarla, es ejecutar “npm install”, el cual instalará las dependencias 
que se encuentran en el archivo ./package.json. Lo siguiente es configurar las variables de entorno en un archivo .env correspondientes a la conexión a la base de
datos en mongoDB, y a las contraseñas del google oauth para el envío automático de emails (https://nodemailer.com/usage/using-gmail/). Finalmente, para iniciar la 
aplicación, se debe ejecutar primero "npm run build" para realizar la trnaspilación con Webpack, la cual creara el archivo "./public/bundle.js". Luego, 
el comando "npm start" inicia la aplicacion en el puerto indicado. 
