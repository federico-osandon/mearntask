const Usuario = require('../models/UsuarioModel')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jtw = require('jsonwebtoken')

exports.autenticarUsuario = async (req,res) => {
    // Revisar si hay errores
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({errorres: errores.array()})
    }

    // Extraer el email y el password
    const { email, password } = req.body

    try {
        // Revisar que sea un usuario registrado 
        let usuario = await Usuario.findOne({ email })
        if (!usuario) {
            return res.status(400).json({msg: 'El usuario no existe'})
        }

        // Revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password)
        if ( !passCorrecto ) {
            return res.status(400).json({msg: 'Password o Usuario incorrecto'})
        }

        // Si todo es correcto Crear y firmar el jwt
        const payload ={
            usuario: {
                id: usuario.id
            }
        }
        
        jtw.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error
            
            //Mensaje de confirmación
            res.json({token})

        })

    } catch (error) {
        console.log(error)
    }
}

// Obtiene si el usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password')
        res.json({usuario})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Hubo un error'})
    }
} 