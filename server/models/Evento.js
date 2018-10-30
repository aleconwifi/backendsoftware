const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let eventoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },

    descripcion: {
        type: String,
        required: [true, 'La descripcion es necesaria']
    },

    fecha: {
        type: String,
        required: [false, 'La fecha es necesaria']
    },

    ubicacion: {
        type: String,
        required: [true, 'La ubicacion es necesaria']

    },

    organizador: {
        type: String,
        required: [true, 'El organizador es necesario']

    },

    imagen: {
        type: String,
        required: [true, 'La imagen es necesaria']

    },
});



module.exports = mongoose.model('Evento', eventoSchema, 'Evento');