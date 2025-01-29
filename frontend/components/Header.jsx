import { useNavigation } from "@react-navigation/native"
import useAuth from "../presentation/providers/hooks/useAuth"
import { globalStyles } from "../config/theme"
import { View,Text,Button } from "react-native"

const Header = ({setIsMenu}) => {

    const {auth,deleteToken,cerrarSesionAuth} = useAuth()

    const navigation = useNavigation()

    const cerrarSesion = async () => {
        
        cerrarSesionAuth()
        await deleteToken()
        navigation.navigate("Auth")
    }

    return(
        <View style={globalStyles.headerContainer}>
            <Button style={globalStyles.btnPrimary} title='Menu' onPress={()=>setIsMenu(true)}/>
            <Text style={globalStyles.headerTitleText}>Administracion de Tareas Personales</Text>
            <Text style={globalStyles.headersubTitleText}>Bienvenido, {auth.nombre} </Text>
            <Button style={globalStyles.btnLogout} title='Cerrar sesion' onPress={cerrarSesion}/>
        </View>
    )
}

export default Header