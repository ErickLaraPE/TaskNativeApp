import Header from "../../components/Header"
import Footer from "../../components/Footer"
import useAuth from "../providers/hooks/useAuth"
import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import { globalStyles } from "../../config/theme"
import { View } from "react-native"
import Menu from "../../components/Menu"

const ProtectedLayout = ({children}) => {

    const {auth,isMenu,setIsMenu} = useAuth()
    const navigation = useNavigation()

    useEffect(() => {
        if(!auth?.ID_Usuario){
            navigation.navigate("Auth")
        }
    },[auth, navigation])

    if (!auth?.ID_Usuario) {
        return null;
    }
    return(
                    <View style={globalStyles.protectedContainer}>
                        <Header setIsMenu={setIsMenu}/>
                            {isMenu && <Menu setIsMenu={setIsMenu}/>}
                            {children}
                        <Footer/>
                    </View>
    )
}

export default ProtectedLayout