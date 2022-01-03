import { Props, useEffect, useState } from "react"
import { Box, Typography} from '@mui/material';
import { StyleSheet, Text, View } from "react-native";
import React from 'react';
import { connect } from "react-redux";
import CredentialTile from '../components/Credentials/CredentialTile';
import UserCard from "../components/User/UserCard";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Card } from "../models/Card";
import { style } from "@mui/system";
import Button from "../components/Button";

const HomeScreen = (props:any) =>{

    const [card,setCard] = useState({
            id:'',
            cardInfo:{
                cardTitle: '',
                name:'',
                email:'',
                website:'',
                social1:'',
                social2:'',
                social3:''
            },
            backgroundColor:'',
            foregroundColor:''
        });
    // const [sharedCards, setSharedCards] = useState<Card[]>([]);
    // const [userCards, setUserCards] = useState<Card[]>([]);

    let sharedCards:Card[] = [];
    props.sharedCards.forEach((card:Card)=> sharedCards.push(card));
    // setSharedCards(sharedCards1);

    let userCards: Card[] = [];
    props.userCards.forEach((card:Card) => userCards.push(card))
    // setUserCards(userCards);

    return(
        <ScrollView>
            <Text style={styles.heading}>Saved cards</Text>
        <View style={{display:'flex', alignItems:'center', paddingVertical:10}}>
            {
                userCards.map((card:Card,index)=>{return(<UserCard key={index} sharedCard={false} customize={true} card={card} navigation={props.navigation} user={props.user}/>)})
            }
            {/* {1==1? <></>:<UserCard key={null} customize={true} sharedCard={false} card={card} navigation={props.navigation} user={props.user}/>} */}
            {/* <FlatList data={props.cards} keyExtractor={(item)=>item? item.id : null} renderItem={({card}:any) => card ? <UserCard navigation={props.navigation} user={props.user}/> : null } /> */}
            {/* <View style={{ alignItems:'center' }}>
                <Text style={{width:'100%'}}>Saved Credentials</Text>
                {Object.values(props.credentials).map((credential:any,index)=><CredentialTile key={index} navigation={props.navigation} credential={credential}/>)}
            </View> */}
            <Button text="Scan Card" onPressed={()=>{props.navigation.navigate('Home',{screen:"CameraScreen"})}} textStyle={{color:'white'}} style={{backgroundColor:'black', padding:20 }} />
        </View>
        <Text style={styles.heading}>Saved contacts</Text>
         <View style={{display:'flex', alignItems:'center', paddingVertical:10}}>
            {
                sharedCards.map((card:Card,index)=>{
                    return(<UserCard key={index} sharedCard={true} customize={true} card={card} navigation={props.navigation} user={props.user}/>)
                })
            }
            </View>
        </ScrollView>
    )
}

const mapStateToProps = (state:any) => ({
    user: state.auth.user,
    credentials: state.credentials,
    userCards: state.cards.userCards,
    sharedCards: state.cards.sharedCards
})

const styles = StyleSheet.create({
    heading:{
        padding:8,
        fontSize:22,
        fontWeight:'bold',
    }
})

export default connect(mapStateToProps,null)(HomeScreen) ;