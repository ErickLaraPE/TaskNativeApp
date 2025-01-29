import { Button, TextInput, ScrollView,FlatList,Text,TouchableOpacity,View } from "react-native"
import Alerta from "../../../components/Alerta"
import userAxios from "../../../config/UserAxios.js"
import { useEffect, useState } from "react"
import useTareas from "../../providers/hooks/useTareas"
import useAuth from "../../providers/hooks/useAuth"
import { colors,globalStyles } from "../../../config/theme.jsx"
import { useNavigation } from "@react-navigation/native"

const HomeScreen = () => {

    const [titulo,setTitulo] = useState('')
    const [descripcion,setDescripcion] = useState('')
    const [alerta,setAlerta] = useState({})
    const {tareas,setTareas} = useTareas()
    const [tareaEditando,setTareaEditando] = useState(null) // estado para saber si esta siendo editada una tarea o no
    const [tituloActualizado,setTituloActualizado] = useState('')
    const {auth,tokenStd} = useAuth()
    const navigation = useNavigation()

    useEffect(() => {
        const cargarTareas = async () => {
            
            const config = {
                "Content-Type":"application/json",
                headers: { Authorization: `Bearer ${tokenStd}` }
            };
            const {data} = await userAxios.get(`/tareas/obtenerTareas/${auth.ID_Usuario}`,config)
            
            if(data.error){
                setAlerta({msg:data.msg,error:data.error})
                setTimeout(() => {
                    setAlerta({})    
                },3000)
                return
            }
            setTareas(data)
        }
        cargarTareas()
    },[])

    const addTarea = async () => {
        try {
                
                const config = {
                    "Content-Type":"application/json",
                    headers: { Authorization: `Bearer ${tokenStd}` }
                };
                const {data} = await userAxios.post('/tareas/crearTarea',{titulo:titulo,descripcion:descripcion,ID_Usuario:auth.ID_Usuario},config)
                if(data.error){
                    setAlerta({msg:data.msg,error:data.error})
                    setTimeout(() => {
                        setAlerta({})
                    },3000)
                    return
                }
                setAlerta({msg:'Se ha creado la tarea exitosamente',error:false})
                setTimeout(() => {
                        setAlerta({})
                },3000)
                const temp = [...tareas]
                temp.push(data)
                setTareas(temp)
            } catch (error) {
                console.log(error)
            }
    }

    const updateTarea = async (id,tituloActualizado) => {
        try {
                const config = {
                    "Content-Type":"application/json",
                    headers: { Authorization: `Bearer ${tokenStd}` }
                };
                
                const {data} = await userAxios.put(`/tareas/actualizarTarea/${id}`,{titulo:tituloActualizado},config)
                
                if(data.error){
                    setAlerta({msg:data.msg,error:data.error})
                    setTimeout(() => {
                        setAlerta({})    
                    },3000)
                    return
                }
                setAlerta({msg:'Tarea actualizada exitosamente',error:false})
                setTimeout(() => {
                    setAlerta({})    
                },3000)
                const temp = [...tareas];
                const temp2 = temp.map(tarea => tarea.ID_Tarea === id ? {...tarea,titulo:tituloActualizado} : tarea)
                setTareas(temp2)
            } catch (error) {
                console.log(error)
            }
    }

    const cancelarTarea = () => {
        setTareaEditando(null)
    }

    const eliminaTarea = async (id) => {
        try {
                
                const config = {
                    "Content-Type":"application/json",
                    headers: { Authorization: `Bearer ${tokenStd}` }
                };
                
                const {data} = await userAxios.delete(`/tareas/eliminarTarea/${id}`,config)
                
                if(data.error){
                    setAlerta({msg:data.msg,error:data.error})
                    setTimeout(()=>{
                        setAlerta({})
                    },3000)
                    return
                }
                const temp = [...tareas]
                const indice = temp.findIndex( tarea => tarea.ID_Tarea === id)
                if(indice !== -1){
                    temp.splice(indice,1)
                }
                setTareas(temp)
            } catch (error) {
                console.log(error)
            }
    }

    const {msg} = alerta;

    return(
        <ScrollView style={globalStyles.homeContainer}>
            <Text style={globalStyles.titleProtected}>Pagina Principal</Text>
                {msg && <Alerta alerta={alerta}/>}
            <TouchableOpacity 
                onPress={() => {
                    navigation.navigate('Perfil')
                }}   
            >
                <Text style={globalStyles.linkTextProtected}>Ir al Perfil</Text>
            </TouchableOpacity>
            <View style={globalStyles.addTaskContainer}>
                <TextInput 
                    style={globalStyles.inputTask}
                    placeholder="Ingresa el titulo de la tarea"
                    placeholderTextColor={colors.placeholderText}
                    onChangeText={setTitulo}
                />
                <TextInput
                    style={globalStyles.inputTask}
                    placeholder="Ingresa la descripcion de la tarea"
                    placeholderTextColor={colors.placeholderText}
                    onChangeText={setDescripcion}
                />
                <Button style={globalStyles.btnADD} title='Add' onPress={()=>addTarea()}/>
            </View>
            <FlatList
                data={ tareas }
                keyExtractor={(item) => item.ID_Tarea}
                renderItem={ ( { item }) => (
                    <View style={globalStyles.tareasContainer}>
                        {tareaEditando === item.ID_Tarea ? 
                        (
                            <View style={globalStyles.tareaContainer}>
                                <TextInput 
                                    style={globalStyles.input}
                                    value={tituloActualizado}
                                    onChangeText={setTituloActualizado}
                                    placeholder="Ingresa el nuevo titulo de la tarea"
                                />
                                <View style={globalStyles.btnContainer}>
                                    <Button 
                                        color={globalStyles.btnActualizar}
                                        onPress={() => {
                                            updateTarea(item.ID_Tarea,tituloActualizado)
                                            setTareaEditando(null)
                                        }}
                                        title='Actualizar'
                                    />
                                    <Button 
                                        onPress={() => cancelarTarea()}
                                        title='Cancelar'
                                        color={globalStyles.btnEliminar}
                                    />
                                </View>
                            </View>
                        ) : (
                            <View style={globalStyles.tareaContainer}>
                                <Text style={globalStyles.tareaText}> {item.titulo}</Text>
                                <View style={globalStyles.btnContainer}>
                                    <Button 
                                        onPress={() => {
                                            setTareaEditando(item.ID_Tarea) 
                                        }}
                                        title='Edit'
                                        color={colors.btnEditar}
                                    />
                                    <Button 
                                        onPress={ () => eliminaTarea(item.ID_Tarea)}
                                        title='X'
                                        color={globalStyles.btnEliminar}
                                    />
                                </View>
                            </View>
                        ) }
                    </View>
                )}
            />
        </ScrollView>
    )
}

export default HomeScreen