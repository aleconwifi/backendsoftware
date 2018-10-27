const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username: {
        type: String
            // required: [true, 'El nombre es necesario']
    },

    email: {
        type: String,
        unique: true,
        // required: [true, 'El correo es necesario']
    },

    password: {
        type: String
            // required: [true, 'La contrasena es obligatoria']
    },
});


module.exports = mongoose.model('User', userSchema);