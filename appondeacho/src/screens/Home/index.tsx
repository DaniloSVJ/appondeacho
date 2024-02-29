import {Image,Text} from 'react-native';
import  {ICoords} from '../../dto/ICoors'
import Api from '../../../Api';
import {
    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,
    LocationArea,
    LocationInput,
    LocationFinder,
    LoadingIcon,
    ListArea
} from './styles';
import React,{useEffect,useContext, useState} from 'react';

import SearchIcon from 'react-native-vector-icons/Feather';
import MyLocationIcon from 'react-native-vector-icons/MaterialIcons';
import * as Location from 'expo-location';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {CompanyItem} from '../../components/CompanyItem'

export default ()=>{
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState<Location.LocationObject | null>(null); // Correção aqui
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    const handleLocationFinder = async () => {
        
        setCoords(null)
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
            setLoading(false);
            setLocationText('');
            setList([]);
            let location = await Location.getCurrentPositionAsync({});
            setCoords(location);
        }
    };
    const getBarbers = async () =>{
        setLoading(true);
        setList([]);
        
        let res= await Api.getBarbers();
        console.log(res)
        if (res.error ==''){
            if(res.loc){
                setLocationText(res.loc)
            }
            setList(res.data);
        }else{
            alert("Erro: "+ res.error);
        }
        setLoading(false);

    }
    useEffect(()=>{
        getBarbers()
    },[]);


    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <HeaderTitle>
                        Encotre o seu barbeiro favorito
                        </HeaderTitle>
                        <SearchButton onPress={()=>navigate('Search')}>
                            <SearchIcon name={'search'} size={26} color="#FFFFFF" />
                        </SearchButton>
                   
                </HeaderArea>

                <LocationArea>
                    <LocationInput 
                        placeholder='Onde você está'
                        placeholderTextColor='#fff'
                        value={locationText}
                        onChangeText={setLocationText}

                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon name={'my-location'} size={24} color="#FFFFFF"/>
                    </LocationFinder>
                    

                </LocationArea>

                {
                    loading &&
                    <LoadingIcon size='large' color="#fff"/>
                }
                <ListArea>
                    {
                        list.map((item,k)=>(
                            <CompanyItem key={k} data={item}/>

                        ))
                    }
                </ListArea>
            </Scroller>
            
        </Container>
    )

}