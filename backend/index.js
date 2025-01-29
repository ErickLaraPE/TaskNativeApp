import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import usuarioRoutes from './routes/usuarioRoutes.js'
import tareaRoutes from './routes/tareasRoutes.js'

import db from './config/db.js';

const app = express();
app.use(express.json());
dotenv.config();

const startServer = async () => {
    try {
        await db.authenticate();
        console.log('Conexion exitosa a la DB');
    } catch (error) {
        console.log(`El error de conexion es:${error}`);
    }
}

startServer();

const port = process.env.PORT || 4000;

const servidor = app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
})

// Funcion de configuracion de conexion

// Configurar cors

const whitelist = process.env.FRONTEND_URL_DEV;

const corsOptions = {
    
    origin: function(origin,callback){
        console.log(origin)
        if(!origin || whitelist.includes(origin)){
        // Puede consultar la API
            callback(null,true);
        } else {
        // No esta permitido su request
            callback(new Error("Error de Cors"));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization','x-new-access-token'],  // Cabeceras permitida 
    exposedHeaders: ['x-new-access-token'],
    credentials: true,
};

app.use(cors(corsOptions));
// Routing
app.use('/api/usuarios',usuarioRoutes);
app.use('/api/tareas',tareaRoutes);



