/*const express = require('express');
const mongoose = require('mongoose');
//const cookieParser = require('cookie-parser');
//const logger = require('morgan');

const app = express();
const bodyParser = require('body-parser');

var morgan = require('morgan'); // log requests to the console (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');*/


// Set up
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');


//const dbconfig = require('../config/secret');


//estos son middlewares, app.use, son funciones
//que siempre se disparan cuando pasan por estas lineas
//app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
//app.use(bodyParser.json())

app.use(require('./routes/usuario'));
//app.use(require('./routes/reviews'));
app.use(require('./routes/evento'));


//app.use(express.json({ limit: '50mb' }));
//app.use(express.urlencoded({ extended: true, limit: '50mb' }))
//app.use(cookieParser());


//app.use(logger('dev'));

mongoose.connect('mongodb://ale:abc123@ds157971.mlab.com:57971/metroticket', (err, res) => {
    if (err) throw err;
    console.log('Base de Datos ONLINE');
});



app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Models
var Review = mongoose.model('Review', {
    title: String,
    description: String,
    rating: Number
});

// Routes

// Get reviews
app.get('/api/reviews', function(req, res) {

    console.log("fetching reviews");

    // use mongoose to get all reviews in the database
    Review.find(function(err, reviews) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(reviews); // return all reviews in JSON format
    });
});

// create review and send back all reviews after creation
app.post('/api/reviews', function(req, res) {

    console.log("creating review");

    // create a review, information comes from request from Ionic
    Review.create({
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
        done: false
    }, function(err, review) {
        if (err)
            res.send(err);

        // get and return all the reviews after you create another
        Review.find(function(err, reviews) {
            if (err)
                res.send(err)
            res.json(reviews);
        });
    });

});

// delete a review
app.delete('/api/reviews/:review_id', function(req, res) {
    Review.remove({
        _id: req.params.review_id
    }, function(err, review) {

    });
});


// Model Evento
var Event = mongoose.model('Event', {
    nombre: String,
    descripcion: String,
    fecha: String,
    organizador: String,
    ubicacion: String,
    tipo: String
});


// Routes

// Get eventos
app.get('/api/eventos', function(req, res) {

    console.log("obteniendo eventos");

    // use mongoose to get all reviews in the database
    Event.find(function(err, eventos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(eventos); // return all reviews in JSON format
    });
});

// create evento and send back all reviews after creation
app.post('/api/eventos', function(req, res) {

    console.log("creando evento");

    // create a evneto, information comes from request from Ionic
    Event.create({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        organizador: req.body.organizador,
        ubicacion: req.body.ubicacion,
        tipo: req.body.tipo,
        done: false
    }, function(err, evento) {
        if (err)
            res.send(err);

        // get and return all the eventos after you create another
        Event.find(function(err, eventos) {
            if (err)
                res.send(err)
            res.json(eventos);
        });
    });

});

// delete a evento
app.delete('/api/eventos/:evento_id', function(req, res) {
    Event.remove({
        _id: req.params.evento_id
    }, function(err, evento) {

    });
});








//const auth = require('./routes/authRoutes');
//app.use('/api/eventro', auth);

//levantando el servidor
app.listen(3000, () => {
    console.log('Escuchando puerto: ', 3000);
});