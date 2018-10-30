const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const User = require('../models/user.Models');
const Helpers = require('../Helpers/helpers');
const bcrypt = require('bcryptjs'); //encriptar
const jwt = require('jsonwebtoken'); //crear un token
const dbConfig = require('../config/secret');


module.exports = {
    async CreateUser(req, res) {
        const schema = Joi.object().keys({
            //restricciones de contrasena y carnet
            username: Joi.string()
                .min(5)
                .max(10)
                .required(),
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .min(5)
                .required()

        });
        const { error, value } = Joi.validate(req.body, schema);
        console.log(value);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST)
                .json({ message: error.details });
        }

        //busca si ya existe el correo
        const userEmail = await User.findOne({ email: Helpers.lowerCase(req.body.email) });
        if (userEmail) {
            return res
                .status(HttpStatus.CONFLICT)
                .json({ message: 'Email ya exsite' });
        }
        //busca si el carnet ya existe
        const userName = await User.findOne({ username: Helpers.firstUpper(req.body.username) });
        if (userName) {
            return res
                .status(HttpStatus.CONFLICT)
                .json({ message: 'El nombre ya exsite' });
        }

        //hashing funcional
        return bcrypt.hash(value.password, 10, (err, hash) => {
            if (err) {
                return res
                    .status(HttpStatus.BAD_REQUEST)
                    .json({ message: 'Error del hashing en la contrasena' });
            }
            const body = {
                username: Helpers.firstUpper(value.username),
                email: Helpers.lowerCase(value.email),
                password: hash
            };

            User.create(body).then((user) => {

                //duracion de la expiracion del tokencito
                const token = jwt.sign({ data: user }, dbConfig.secret, {
                    expiresIn: 120
                });

                //guardar el token en las cookies
                res.cookie('auth', token);

                res
                    .status(HttpStatus.CREATED)
                    .json({ message: 'Usuario creado satisfactoriamente', user, token })

            }).catch(err => {
                res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error ocurrido' });

            });
        });
    }
};