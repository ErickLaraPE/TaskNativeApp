import axios from 'axios'
import Constants from 'expo-constants'

const userAxios = axios.create({
    baseURL:`${Constants.expoConfig.extra.BACKEND_URL_DEV}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default userAxios