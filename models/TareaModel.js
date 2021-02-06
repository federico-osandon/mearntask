const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    creado: {
        type: Date,
        default: Date.now()
    }, 
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto' // este tiene que ir junto con el de arriba
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);