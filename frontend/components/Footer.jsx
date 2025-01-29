import { globalStyles } from "../config/theme"
import { View,Text } from "react-native"

const Footer = () => {

    return(
        <View style={globalStyles.footerContainer}>
            <Text style={globalStyles.footerText}> @2025 Todos los derechos reservados</Text>
        </View>
    )

}

export default Footer