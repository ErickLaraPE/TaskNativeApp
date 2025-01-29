import TareaModel from "../models/Tarea.js";

const crearTarea = async (req,res) => {
    try {
            const {titulo,descripcion} = req.body
            if(titulo === '' || descripcion === ''){
                return res.json({msg:'Debe tener un titulo y una descripcion la tarea',error:true})
            }
            if(titulo === ''){
                return res.json({msg:'Debe tener un titulo la tarea',error:true})
            }
            if(descripcion === ''){
                return res.json({msg:'Debe tener una descripcion la tarea',error:true})
            }
            const tarea = TareaModel.build(req.body)
            await tarea.save()
            return res.json(tarea)
        } catch (error) {
            console.log(error)
            return res.json({msg:'Error al crear la tarea',error:true})
        }
}

const obtenerTareas = async (req,res) => {

    try {
            const {id} = req.params
            console.log(id)
            const tareas = await TareaModel.findAll({where:{ID_Usuario:id}})
            if(tareas.length === 0){
                return res.json({msg:'No hay tareas para mostrar',error:true})
            }
            console.log(tareas)
            return res.json(tareas)
        } catch (error) {
            console.log(error)
            return res.json({msg:'Error al obtener tareas',error:true})
        }
}

const actualizarTarea = async(req,res) => {

    try {
            const {id} = req.params
            const {titulo} = req.body
            const tarea = await TareaModel.findOne({where:{ID_Tarea:id}})
            if(!tarea){
                return res.json({msg:'No existe la tarea',error:true})
            }
            if(titulo === ''){
                return res.json({msg:'El titulo ingresado no puede estar vacio',error:true})
            }
            if(titulo === tarea.titulo){
                return res.json({msg:'El titulo ingresado no puede ser el mismo',error:true})
            }
            const tareaActualizada = await TareaModel.update({titulo:titulo},{where:{ID_Tarea:id}})
            return res.json(tareaActualizada)
        } catch (error) {
            console.log(error)
            return res.json({msg:'Error al crear la tarea',error:true})
        }
}

const eliminarTarea = async(req,res) => {

    try {
            const {id} = req.params
            const tarea = await TareaModel.findOne({where:{ID_Tarea:id}})
            if(!tarea){
                return res.json({msg:'No se encontro la tarea',error:true})
            }
            await tarea.destroy()
            return res.json({msg:'Tarea eliminada exitosamente',error:false})
        } catch (error) {
            console.log(error)
            return res.json({msg:'Error al crear la tarea',error:true})
        }
}

export {
    crearTarea,obtenerTareas,actualizarTarea,eliminarTarea
}