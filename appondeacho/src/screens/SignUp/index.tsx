import React,{useState,useContext} from 'react'
import { Container,InputArea,CustomButton,CustomButtonText,SignMessageButton,SignMessageButtonText,SignMessageButtonTextBold } from './styles'
import { TouchableWithoutFeedback, Image, Keyboard } from 'react-native'
import Logo from '../../../assets/logoondeacho.png'
import SignInput from '../../components/SignInput'
import { useNavigation ,ParamListBase} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../context/UserContext'

import Api from '../../../Api'

export default () => {
    const[nameField,setNameField] = useState('')
    const[emailField,setEmailField] = useState('')
    const[passwoedField,setPasswoedField] = useState('')
    const {reset, navigate} = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const handleSignClick = async () =>{
        if(emailField!='' && passwoedField!=''){
            const { dispatch: userDispatch } = await useContext(UserContext)

            let res = await Api.signUp(nameField,emailField,passwoedField)
            if(res.token){
                await AsyncStorage.setItem('token', res.token)
                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: res.data.avatar
                    }
                })
                navigate('SignIn')
                alert('Deu Certo!')

            }else{
                alert('Erro'+res.error)

            }
        }else{
            alert('Preencha os campos!')

        }
    
    }

    const handleMessageButtonClick= () =>{

        navigate('SignIn')
    }    
    return (
        <Container>
            <Image source={Logo} style={{ width: "100%", height: 160 }} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <InputArea>
                <SignInput 
                    icon='shield-account' 
                    placeholder='Digite seu Nome' 
                    value={nameField} 
                    onChangeText={t=>setNameField(t)}
                />

                <SignInput 
                    icon='email' 
                    placeholder='Digite seu e-mail' 
                    value={emailField} 
                    onChangeText={t=>setEmailField(t)}
                />

                <SignInput 
                    icon='lock' 
                    placeholder='Digite sua senha' 
                    value={passwoedField} 
                    onChangeText={t=>setPasswoedField(t) } 
                    password={true}
                />
                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>Cadastrar</CustomButtonText>
                </CustomButton>

            </InputArea>

            </TouchableWithoutFeedback>
            
            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta:</SignMessageButtonText>
                <SignMessageButtonTextBold>Fazer Login!</SignMessageButtonTextBold>
            </SignMessageButton>
        
        </Container>

    )
}


