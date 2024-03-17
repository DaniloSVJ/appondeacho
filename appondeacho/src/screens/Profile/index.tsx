import {Button,Text} from 'react-native'

import {Container } from './styles'
import React,{useEffect,useContext} from 'react'
import Api from '../../../Api'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export default ()=>{
    const {reset} = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const handleLogoutClick =async()=>{
        await Api.logout();
        reset({
            routes:[{name:'SignIn'}]
        })
    }
    return (
        <Container>
            <Text>Profile</Text>
            <Button title="Sair" onPress={handleLogoutClick} />
        </Container>
    )

}