import { NavigationContainer, TabRouter } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/HomeScreen";
import React from 'react';
import LoginScreen from "../screens/LoginScreen";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from '../redux/store/store';
import CredentialScreen from "../screens/CredentialScreen";
import CustomizeCardScreen from "../screens/CustomizeCardScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CameraScreen from "../screens/CameraScreen";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "../screens/SettingsScreen";
import ContactsScreen from "../screens/ContactsScreen";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const MyTabs = () => {
	return(
		<Tab.Navigator screenOptions={({route})=>({
            tabBarIcon:({focused,color,size})=>{
                if(route.name=="HomeTab"){
                    return(
                       <Ionicons
                       name={
                           focused? 'home': 'home-outline'
                       }
                       size={size}
                       color={color}
                       />
                    )
                }
                else if(route.name=="ContactsScreen"){
                    return(
                       <Ionicons
                       name={
                           focused ? 'phone-portrait':'phone-portrait-outline'
                       }
                       size={size}
                       color={color}
                       />
                    )
                }
                else if(route.name=="SettingsScreen"){
                    return(
                       <Ionicons
                       name={
                           focused ? 'settings':'settings-outline'
                       }
                       size={size}
                       color={color}
                       />
                    )
                }
            },
            tabBarInactiveTintColor:'gray',
            tabBarActiveTintColor:'tomato'
        })}>
			<Tab.Screen options={{ headerShown:false }} name="HomeTab" component={Home}/>
			<Tab.Screen options={{ headerShown:false }} name="ContactsScreen" component={ContactsScreen}/>
			<Tab.Screen options={{ headerShown:false }} name="SettingsScreen" component={SettingsScreen}/>
		</Tab.Navigator>
	)
}

const store = createStore(reducers);

const AuthStack = () => {
return (
        <Stack.Navigator key={"Auth"}>
            <Stack.Screen
            name="Login"
            options={{headerShown:false}}
            component={LoginScreen}
            />
            <Stack.Screen
            name="Register"
            options={{headerShown:false}}
            component={RegisterScreen}
            />
        </Stack.Navigator>
    )};

const Home = () => {
    return (
        <Stack.Navigator key={'HomeNavigator'}>
            <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options = {{headerShown:false}}
            />
            <Stack.Screen
            name="CameraScreen"
            component={CameraScreen}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="CredentialScreen"
            component={CredentialScreen}
            />
            <Stack.Screen
            name="CustomizeCardScreen"
            component={CustomizeCardScreen}
            />
        </Stack.Navigator>
    )
}

const Navigator = () => {
    return(
        <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="AuthStack"
                    component={AuthStack}
                    options={{headerShown:false}}
                />
                <Stack.Screen
                    name="HomeStack"
                    component={MyTabs}
                    options={{headerShown:false}}
                />
                </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    )
}

export default Navigator;