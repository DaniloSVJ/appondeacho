import React,{useEffect,useContext} from 'react'
import {Container,LoadingIcon } from './styles'
import {Image,Text} from 'react-native'
import Logo from '../../../assets/logoondeacho.png'
import AscynStorage from '@react-native-async-storage/async-storage'
import { useNavigation,ParamListBase } from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Api from '../../../Api'
import AsyncStorage from '@react-native-community/async-storage';
import {UserContext} from '../../context/UserContext'



export default  () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { dispatch: userDispatch } =  useContext(UserContext)

    useEffect(()=>{

        const checkToken = async ()=>{
            const token = await AscynStorage.getItem('token')
           
            if(token){
                let res = await Api.checkToken(token)

                if(res.token){
                    await AsyncStorage.setItem('token', res.token)
                    userDispatch({
                        type: 'setAvatar',
                        payload: {
                            avatar: res.data.avatar
                        }
                    })
    
                    navigation.reset({
                        routes: [{ name: 'MainTab' }]
                    })
                }else{
                    navigation.navigate('SignIn')

                }
            }else{
                navigation.navigate('SignIn')
            }
        }
        checkToken()
    },[])
    return(
        <Container>
            <Image source={Logo} style={{width:"100%" ,height:160}} />
            <LoadingIcon />
        </Container>
    )
}


