import AsyncStorage from '@react-native-community/async-storage';
// import { add } from 'react-native-reanimated';

const BASE_API = 'https://api.b7web.com.br/devbarber/api';

export default {
    checkToken: async (token:string) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();        
        return json;
    },
    signIn: async (email:string, password:string) => {
        const req = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const json = await req.json();        
        return json;
    },
    signUp: async (name:string, email:string, password:string) => {
        const req = await fetch(`${BASE_API}/user`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await req.json();        
        return json;
    },
    logout: async () => {
        const token =await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/auth/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();        
        return json;
    },
    
    getBarbers: async (lat?:number, lng?:number, address?:string) => {
        const token = await AsyncStorage.getItem('token');

        console.log("LAT", lat || null);
        console.log("LNG", lng|| null);
        console.log("ADDRESS", address|| null);

        const req = await fetch(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`);
        const json = await req.json();
        return json;
    },
    getBarber: async (id:number) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/barber/${id}?token=${token}`);
        const json = await req.json();
        
 

        return json;
    }


};