import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
// import { add } from 'react-native-reanimated';

const BASE_API = 'http://127.0.0.1:3000';
// export default {
 
//     getCompanies: async () => {
//         // const token = await AsyncStorage.getItem('token');
//         const req = await fetch(`${BASE_API}/companies`);
//         const json = await req.json();
        
 

//         return json;
//     }


// };
const api2 = axios.create({
    baseURL: 'http://192.168.15.7:3333/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

export default api2