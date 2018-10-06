//vamos a declarar las constantes variables y global para
// cambiar de desarrollo a produccion facilmente


//Puerto
process.env.PORT = process.env.PORT || 3000;


//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//Base de Datos
let urlDB;
//if (process.env.NODE_ENV == 'dev') {
//    urlDB = 'mongodb://localhost:27017/metroticket';

//} else {
urlDB = 'mongodb://ale:123abc@ds157971.mlab.com:57971/metroticket';
//}

process.env.URLDB = urlDB;