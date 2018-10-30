const express = require('express');
//const _ = require('underscore');
const Evento = require('../models/Evento');
const app = express();


app.get('/evento', function(req, res) {
    let skip = req.query.skip || 0;
    skip = Number(skip);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    Evento.find({})
        .skip(skip)
        .limit(limit)
        .exec((err, eventos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err
                });
            }

            Evento.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    number: conteo,
                    eventos: eventos
                });
            });
        });
});


app.post('/evento', function(req, res) {

    let body = req.body;

    let evento = new Evento({
        nombre: body.nombre,
        descripcion: body.descripcion,
        fecha: body.fecha,
        ubicacion: body.ubicacion,
        organizador: body.organizador,
        imagen: body.imagen
    });

    evento.save((err, eventoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err

            }); //bad request es 400
        }

        //usuarioDB.password = null;

        res.json({
            ok: true,
            evento: eventoDB

        });



    });





});

app.put('/Evento/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'descripcion', 'fecha', 'ubicacion', 'organizadr', 'imagen']);

    Evento.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, evento) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }
        res.json({
            ok: true,
            evento: evento
        });
    });
});

app.delete('/Evento/:id', function(req, res) {
    let id = req.params.id;
    Evento.findByIdAndRemove(id, (err, evento) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: rr
            });
        };
        if (evento == null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Evento no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            evento: evento

        });
    });
});

module.exports = app;