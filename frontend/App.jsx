import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './presentation/screens/auth/LoginScreen';
import RegisterScreen from './presentation/screens/auth/RegisterScreen';
import HomeScreen from './presentation/screens/home/HomeScreen';
import PerfilScreen from './presentation/screens/perfil/PerfilScreen';
import { AuthProvider } from './presentation/providers/AuthProvider';
import AuthLayout from './presentation/layouts/AuthLayout'
import ProtectedLayout from './presentation/layouts/ProtectedLayout'
import { TareaProvider } from './presentation/providers/TareaProvider';

const Stack = createNativeStackNavigator();

const AuthStack = () => (

    <Stack.Navigator>
        <Stack.Screen 
            name="Login" 
            component={()=>(
                            <AuthLayout>
                                <LoginScreen/>
                            </AuthLayout>
            )}
            options={{ headerShown: false }}
        />
        <Stack.Screen 
            name="Register" 
            component={()=>(
                            <AuthLayout>
                                <RegisterScreen/>
                            </AuthLayout>
            )}
            options={{ headerShown: false }} 
        />
    </Stack.Navigator>
)

const ProtectedStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Tareas" 
            component={()=>(
                            <ProtectedLayout>
                                <HomeScreen/>
                            </ProtectedLayout>
            )}
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="Perfil" 
            component={()=>(
                            <ProtectedLayout>
                                <PerfilScreen/>
                            </ProtectedLayout>
            )}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
)

const AppNavigator = () => {
    return(
        <Stack.Navigator>
                <Stack.Screen 
                    name="Auth" 
                    component={AuthStack}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Protected" 
                    component={ProtectedStack}
                    options={{ headerShown: false }}
                />
        </Stack.Navigator>
    )
}

export default function App() {

    return (           
                <NavigationContainer>
                    <AuthProvider>
                        <TareaProvider>
                            <AppNavigator/>
                        </TareaProvider>
                    </AuthProvider>
                </NavigationContainer>
    )
}
