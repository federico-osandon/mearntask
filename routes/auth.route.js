// Rutas para autenticar usuarios
const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const authController = require('../controllers/authController')
const authMid = require('../middleware/auth.middleware')

// Iniciar sesión con un usuario
// ruta que viene: /api/auth
router.post('/',    
    authController.autenticarUsuario
)

//Obtiene el usuario autenticado
router.get('/',
    authMid,
    authController.usuarioAutenticado
)
module.exports=router