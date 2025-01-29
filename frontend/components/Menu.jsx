import { useNavigation } from "@react-navigation/native"
import { globalStyles } from "../config/theme"
import { View,Text,Button,TouchableOpacity } from "react-native"

const Menu = ({setIsMenu}) => {

    const navigation = useNavigation()

    return(
        <View style={globalStyles.menuContainer}>
            <Button 
                style={globalStyles.btnCloseMenu} 
                onPress={() => setIsMenu(false)}
                title='X'
            />
            <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate('Tareas')
                    }}   
            >
                    <Text style={globalStyles.menuTextOptions}>Ir a Tareas</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate('Perfil')
                    }}   
            >
                    <Text style={globalStyles.menuTextOptions}>Ir al Perfil</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Menu