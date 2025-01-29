import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import {login,register,perfil} from '../controllers/usuarioController.js'

const router = express.Router()

router
    .route("/")
    .post(register) //registrarse

router
    .route("/login")
    .post(login) // loguearse

router
    .get('/perfil',checkAuth,perfil)

export default router