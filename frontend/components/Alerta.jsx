import { View,Text } from "react-native"
import { globalStyles } from "../config/theme"

const Alerta = ({alerta}) => {

    return(
        <View style={alerta.error ? globalStyles.errorAlertaContainer : globalStyles.successAlertaContainer}>
            <Text style={globalStyles.alertaText}>{alerta.msg}</Text>
        </View>
    )
}

export default Alerta