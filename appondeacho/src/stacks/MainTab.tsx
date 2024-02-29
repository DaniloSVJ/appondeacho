import 'react-native-gesture-handler'
import React from 'react'
import {createBottomTabNavigator,BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Appointments from '../screens/Appointments';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';
const Tab = createBottomTabNavigator()
import CustomTabBar from '../components/CustomTabBar';

export default()=>{
  
    return(
        <Tab.Navigator  


        tabBar={(props) => <CustomTabBar {...props} />}
        >

            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Tab.Screen name="Search" component={Search}/>
            <Tab.Screen name="Appointments" component={Appointments}/>
            <Tab.Screen name="Favorites" component={Favorites}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    )
    
}