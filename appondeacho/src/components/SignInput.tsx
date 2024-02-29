import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import styled from 'styled-components/native';
import Svg, { } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const InputArea = styled.View`
  width: 100%;
  height: 60px;
  background-color: #B0E0E6;
  flex-direction: row;
  border-radius: 30px;
  padding-left: 15px;
  align-items: center;
  margin-bottom: 15px;
`;

interface IconProps {
    icon: string;
    placeholder:string;
    value:string;
    onChangeText:(text: string) => void;
    password?: boolean ;
}
const Input = styled.TextInput`
    flex:1;
    font-size: 16px;
    color: #006400;
    margin-left: 10px;

`
const CustomIcon: React.FC<IconProps> = ({ icon,placeholder,value ,onChangeText,password}) => {
    // Verifica se o ícone é válido ou vazio
    const isPassword = password?password:false

    return (
        <InputArea>
          <Icon name={icon} size={20} color="#006400" />
          <Input placeholder={placeholder} value={value} onChangeText={onChangeText} secureTextEntry={isPassword}/>
        </InputArea>
    );
};

export default CustomIcon;
