const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const authMiddle = require('../middleware/auth.middleware');
const { check } = require('express-validator');

// /api/tareas

// Crear una tarea 
router.post('/',
    authMiddle,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
)

// Obtener las tareas por proyecto
router.get('/',
    authMiddle,
    tareaController.obtenerTareas
);

// Actualizar tarea
router.put('/:id',
    authMiddle,
    tareaController.actulizarTarea
);

// Eliminar tarea
router.delete('/:id',
    authMiddle,
    tareaController.eliminarTarea
);

module.exports = router