require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

//estos son middlewares, app.use, son funciones
//que siempre se disparan cuando pasan por estas lineas
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//prueba 
app.get('/usuario', function(req, res) {

    res.json('get Usuario');
});

app.post('/usuario', function(req, res) {

    let body = req.body;
    if (body.nombre == undefined) {
        res.status(400).json({
                ok: false,
                mensaje: 'El nombre es necesario'
            }) //bad request es 400

    } else {
        res.json({
            persona: body
        });
    }



});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    res.json({
        id
    });
});

app.delete('/usuario', function(req, res) {

    res.json('delete Usuario');
});


//levantando el servidor
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', 3000);
});