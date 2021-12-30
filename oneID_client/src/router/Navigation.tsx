import { NavigationContainer } from "@react-navigation/native"
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

const Stack = createNativeStackNavigator();

const store = createStore(reducers);

const AuthStack = () => {
return (
        <Stack.Navigator>
            <Stack.Screen
            name="Login"
            component={LoginScreen}
            />
            <Stack.Screen
            name="Register"
            component={RegisterScreen}
            />
        </Stack.Navigator>
    )};

const Home = () => {
    return (
        <Stack.Navigator key={'Home'}>
            <Stack.Screen
            name="Home"
            component={HomeScreen}
            options = {{title:'Welcome'}}
            />
            <Stack.Screen
            name="Credential"
            component={CredentialScreen}
            />
            <Stack.Screen
            name="CustomizeCard"
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
                    name="Auth"
                    component={AuthStack}
                    options={{headerShown:false}}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                />
                </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    )
}

export default Navigator;