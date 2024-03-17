import React from 'react'
import styled from 'styled-components/native'



export const Container = styled.SafeAreaView`
    background-color: #2F4F4F;
    flex: 1;

`
export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;

`

export const HeaderArea = styled.View`
margin-top: 40px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`
export const HeaderTitle = styled.Text`
    width:250px;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    
`
export const SearchButton = styled.TouchableOpacity`
    width: 26px;
    height: 26px;

`
export const LocationArea = styled.View`
    background-color: #4EADBE;
    height: 60px;
    border-radius: 30px;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
    padding-right: 30px;


`
export const LocationInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #fff;
`
export const LocationFinder = styled.TouchableOpacity`
    width: 24px;
    height: 24px;
`
export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`

export const ListArea = styled.View`

`





