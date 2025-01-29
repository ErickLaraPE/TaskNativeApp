import { View,Text,TouchableOpacity } from "react-native"
import useAuth from "../../providers/hooks/useAuth"
import { globalStyles } from "../../../config/theme"
import { useNavigation } from "@react-navigation/native"

const PerfilScreen = () => {

    const {auth} = useAuth()
    const navigation = useNavigation()

    return(
        <View style={globalStyles.homeContainer}>
            <Text style={globalStyles.titleProtected}>Perfil</Text>
            <Text style={globalStyles.subTitleProtected}>{auth.nombre}</Text>
            <Text style={globalStyles.subTitleProtected}>{auth.email}</Text>
            <Text style={globalStyles.subTitleProtected}>{auth.username}</Text>
            <TouchableOpacity 
                onPress={() => {
                    navigation.navigate('Tareas')
                }}  
            >
                <Text style={globalStyles.linkTextProtected}>Ir a Tareas</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PerfilScreen