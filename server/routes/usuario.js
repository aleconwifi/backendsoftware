const express = require('express');

//const bcrypt = require('bcrypt-nodejs');
const _ = require('underscore');


const Usuario = require('../models/Usuario');

const app = express();



//prueba 
app.get('/usuario', function(req, res) {

    //si viene esa variable desde voy a suponer que
    //quiere desde, sino desde la pagina 1 por defecto
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5; //si no te especifica el limite son 5
    limite = Number(limite);

    Usuario.find({}, 'nombre email role estado google img')
        .skip(desde) //saltarte registros
        .limit(limite) //paginar a 5 usuarios
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err

                });
            }

            Usuario.count({}, (err, conteo) => {
                //cuenta todos los usuarios

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo

                });

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

app.delete('/usuario/:id', function(req, res) {


    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err

            }); //bad request es 400
        };
        if (usuarioBorrado == null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }

            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado

        });



    });


});

module.exports = app;