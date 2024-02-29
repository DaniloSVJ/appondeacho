import React from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import Icon5 from 'react-native-vector-icons/FontAwesome6';

import {
    createNavigatorFactory,
    NavigationState,
    ParamListBase,
    CommonActions,
    TabActionHelpers,
    TabNavigationState,
    TabRouter,
    TabRouterOptions,
    useNavigationBuilder,
    useNavigation,

  } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
const TabArea = styled.View`
    height: 60px;
    background-color: #006400;
    flex-direction: row;
`
const TabItem = styled.TouchableOpacity`
    flex:1;
    justify-content: center;
    align-items: center;
`

const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 35px;
  border: 3px solid #006400;
  margin-top: -20px;
`

interface props{
    state: TabNavigationState<ParamListBase>;

}
export default ( {state}:props)=>{

    const { reset, navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const goto =(screenName:string)=>{
            navigate(screenName)
    }
    return(
        <TabArea>
            <TabItem onPress={()=>goto('Home')} >
                <Icon style={{opacity: state.index===0? 1: 0.5}} name="home" size={24} color="#ffffff" />
            </TabItem >
            <TabItem onPress={()=>goto('Search')} >
                <Icon2 style={{opacity: state.index===1? 1: 0.5}} name="search" size={24} color="#ffffff" />
            </TabItem >
            <TabItemCenter onPress={()=>goto('Appointments')} >
                <Icon3  name="address-book" size={32} color="#006400" />
            </TabItemCenter >
            <TabItem onPress={()=>goto('Favorites')} >
                <Icon4 style={{opacity: state.index===3? 1: 0.5}} name="favorite-outline" size={24} color="#ffffff" />
            </TabItem >
            <TabItem onPress={()=>goto('Profile')} >
                <Icon5 style={{opacity: state.index===4? 1: 0.5}} name="circle-user" size={24} color="#ffffff" />
            </TabItem >
        </TabArea>
    )
}
