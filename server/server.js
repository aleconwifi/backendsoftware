const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const bodyParser = require('body-parser');
//const dbconfig = require('../config/secret');


//estos son middlewares, app.use, son funciones
//que siempre se disparan cuando pasan por estas lineas
//app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario'));
app.use(require('./routes/evento'));


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cookieParser());

app.use(cookieParser());
//app.use(logger('dev'));

mongoose.connect('mongodb://ale:abc123@ds157971.mlab.com:57971/metroticket', (err, res) => {
    if (err) throw err;
    console.log('Base de Datos ONLINE');
});

const auth = require('./routes/authRoutes');

app.use('api/eventro', auth);

//levantando el servidor
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', 3000);
});