const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const User = require('../models/user.Models');
const Helpers = require('../Helpers/helpers');
const bcrypt = require('bcryptjs');


module.exports = {
    async CreateUser(req, res) {
        const schema = Joi.object().keys({
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


        const userEmail = await User.findOne({ email: Helpers.lowerCase(req.body.email) });
        if (userEmail) {
            return res
                .status(HttpStatus.CONFLICT)
                .json({ message: 'Email ya exsite' });
        }

        const userName = await User.findOne({ username: Helpers.firstUpper(req.body.username) });
        if (userName) {
            return res
                .status(HttpStatus.CONFLICT)
                .json({ message: 'El nombre ya exsite' });
        }


        return bcrypt.hash(value.password, 10, (error, hash) => {
            if (err) {
                return res
                    .status(HttpStatus.BAD_REQUEST)
                    .json({ message: 'Error del hashing en la contrasena' });
            }
            const body = {
                username: Helpers.firstUpper(vaule.username),
                email: Helpers.lowerCase(value.email),
                password: hash
            };

            User.create(body).then((user) => {
                res
                    .status(HttpStatus.CREATED)
                    .json({ message: 'Usuario creado satisfactoriamente' })

            }).catch(err => {
                res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error ocurrido' });

            });
        });
    }
};