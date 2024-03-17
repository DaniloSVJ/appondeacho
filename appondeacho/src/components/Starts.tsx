
import React from 'react'
import styled from 'styled-components/native'

import Start from 'react-native-vector-icons/FontAwesome'
interface InfoData {

    start: number,
    showNumber: boolean


}

const StartArea = styled.View`
    flex-direction: row;
`;

const StartView = styled.View`
    flex-direction: row;
`;
const View = styled.View`
    flex-direction: row;

`;
const StartText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    margin-left: 5px;
    color: #737373;
`;
export const Starts: React.FC<InfoData> = ({ start, showNumber }) => {
    let s = [0, 0, 0, 0, 0];
    let floor = Math.floor(start);
    let left = start-floor;
    for(var i=0;i<floor;i++){
        s[i]=2;
    }
    if(left>0){
        s[i]=1;
    }
    
    
    return (
        <StartArea>
            <StartView>
                {
                    s.map((i, k) => <Start key={k} size={18} name={i === 0 ? 'star-o' : (i === 1 ? 'star-half-full' : 'star')} color='#DAA520' />)
                }
            </StartView>
            {
                     showNumber && <StartText>{start}</StartText>             
            }
        </StartArea>
    )

}