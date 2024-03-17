import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useContext, useState } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {
    Callout,
    Marker,
    PROVIDER_GOOGLE,
    Region,
} from "react-native-maps";
import { Container } from './styles';
import Api from '../../../Api';
import { Image } from 'react-native';
import IconOring from 'react-native-vector-icons/MaterialIcons';
import {createIconSetFromIcoMoon}  from 'react-native-vector-icons';

interface RouteParams {
    latitude: number,
    longitude: number,
    id: number,
    avatar: string,
    name: string,
    stars: number
}
interface IRegion {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}
import Ondeacho from '../../../ApiOAcho'

export const RouteMaps: React.FC = () => {
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { params } = useRoute()
    const parms = params as RouteParams
    const [regionOrigen, setRegionOrigen] = useState<IRegion>()
    const [initialRegion, setInitialRegion] = useState<IRegion>()
    const [regionDestiny, setRegionDestiny] = useState<IRegion>()
    const [onOff,setOnOff] = useState(0)
    const [coords, setCoords] = useState<Location.LocationObject | null>(null); // Correção aqui
    const [urlInfoMao, setUserInfoMao] = useState('https://www.google.com/maps/place/Google/@59.326069,-95.989235,3z/');
    let origemLatitude: number
    let origemLongitude: number
    let destinoLatitude = -3.7667735
    let destinoLongitude = -38.5891972

    const [userInfo, setUserInfo] = useState({
        id: parms.id,
        name: parms.name,
        avatar: parms.avatar,
        start: parms.stars,
        latitude:parms.latitude,
        longitude:parms.longitude,
    })
    const iconToImage = async () => {
        const iconData = await IconOring.getImageSource('location-history', 10);
        console.log('rrrrrrrrrrrrrrrrrr')
        
        return iconData;
    };
    useEffect(() => {
        const handleLocationFinder = async () => {

            setCoords(null)
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status === 'granted') {

                let location = await Location.getCurrentPositionAsync({});

                await setCoords(location);
                console.log('veio aqui')

                origemLatitude = await location.coords.latitude
                origemLongitude = await location.coords.longitude
                setRegionOrigen({
                    latitude: origemLatitude,
                    longitude: origemLongitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                })
                setInitialRegion({
                    latitude: origemLatitude,
                    longitude: origemLongitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                })
                console.log('===============')
                console.log('origemLatitude')
                console.log(origemLatitude)
                console.log('origemLongitude')
                console.log(origemLongitude)
                console.log('---------------0----')
            }
            if (coords) {
                
                
            }
         

        };
        handleLocationFinder();

        const getBarbesInfo = async () => {
            
           

                setRegionDestiny({
                    latitude: userInfo.latitude,
                    longitude: userInfo.longitude,
                    latitudeDelta: 3,
                    longitudeDelta: 3
                })

                console.log(destinoLatitude)
                console.log(destinoLongitude)
                console.log('api kei é: ' + process.env.EXPO_PUBLIC_GOOGLE_MAPS_APIKEY)
           
        }
        getBarbesInfo()
    

      

        Location.watchPositionAsync({
            accuracy: Location.LocationAccuracy.Highest,
            timeInterval: 5000,
            distanceInterval: 1
        }, (response) => {
            // setRegionOrigen({
            //     latitude:response.coords.latitude,
            //     longitude:response.coords.longitude,
            //     latitudeDelta:0.005,
            //     longitudeDelta:0.005
            // })
            // setInitialRegion({
            //     latitude:response.coords.latitude,
            //     longitude:response.coords.longitude,
            //     latitudeDelta:0.005,
            //     longitudeDelta:0.005
            // })
            if(onOff==0){
                setOnOff(1)
            }else if(onOff==1){
                setOnOff(0)
            }
        })
    }, [])
    const ativiOnOff = ()=>{
        
        
    }
    
    return (
        <Container>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1, width: '100%' }}
                region={regionOrigen}
                initialRegion={initialRegion}
            >
                <Marker
                    
                    calloutAnchor={{
                        x: 2.9,
                        y: 0.8,
                    }}
                    coordinate={{
                        latitude: regionOrigen?.latitude || 0,
                        longitude: regionOrigen?.longitude || 0
                    }}

                >
                    <IconOring name='my-location' size={35} color={'blue'} />
                </Marker>
                <MapViewDirections

                    origin={regionOrigen}
                    destination={regionDestiny}
                    apikey={'AIzaSyAY4JljX6Wb_OPC9KTdcOExaGk8VDGtgKQ'}
                    strokeWidth={7}
                    strokeColor='#008000'

                />
                <Marker

                    calloutAnchor={{
                        x: 2.9,
                        y: 0.8,
                    }}
                    coordinate={{
                        latitude: regionDestiny?.latitude || 0,
                        longitude: regionDestiny?.longitude || 0
                    }}

                >   
                   
                    <IconOring name='local-grocery-store' size={35} color={onOff==0?'#006400':"red"} />
                </Marker>
            </MapView>

        </Container>
    )

}