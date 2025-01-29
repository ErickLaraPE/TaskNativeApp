import { useState } from "react"
import { Button, TextInput, TouchableOpacity,Text, ScrollView } from "react-native"
import Alerta from "../../../components/Alerta"
import userAxios from "../../../config/UserAxios.js"
import { useNavigation } from "@react-navigation/native"
import { colors,globalStyles } from "../../../config/theme"

const RegisterScreen = () => {

    const [nombre,setNombre] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [alerta,setAlerta] = useState({})
    const [isHovered, setIsHovered] = useState(false);
    const navigation = useNavigation()

    const handleRegister = async () => {
        try {
                const {data} = await userAxios.post('/usuarios/',{nombre:nombre,username:username,email:email,password:password,confirmPassword:confirmPassword})
                if(data.error){
                    setAlerta({msg:data.msg,error:data.error})
                    setTimeout(()=>{
                        setAlerta({})
                    },3000)
                    return
                }
                setAlerta({msg:data.msg,error:data.error})
                setTimeout(()=>{
                    setAlerta({})
                    navigation.navigate("Login")
                },3000)
            } catch (error) {
                console.log(error)
            }
    }

    const {msg} = alerta

    return(
        <ScrollView style={globalStyles.registerContainer}>
            <Text style={globalStyles.titleLogin}>Ingresa los datos para registrar a un nuevo usuario</Text>
            {msg && <Alerta alerta={alerta}/>}
            <Text style={globalStyles.labelForm}>Nombre:</Text>
            <TextInput 
                style={globalStyles.input}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Ingresa tu nombre"
                placeholderTextColor={colors.placeholderText}
            />
            <Text style={globalStyles.labelForm}>Username:</Text>
            <TextInput 
                style={globalStyles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Ingresa tu username"
                placeholderTextColor={colors.placeholderText}
            />
            <Text style={globalStyles.labelForm}>Email:</Text>
            <TextInput 
                style={globalStyles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Ingresa tu email"
                placeholderTextColor={colors.placeholderText}
                keyboardType="email-address"
            />
            <Text style={globalStyles.labelForm}>Password:</Text>
            <TextInput 
                style={globalStyles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Ingresa tu password"
                placeholderTextColor={colors.placeholderText}
                secureTextEntry // Oculta el texto de la contraseña
            />
            <Text style={globalStyles.labelForm}>Confirm Password:</Text>
            <TextInput 
                style={globalStyles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirma tu password"
                placeholderTextColor={colors.placeholderText}
                secureTextEntry // Oculta el texto de la contraseña
            />
            <Button style={globalStyles.btnLogin} title='Registrarse' onPress={handleRegister}/>
            <TouchableOpacity 
                onPressIn={() => {
                    setIsHovered(true)
                    navigation.navigate('Login')
                }}   
                onPressOut={() => setIsHovered(false)}
            >
                <Text style={[globalStyles.linkText,isHovered && globalStyles.linkTextHovered]}>¿Ya tienes cuenta? Inicia Sesion Aqui</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default RegisterScreen