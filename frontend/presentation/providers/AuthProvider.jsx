import { useState,createContext, useEffect } from 'react';
import userAxios from '../../config/UserAxios.js';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    
    const initialAuthState = {
        ID_Usuario: null,
        email:null,
        nombre:null,
        token:null,
        username:null
        // Otras propiedades que consideres necesarias
    };

    const [auth,setAuth] = useState(initialAuthState);
    const [tokenStd,setTokenStd] = useState('');
    const [isMenu,setIsMenu] = useState(false);

    const loadToken = async () => {
        try {
                const storedToken = await SecureStore.getItemAsync('token');
                
                if (storedToken) {
                    console.log('Token cargado:', storedToken);
                    setTokenStd(storedToken)
                } else {
                    console.log('No hay token guardado');
                }
            } catch (error) {
                console.log('Error al recuperar el token', error);
                if (error.response) {
                    console.log('Error Response:', error.response.data);
                } else if (error.request) {
                    console.log('Error Request:', error.request);
                } else {
                    console.log('Error Message:', error.message);
                }
            }
    };
    
    useEffect( () => {
        loadToken();
    }, []);
    
    useEffect(() => {
        const autenticarUsuario = async () => {
            try {
                    if(tokenStd !== '') {
                        const config = {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${tokenStd}`,
                            }
                        }
                        const {data} = await userAxios('/usuarios/perfil',config)
                        setAuth(data);
                    }
                } catch (error) {
                    console.log(error)
                    setAuth(initialAuthState)
                }
        }
        autenticarUsuario()
    },[])

    const cerrarSesionAuth = () => {
        setAuth({})
    }

    const storeToken = async (newToken) => {
        try {
                await SecureStore.setItemAsync('token', newToken);
                console.log('Token guardado con éxito:',newToken);
            } catch (error) {
                console.log('Error al guardar el token', error);
            }
    };

    const deleteToken = async () => {
        try {
                await SecureStore.deleteItemAsync('token');
                console.log('Token eliminado');
                setTokenStd('');
            } catch (error) {
                console.log('Error al eliminar el token', error);
            }
    };

    return(
        <AuthContext.Provider
            value={{
                        auth,
                        setAuth,
                        tokenStd,
                        setTokenStd,
                        cerrarSesionAuth,
                        storeToken,
                        deleteToken,
                        loadToken,
                        isMenu,
                        setIsMenu,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider,AuthContext}