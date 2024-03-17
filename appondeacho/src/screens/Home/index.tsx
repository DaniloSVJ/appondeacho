import { Image, Text } from 'react-native';
import { ICoords, IDcoords } from '../../dto/ICoors'
import Api from '../../../Api';
import axios from 'axios';
import AscynStorage from '@react-native-async-storage/async-storage'

import Ondeacho from '../../../ApiOAcho'
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
import React, { useEffect, useState } from 'react';

import SearchIcon from 'react-native-vector-icons/Feather';
import MyLocationIcon from 'react-native-vector-icons/MaterialIcons';
import * as Location from 'expo-location';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompanyItem } from '../../components/CompanyItem'
import { RefreshControl } from 'react-native';

export default () => {
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState<Location.LocationObject | null>(null); // Correção aqui
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false)
    const handleLocationFinder = async () => {

        setCoords(null)
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
            setLoading(false);
            setLocationText('');
            setList([]);
            let location = await Location.getCurrentPositionAsync({});

            await setCoords(location);
            setLoading(true);
            console.log('veio aqui 1')
            setList([]);
            console.log('veio aqui 2')

            let lat = location.coords.latitude;
            let lng = location.coords.longitude
            
            if (coords) {
                lat = coords.coords.latitude
                lng = coords.coords.longitude
            }
            console.log('veio aqui 3')
            try {

                console.log('veio aqui eee')
                console.log(lat)
                console.log(lng)
                console.log(location)
            
                console.log('2222222')
                console.log('22225555555')


                const teste = await Ondeacho.get(`productssearch?latitude=${lat}&longitude=${lng}&nameproduct=${locationText}`)

                setList(teste.data); // Assumindo que a resposta da sua API contém um array de empresas
                console.log(teste.data)
                console.log(location)

            } catch (error) {
                if (error) {
                    console.error('Erro na requisição:', error);
                    console.log('8888')

                    // console.error('Detalhes do erro:', error.message);
                    // console.error('mais detalhes:', error.config); // Aqui você obtém os detalhes do erro
                    // console.error('mais detalhes:', error.code); // Aqui você obtém os detalhes do erro
                    // console.error('mais detalhes:', error.isAxiosError);
                    // console.error('mais detalhes:', error.request);

                } else {
                    // Se não for um erro do Axios, faça algo diferente
                    console.error('Erro desconhecido:', error);
                }
            }
            console.log('veio aqui 4')


            setLoading(false);
            console.log('veio aqui 5')

        }
    };
    const getCompanys = async () => {
        setLoading(true);

        setList([]);

        let lat;
        let lng;

        if (coords) {
            lat = coords.coords.latitude
            lng = coords.coords.longitude
        }

        setLoading(false);

    }
    const handleLocationSearch = () => {
        setCoords(null);
        getCompanys()



    }
    useEffect(() => {
        console.log('1111111')
        console.log(Ondeacho.getUri())

       
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        console.log(Ondeacho.getUri)
    }

    return (
        <Container>
            <Scroller
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <HeaderArea>
                    <HeaderTitle>
                        Encotre o seu barbeiro favorito
                    </HeaderTitle>
                    <SearchButton onPress={() => navigate('Search')}>
                        <SearchIcon name={'search'} size={26} color="#FFFFFF" />
                    </SearchButton>

                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder='Onde você está'
                        placeholderTextColor='#fff'
                        value={locationText}
                        onChangeText={setLocationText}
                        onEndEditing={handleLocationSearch}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon name={'my-location'} size={24} color="#FFFFFF" />
                    </LocationFinder>


                </LocationArea>

                {
                    // loading &&
                    // <LoadingIcon size='large' color="#fff"/>
                }
                <ListArea>
                    {
                        list.map((item, k) => (
                            <CompanyItem key={k} data={item} />

                        ))
                    }
                </ListArea>
            </Scroller>

        </Container>
    )

}