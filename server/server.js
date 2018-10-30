const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const bodyParser = require('body-parser');

var morgan = require('morgan'); // log requests to the console (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');




//const dbconfig = require('../config/secret');


//estos son middlewares, app.use, son funciones
//que siempre se disparan cuando pasan por estas lineas
//app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
//app.use(bodyParser.json())

app.use(require('./routes/usuario'));
app.use(require('./routes/reviews'));
app.use(require('./routes/evento'));


app.use(express.json({ limit: '50mb' }));
//app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cookieParser());


//app.use(logger('dev'));

mongoose.connect('mongodb://ale:abc123@ds157971.mlab.com:57971/metroticket', (err, res) => {
    if (err) throw err;
    console.log('Base de Datos ONLINE');
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(cors());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


const auth = require('./routes/authRoutes');
app.use('/api/eventro', auth);

//levantando el servidor
app.listen(8101, () => {
    console.log('Escuchando puerto: ', 8101);
});