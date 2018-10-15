//Puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Base de Datos
let urlDB;
urlDB = 'mongodb+srv://EventroApi:eventro123@unimet-sskkh.mongodb.net/Eventro?retryWrites=true';
process.env.URLDB = urlDB;