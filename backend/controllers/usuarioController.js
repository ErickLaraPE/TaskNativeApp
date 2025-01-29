import generarID from "../helpers/generarID.js";
import generarJWTAccess from "../helpers/generarJWT.js";
import UsuarioModel from "../models/Usuario.js";
import { Op } from "sequelize";

const register = async (req,res) => {
    try {
            const {nombre,username,email,password,confirmPassword} = req.body

            const regex1 = /^[a-zA-Z0-9]*$/
            const regex2 =  /^[a-zA-Z0-9 %&$]*$/
            const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

            if(!regex1.test(username)){
                return res.json({msg:'Solo se permite ingresar letras y numeros en el username',error:true})
            }
            if(!regex2.test(password)){
                return res.json({msg:'Solo se permite ingresar letras y numeros en el password y ciertos caracteres especiales',error:true})
            }
            if(!regexEmail.test(email)){
                return res.json({msg:'Solo se permite ingresar letras y numeros en el email',error:true})
            }
            if(username === '' && password === '' && nombre === '' && confirmPassword === '' && email === ''){
                return res.json({msg:'Debes ingresar todos los campos',error:true})
            }
            if(username === ''){
                return res.json({msg:'Debes ingresar el username',error:true})
            }
            if(password === ''){
                return res.json({msg:'Debes ingresar el password',error:true})
            }
            if(confirmPassword === ''){
                return res.json({msg:'Debes ingresar la confirmacion del password',error:true})
            }
            if(password !== confirmPassword){
                return res.json({msg:'Los passwords deben coincidir',error:true})
            }
            if(email === ''){
                return res.json({msg:'Debes ingresar el email',error:true})
            }
            if(nombre === ''){
                return res.json({msg:'Debes ingresar el nombre',error:true})
            }

            const existUser = await UsuarioModel.findOne({where:{[Op.or]:[{username:username},{email:email}]}});
            if (existUser) {
                if (existUser.email === email) {
                    return res.json({ msg: 'El email ya esta en uso', error: true });
                }
                if (existUser.username === username) {
                    return res.json({ msg: 'El username ya esta en uso', error: true });
                }
            }
            const newUser = UsuarioModel.build({nombre,username,email,password});
            newUser.token = generarID();
            await newUser.save();
            return res.json({msg:'Se registro el nuevo usuario con exito',error:false})
        } catch (error) {
            console.log(error)
            return res.json({msg:'Error al registrar usuario',error:true})
        }
} 

const login = async (req,res) => {
    try {
            const {username,password} = req.body

            const regex1 = /^[a-zA-Z0-9]*$/
            const regex2 =  /^[a-zA-Z0-9 %&$]*$/

            if(!regex1.test(username)){
                return res.json({msg:'Solo se permite ingresar letras y numeros en el username',error:true})
            }
            if(!regex2.test(password)){
                return res.json({msg:'Solo se permite ingresar letras y numeros en el password',error:true})
            }
            if(username === '' && password === ''){
                return res.json({msg:'Debes ingresar todos los campos',error:true})
            }
            if(username === ''){
                return res.json({msg:'Debes ingresar el username',error:true})
            }
            if(password === ''){
                return res.json({msg:'Debes ingresar el password',error:true})
            }

            const user = await UsuarioModel.findOne({where:{username:username}});

            if(!user){
                return res.json({msg:'Usuario no existe, debe registrarse primero',error:true});
            }

            if(await user.comprobarPassword(password)){
                const token = generarJWTAccess(user.ID_Usuario);
                await user.save();
                console.log(token);
                return res.json({
                    ID_Usuario: user.ID_Usuario,
                    nombre: user.nombre,
                    username: user.username,
                    email: user.email,
                    token: token,
                })
            } else {
                return res.json({msg:'No coincide el password ingresado',error:true});
            }
        } catch (error) {
            console.log(error)
            return res.json({msg:'Error al iniciar sesion',error:true})   
        }
}

const perfil = (req,res) => {
    try {
            const {usuario} = req
            return res.json(usuario)
        } catch (error) {
            console.log(error)
            return res.json({msg:'Error al obtener perfil',error:true})
        }
}

export {
    register,login,perfil
}
