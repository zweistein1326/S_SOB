import { TextField } from '@mui/material';
import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react';
import {  Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Button from '../components/Button';
import UserCard from '../components/User/UserCard';
import { createCard } from '../functions/axios';
import { Card, CardInfo } from '../models/Card';
import { cards } from '../redux/reducers/Cards';
import { Ionicons } from '@expo/vector-icons';
import CheckItem from '../components/Card/CheckItem';
import { setCards } from '../redux/actions/CardActions';

const CustomizeCardScreen = (props:any) => {

    const {cardId} = props.route.params;
    const [cardTitle, setCardTitle] = useState('');
    const [name, setCardName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [social1, setSocial1] = useState('');
    const [social2, setSocial2] = useState('');
    const [social3, setSocial3] = useState('');

    let card : Card = {
        id:'',
        cardInfo: {name, cardTitle, email, website, social1, social2, social3},
        backgroundColor:'',
        foregroundColor:'' 
    };

    if(cardId!==null){
        card = props.cards.get(cardId);
        console.log('card',card);
    }    

    const handleSubmit = async() => {
        if(card.id){
            //update card info
        }
        else{
            const cardData: Card = {
            id: cardId,
            cardInfo: {name, cardTitle, email, website, social1, social2, social3},
            backgroundColor:'red', 
            foregroundColor:'white' 
        };
        const card = await createCard(cardData,props.user.id);
        props.setCards([card]);
        props.navigation.navigate('Home',{screen:'HomeScreen'})
        }
    }

    // const cardOptions = [
    //     {
    //         title:'Username',
    //         value:props.user.username,
    //         checked:false
    //     },
    //     {
    //         title:'Email',
    //         value:props.user.email,
    //         checked:false
    //     },
    // ]

    return(
        <ScrollView>
            <View style={styles.box}>
                {/* <Text>Card #{cardId}: {cardTitle}</Text> */}
                {/* Update card with each iteration of checkbox
                    Make the card attractive otherwise people wouldnt want to share it with other people
                    Link directly to social media instead of asking for links <- links are harder to enter
                */}
                <UserCard navigation={props.navigation} customize={false} card={card} user={props.user}/>
                <View style={{width:'100%', height:250, padding:20}}>
                    <Text>Customize Card Information</Text>

                    {/* {cardOptions.map((option)=> <CheckItem item = {option}/>)} */}
                    <Text>Select Avatar</Text>
                    
                    <View style = {{ padding:20, margin:10, borderColor:'white', borderBottomWidth:1, borderRadius:20 }}>
                        <Text>Title(this will not appear on the card)</Text>
                        <TextInput value={cardTitle} onChangeText = {(cardTitle)=>{setCardTitle(cardTitle)}} placeholder='Card Title'/>
                    </View>
                    <View style = {{ padding:20, margin:10, borderColor:'white', borderBottomWidth:1, borderRadius:20 }}>
                        <Text>Name</Text>
                        <TextInput value={name} onChangeText = {(name)=>{setCardName(name)}} placeholder='Name on Card'/>
                    </View>
                    <View style = {{ padding:20, margin:10, borderColor:'white', borderBottomWidth:1, borderRadius:20 }}>
                        <Text>Email</Text>
                        <TextInput value={email} onChangeText = {(email)=>{setEmail(email)}} placeholder='Email'/>
                    </View>
                    <View style = {{ padding:20, margin:10, borderColor:'white', borderBottomWidth:1, borderRadius:20 }}>
                        <Text>Website</Text>
                        <TextInput value={website} onChangeText = {(website)=>{setWebsite(website)}} placeholder='Email'/>
                    </View>
                    <View style = {{ padding:20, margin:10, borderColor:'white', borderBottomWidth:1, borderRadius:20 }}>
                        <Text>Social 1</Text>
                        <TextInput value={social1} onChangeText = {(social1)=>{setSocial1(social1)}} placeholder='Social 1'/>
                    </View>
                    <View style = {{ padding:20, margin:10, borderColor:'white', borderBottomWidth:1, borderRadius:20 }}>
                        <Text>Social 2</Text>
                        <TextInput value={social2} onChangeText = {(social2)=>{setSocial2(social2)}} placeholder='Social 2'/>
                    </View>
                    <View style = {{ padding:20, margin:10, borderColor:'white', borderBottomWidth:1, borderRadius:20 }}>
                        <Text>Social 3</Text>
                        <TextInput value={social3} onChangeText = {(social3)=>{setSocial3(social3)}} placeholder='Social 3'/>
                    </View>

                    <Button 
                    onPressed={handleSubmit}
                    textStyle={{color:'black'}}
                    style={{ padding:20, margin:10, borderRadius:20, alignItems:'center', justifyContent:'center', backgroundColor:'white' }} 
                    text={'Save'}/>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    box:{
        width:'100%',
        height:'100%',
        marginTop:10,
        paddingBottom:600,
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

export default connect(mapStateToProps,mapDispatchToProps)(CustomizeCardScreen);