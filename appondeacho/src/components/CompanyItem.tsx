import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';

import styled from 'styled-components/native'
import { Starts } from './Starts'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import api_ondeacho from '../../ApiOAcho'
const Area = styled.TouchableOpacity`
    background-color: #fff;
    margin-top: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
`

const Avatar = styled.Image`
    width: 88px;
    height: 88px;
    border-radius: 20px;
  
`

const InfoArea = styled.View`
    margin-left: 20px;
    justify-content: space-between;

`

const UserName = styled.Text`
    font-size: 17px;
    font-weight: bold;

`
const SeeProfile = styled.View`
align-items: center;
justify-content: center;
`
const SeeProfileButtom = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    border: 1px solid #1A73E8;

    font-weight: bold;
    background-color: #1A73E8;
    margin-left: 10px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;

   
`

const Price = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #008000;
`

const Product = styled.Text`
    font-size: 14px;
    font-weight: bold;
`
const SeeProfileButtomText = styled.Text`
    font-size: 13px;
    color: #FFFFFF;

`

interface InfoData {
    data: {
        id: number,
        brand: string,
        measures: string,
        name: string,
        price: number
        company: {
            socialreason: string,
            logo: string,
            stars: number,
            address: string,
            neighborhood: string
            latitude: number,
            longitude: number,
        }
    }
}



export const CompanyItem: React.FC<InfoData> = ({ data }) => {
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const uriImage = api_ondeacho.getUri() + data.company.logo
    console.log(uriImage)
    const handleClick = () => {
        navigate('RouteMaps', {
            id: data.id,
            name: data.name,
            logo: data.company.logo,
            price: data.price,
            latitude:data.company.latitude,
            longitude:data.company.longitude,
        })
    }

    return (
        <Area >
            <Avatar source={{ uri: uriImage }} />
            <InfoArea>
                <UserName>{data.company.socialreason}</UserName>
                <Product>{data.name} {data.measures}</Product>
                <Product>Marca {data.brand}</Product>
                <Price>Preço: {data.price}</Price>
                <Starts start={data.company.stars} showNumber={true} />

            </InfoArea>
            <SeeProfile>
                <SeeProfileButtom onPress={handleClick}>
                    <Icon name='directions' size={35} color="#FFFFFF" />
                </SeeProfileButtom>
            </SeeProfile>
        </Area>
    )

}