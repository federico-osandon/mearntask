const express = require('express')
const conectarDB = require('./config/db')
const cors = require('cors')

//crear el servidor
const app = express()

//conectar a la base de datos
conectarDB()

// Habilitar Cors
app.use(cors())

// Habilitar express.json
app.use(express.json({ extended: true}))

// puerto de la app
const port = process.env.port || 4000

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios.route'))
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/proyectos', require('./routes/proyectos.route'))
app.use('/api/tareas', require('./routes/tareas.route'))

//arrancar la app
app.listen(port, '0.0.0.0', ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})

// npm run start