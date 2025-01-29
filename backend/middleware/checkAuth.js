import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import UsuarioModel from '../models/Usuario.js';

dotenv.config()

const checkAuth = async (req,res,next) => {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            try {
                    token = req.headers.authorization.split(' ')[1];
                    const decoded = jwt.verify(token,process.env.JWT_SECRET_ACCESS);
                    req.usuario = await UsuarioModel.findOne({where:{ID_Usuario: decoded.id},attributes:{ exclude:["password","token","createdAt","updatedAt"]}});
                    return next()
                } catch (error) {
                    console.log(error)
                }
        }
        if(!token) {
            return res.json({ msg: 'Token no proporcionado',error:true });
        }
}

export default checkAuth