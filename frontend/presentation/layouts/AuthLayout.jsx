import { globalStyles } from "../../config/theme"
import { View } from "react-native"

const AuthLayout = ({children}) => {
    return(
        <View style={globalStyles.authContainer}>
            {children}
        </View>
    )
}

export default AuthLayout

