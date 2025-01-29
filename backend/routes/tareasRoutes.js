import express from 'express'

import {crearTarea,obtenerTareas,actualizarTarea,eliminarTarea} from '../controllers/tareaController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router
    .route("/crearTarea")
    .post(checkAuth,crearTarea)

router
    .route("/obtenerTareas/:id")
    .get(checkAuth,obtenerTareas)

router
    .route("/actualizarTarea/:id")
    .put(checkAuth,actualizarTarea)

router
    .route("/eliminarTarea/:id")
    .delete(checkAuth,eliminarTarea)

export default router
