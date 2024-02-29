import React from 'react'

import styled from 'styled-components/native'

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

const SeeProfileButtom = styled.View`
    width: 85px;
    height: 26px;
    border: 1px solid;
    border-radius: 10px;
    align-items: center;
`

const SeeProfileButtomText = styled.Text`
    font-size: 13px;
    color: #268596;
`

interface InfoData{
    data:{
            avatar:string,
            name:string
         }
}

export const CompanyItem : React.FC<InfoData> =  ({data}) => {
    return (
        <Area>
           <Avatar source={{uri: data.avatar}}    />
           <InfoArea>
                <UserName>{data.name}</UserName>
                <SeeProfileButtom>
                    <SeeProfileButtomText>Ver Perfil</SeeProfileButtomText>
                </SeeProfileButtom>
           </InfoArea>
        </Area>
    )

}