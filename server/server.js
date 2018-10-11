require('./config/config');

const express = require('express');
const mongoose = require('mongoose');


const app = express();
const bodyParser = require('body-parser');


//estos son middlewares, app.use, son funciones
//que siempre se disparan cuando pasan por estas lineas
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(require('./routes/usuario'));

mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log('BASE DE DATOS ONLINE');
});

//levantando el servidor
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', 3000);
});