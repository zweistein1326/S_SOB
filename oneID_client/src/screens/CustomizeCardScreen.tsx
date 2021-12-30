import { TextField } from '@mui/material';
import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react';
import {  Pressable, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Button from '../components/Button';
import UserCard from '../components/User/UserCard';
import { createCard } from '../functions/axios';
import { Card } from '../models/Card';
import { cards } from '../redux/reducers/Cards';
import { Ionicons } from '@expo/vector-icons';
import CheckItem from '../components/Card/CheckItem';
import { setCards } from '../redux/actions/CardActions';

const CustomizeCardScreen = (props:any) => {

    const {cardId} = props.route.params;
    let card : Card = {
        id:'',
        title:'',
        personalInfo:[],
        social:[],
        backgroundColor:'',
        foregroundColor:'' 
    };
    if(cardId!==null){
        card = props.cards[cardId];
    }
    
    
    const [cardTitle, setCardTitle] = useState(card.title);
    

    const handleSubmit = async() => {
        if(card.id){
            //update card info
        }
        else{
            const cardData: Card = {
            id:cardId,
            title:cardTitle,
            personalInfo:[{'fullname':'Siddharth Agarwal'}], 
            social:['https://www.instagram.com'], 
            backgroundColor:'red', 
            foregroundColor:'white' 
        };
        const card = await createCard(cardData,props.user.id);
        props.setCards([card]);
        props.navigation.navigate('Home',{screen:'HomeScreen'})
        }
    }

    const cardOptions = [
        {
            title:'Username',
            value:props.user.username,
            checked:false
        },
        {
            title:'Email',
            value:props.user.email,
            checked:false
        },
    ]

    

    return(
        <View style={styles.box}>
            {/* <Text>Card #{cardId}: {cardTitle}</Text> */}
            <UserCard customize={true} card={card} user={props.user}/>
            <View style={{width:'100%', height:250, padding:20}}>
                <Text>Customize Card Information</Text>

                {cardOptions.map((option)=> <CheckItem item = {option}/>)}
            
                <View style = {{ padding:20, margin:10, borderColor:'white', borderBottomWidth:1, borderRadius:20 }}>
                    <TextInput value={cardTitle} onChangeText = {(cardTitle)=>{setCardTitle(cardTitle)}} placeholder='Card Title'/>
                </View>
                <View style = {{ padding:20, margin:10, borderColor:'white', borderBottomWidth:1, borderRadius:20 }}>
                    <TextInput placeholder='Link to social media'/>
                    {/* {card.social.map((social)=><Text>{social}</Text>)} */}
                    <Text>+</Text>
                </View>
                <Button 
                onPressed={handleSubmit}
                textStyle={{color:'black'}}
                style={{ padding:20, margin:10, borderRadius:20, alignItems:'center', justifyContent:'center', backgroundColor:'white' }} 
                text={'Save'}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    box:{
        width:'100%',
        // padding:10,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
})

const mapStateToProps = (state:any) => ({
    user: state.auth.user,
    cards: state.cards
})

const mapDispatchToProps = (dispatch:any) => ({
    setCards: (cards:Card[]) => setCards(cards)
})

export default connect(mapStateToProps,null)(CustomizeCardScreen);