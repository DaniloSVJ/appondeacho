import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useContext, useState } from 'react';
import { Text } from 'react-native';
import { Container } from './styles';
import Api from '../../../Api';

interface RouteParams {
    id: number,
    avatar: string,
    name: string,
    stars: number,
    lat: number,
    log: number
}
export const Company: React.FC = () => {
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { params } = useRoute()
    const parms = params as RouteParams

    const [userInfo, setUserInfo] = useState({
        id: parms.id,
        name: parms.name,
        avatar: parms.avatar,
        start: parms.stars
    })
    useEffect(() => {
        console.log('wwwwww')
        const getBarbesInfo = async () => {
            let json = await Api.getBarber(parms.id)
            console.log('dfdfdf')
            if(json.error==''){
                console.log('erererer')
                
                setUserInfo(json.data);
            }
        }
        getBarbesInfo()
    })
    return (
        <Container>
            <Text>Empresa: {userInfo.name}</Text>
        </Container>
    )

}