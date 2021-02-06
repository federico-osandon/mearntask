const Usuario = require('../models/UsuarioModel')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (request, response) => {

    //revisar si hay errores
    const errores = validationResult(request)
    if (!errores.isEmpty()) {
        return response.status(400).json({errores: errores.array()})
    }
    
    //extraer email y password
    const {email, password } = request.body

    try {
        //revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({email})

        if (usuario){
            return response.status(400).json({msg: 'El usuario ya existe'})
        }

        //Crea el nuevo usuario
        usuario= new Usuario(request.body)

        //Hasear el password
        const salt = await bcryptjs.genSalt(10)
        usuario.password = await bcryptjs.hash(password, salt)

        //Guarda el usuario
        await usuario.save()

        // Crear el jwt
        const payload ={
            usuario: {
                id: usuario.id
            }
        }
        //console.log(payload.usuario.id)
        // Firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 86400
        }, (error, token) => {
            if(error) throw error
            
            //Mensaje de confirmación
            response.json({token})

        })


        
    } catch (error) {
        console.log(error);
        response.status(400).send('Hubo un error', error)
    }
}