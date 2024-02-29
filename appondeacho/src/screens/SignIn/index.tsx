import React, { useState, useContext } from 'react'
import { Container, InputArea, CustomButton, CustomButtonText, SignMessageButton, SignMessageButtonText, SignMessageButtonTextBold } from './styles'
import { TouchableWithoutFeedback, Image, Keyboard } from 'react-native'

import Logo from '../../../assets/logoondeacho.png'
import SignInput from '../../components/SignInput'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Api from '../../../Api'
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../context/UserContext'
export default  () => {
    const [emailField, setEmailField] = useState('')
    const [passwoedField, setPasswoedField] = useState('')
    const { reset, navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { dispatch: userDispatch } =  useContext(UserContext)

    const handleSignClick = async () => {
     
        if (emailField != '' && passwoedField != '') {

            let json = await Api.signIn(emailField, passwoedField)
            if (json.token) {
                await AsyncStorage.setItem('token', json.token)
                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: json.data.avatar
                    }
                })

                reset({
                    routes: [{ name: 'MainTab' }]
                })
                alert('Deu Certo!')
            } else {
                alert('Email e/ou senha errados')
            }
        } else {
            alert('Preencha os campos!')
        }
    }

    const handleMessageButtonClick = () => {

        reset({
            routes: [{ name: 'SignUp' }]
        })
    }
    return (
        <Container>
            <Image source={Logo} style={{ width: "100%", height: 160 }} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <InputArea>


                    <SignInput
                        icon='email'
                        placeholder='Digite seu e-mail'
                        value={emailField}
                        onChangeText={t => setEmailField(t)}
                    />

                    <SignInput
                        icon='lock'
                        placeholder='Digite sua senha'
                        value={passwoedField}
                        onChangeText={t => setPasswoedField(t)}
                        password={true}
                    />


                    <CustomButton onPress={handleSignClick}>
                        <CustomButtonText>Login</CustomButtonText>
                    </CustomButton>
                </InputArea>
            </TouchableWithoutFeedback>
            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastra-se</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>




    )
}


