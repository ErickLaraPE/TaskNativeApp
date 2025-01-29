import db from '../config/db.js'
import { DataTypes } from "sequelize";
import UsuarioModel from './Usuario.js';

const TareaModel = db.define('tareas',{

    ID_Tarea: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },

    titulo: {
        type: DataTypes.STRING,
    },

    descripcion: {
        type: DataTypes.STRING,
    },
    CreatedAt: {
        type: DataTypes.DATEONLY, // Almacena solo la fecha
        defaultValue: DataTypes.NOW,
    },
    UpdatedAt: {
        type: DataTypes.DATEONLY, // Almacena solo la fecha
        defaultValue: DataTypes.NOW,
    },
    ID_Usuario:{
        type: DataTypes.INTEGER,
        references:{
            model:UsuarioModel,
            key:'ID_Usuario'
        }
    }

}, {
    timestamps: true, // Habilita timestamps
    createdAt: 'CreatedAt', // Define el nombre del campo de creación
    updatedAt: 'UpdatedAt', // Define el nombre del campo de actualización
});


export default TareaModel