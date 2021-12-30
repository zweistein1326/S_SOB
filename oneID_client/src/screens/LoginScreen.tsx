import React, { useState } from 'react';
import {  StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { login } from '../functions/axios';
import { setUser } from '../redux/actions/AuthActions';
import { setCards } from '../redux/actions/CardActions';
import { setCredentials } from '../redux/actions/CredentialActions';

const LoginScreen = (props:any) => {
    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');

    const handleSubmit = async() => {
        // send login request
        const user = await login({ username,password });
        // console.log(user);
        if(!!user){
            props.setUser(user);
            if(user.credentials){
                props.setUserCredentials(Object.values(user.credentials)); 
            }
            if(user.cards){
                if(user.cards.length >= 1 ){
                    props.setUserCards(Object.values(user.cards));
                    props.navigation.navigate('Home');
                }
            }
            else{
                props.navigation.navigate('Home',{
                screen:'CustomizeCard',
                params:{cardId:null}
            });
            }
        }
        else{
            console.log('login failed');
        }
    }

    return(
        <View style={styles.box}>
            <View style={styles.card}>
                <View style = {{ padding:20, margin:10, borderColor:'white', borderWidth:1, borderRadius:20 }}>
                    <TextInput 
                        onChangeText={(username)=>{
                            setUsername(username)
                        }} 
                        placeholder='username'/>
                </View>
                <View style = {{ padding:20, margin:10, borderColor:'white', borderWidth:1, borderRadius:20 }}>
                    <TextInput onChangeText={(password)=>{setPassword(password)}} placeholder='password'/>
                </View>
                <View style={{display:'flex', margin:10, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity onPress={()=>{
                        props.navigation.navigate('Register');
                        }}><Text style={{color:'blue'}}> Register</Text></TouchableOpacity>
                </View>
                <View>
                    <Button 
                    onPressed = {handleSubmit}
                    textStyle={{color:'black'}} 
                    style={{ padding:12, margin:10, borderRadius:20, alignItems:'center', justifyContent:'center', backgroundColor:'white' }} 
                    text={'Next'}/>
                </View>
            </View>
        </View>
    )
}

// const mapStateToProps = (state:any) => ({
//     auth: state.auth
// })

const styles = StyleSheet.create({
    box:{
        height:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    card:{
        width:'95%',
        padding:10,
        // backgroundColor:'gold',
        borderRadius:20,
        borderWidth:1,
        borderColor:'transparent'
        }
})

const mapDispatchToProps = (dispatch:any) => ({
    setUser: (user:any) => dispatch(setUser(user)),
    setUserCredentials: (credentials:any[]) => dispatch(setCredentials(credentials)),
    setUserCards: (cards:any[]) => dispatch(setCards(cards))
})

export default connect(null,mapDispatchToProps)(LoginScreen);