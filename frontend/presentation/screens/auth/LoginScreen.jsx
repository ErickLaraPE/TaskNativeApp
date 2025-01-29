import { useState } from "react"
import { Button, TextInput,TouchableOpacity,Text,ScrollView } from "react-native"
import userAxios from "../../../config/UserAxios.js"
import Alerta from "../../../components/Alerta"
import useAuth from "../../providers/hooks/useAuth"
import { useNavigation } from "@react-navigation/native"
import { colors, globalStyles } from "../../../config/theme"

const LoginScreen = () => {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [alerta,setAlerta] = useState({})
    const {storeToken,setAuth,setTokenStd} = useAuth()
    const navigation = useNavigation()
    const [isHovered, setIsHovered] = useState(false);

    const handleLogin = async () => {
        try {
                const {data} = await userAxios.post('/usuarios/login',{username:username,password:password})
                if(data.error){
                    setAlerta({msg:data.msg,error:data.error})
                    setTimeout(() => {
                        setAlerta({})
                    },3000);
                    return
                }
                console.log(data)
                setAlerta({msg:'Iniciaste sesion exitosamente',error:false})
                setTimeout(async () => {
                    setAlerta({})
                    setTokenStd(data.token)
                    await storeToken(data.token)
                    setAuth(data)
                    navigation.navigate("Protected")
                },3000)
            } catch (error) {
                console.log(error)
                if (error.response) {
                    console.log('Error Response:', error.response.data);
                } else if (error.request) {
                    console.log('Error Request:', error.request);
                } else {
                    console.log('Error Message:', error.message);
                }
            }
    }

    const {msg} = alerta;

    return(
        <ScrollView style={globalStyles.loginContainer}>
            <Text style={globalStyles.titleLogin}>Ingresa los datos para Iniciar Sesion</Text>
            {msg && <Alerta alerta={alerta}/>}
            <Text style={globalStyles.labelForm}>Username:</Text>
            <TextInput 
                style={globalStyles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Ingresa tu username"
                placeholderTextColor={colors.placeholderText}
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
            <Button style={globalStyles.btnLogin} title='Iniciar Sesion' onPress={handleLogin}/>
            <TouchableOpacity 
                onPressIn={() => {
                    setIsHovered(true)
                    navigation.navigate('Register')
                }}   // Cambia a true al tocar
                onPressOut={() => setIsHovered(false)} // Cambia a false al soltar
            >
                <Text style={[globalStyles.linkText,isHovered && globalStyles.linkTextHovered]}>¿No tienes cuenta aun? Registrate ahora</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default LoginScreen