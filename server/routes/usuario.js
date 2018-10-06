const express = require('express');

//const bcrypt = require('bcrypt-nodejs');
const _ = require('underscore');


const Usuario = require('../modelos/usuario');

const app = express();



//prueba 
app.get('/usuario', function(req, res) {



    Usuario.find({})
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err

                });
            }

            res.json({
                ok: true,
                usuarios

            });


        })



});

app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({

        nombre: body.nombre,
        email: body.email,
        password: body.email,
        role: body.role


    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err

            }); //bad request es 400
        }

        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB

        });



    });





});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err

            }); //bad request es 400
        }

        res.json({
            ok: true,
            usuario: usuarioDB

        });



    });


});

app.delete('/usuario', function(req, res) {

    res.json('delete Usuario panita');
});

module.exports = app;