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
        id:'',
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

    return(
        <ScrollView>
            <Text style={styles.heading}>Saved cards</Text>
        <View style={{display:'flex', alignItems:'center', paddingVertical:10}}>
            {props.cards.length>0 ? props.cards.map((card:Card) => {
                if(card!=null){
                      return (<UserCard customize={true} key={card.id} navigation={props.navigation} card={card} user={props.user}/>)  
                }
            }):<UserCard key={''} customize={true} card={null} navigation={props.navigation} user={props.user}/>}
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