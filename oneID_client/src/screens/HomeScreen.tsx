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

const HomeScreen = (props:any) =>{

    // const [credentials,setCredentials] = useState([]);
    
    // const findUserCredentials = () => {
    //     setCredentials(props.credentials);
    // }

    // useEffect(findUserCredentials,[]);

    const card: Card = {
        id:null,
        cardInfo:{
            cardTitle:'',
            name:'',
            email:'',
            website:'',
            social1:'',
            social2:'',
            social3:''
        },
        backgroundColor:'',
        foregroundColor:''
    }

    let cards: Card[] = [];
        props.cards.forEach((card:Card) => cards.push(card))

    return(
        <ScrollView>
            <Text style={styles.heading}>Saved cards</Text>
        <View style={{display:'flex', alignItems:'center', paddingVertical:10}}>
            {
                cards.map((card:Card)=>{return(<UserCard key={''} customize={true} card={card} navigation={props.navigation} user={props.user}/>)})
            }
            {1==1? <></>:<UserCard key={''} customize={true} card={card} navigation={props.navigation} user={props.user}/>}
            {/* <FlatList data={props.cards} keyExtractor={(item)=>item? item.id : null} renderItem={({card}:any) => card ? <UserCard navigation={props.navigation} user={props.user}/> : null } /> */}
            {/* <View style={{ alignItems:'center' }}>
                <Text style={{width:'100%'}}>Saved Credentials</Text>
                {Object.values(props.credentials).map((credential:any,index)=><CredentialTile key={index} navigation={props.navigation} credential={credential}/>)}
            </View> */}
        </View>
        <Text style={styles.heading}>Saved contacts</Text>
        </ScrollView>
    )
}

const mapStateToProps = (state:any) => ({
    user: state.auth.user,
    credentials: state.credentials,
    cards: state.cards
})

const styles = StyleSheet.create({
    heading:{
        padding:8,
        fontSize:22,
        fontWeight:'bold',
    }
})

export default connect(mapStateToProps,null)(HomeScreen) ;