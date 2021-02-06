const express = require('express')
const router = express.Router()
const proyectoController = require('../controllers/proyectoController')
const authMidle = require('../middleware/auth.middleware')
const { check } = require('express-validator')

///api/proyectos
 
// Crea proyectos
router.post('/', 
    authMidle,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
)

// Obtener todos los proyectos
router.get('/', 
    authMidle,
    proyectoController.obtenerProyectos
)

// Actualizar proyecto via ID
router.put('/:id',
authMidle,
[
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
],
proyectoController.actualizarProyecto    
)

// Eliminar un proyecto
router.delete('/:id',
authMidle,
proyectoController.eliminarProyecto    
)

module.exports = router
