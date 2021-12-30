import { Props, useEffect, useState } from "react"
import { Box, Typography} from '@mui/material';
import { Text, View } from "react-native";
import React from 'react';
import { connect } from "react-redux";
import CredentialTile from '../components/Credentials/CredentialTile';
import UserCard from "../components/User/UserCard";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Card } from "../models/Card";

const HomeScreen = (props:any) =>{

    // const [credentials,setCredentials] = useState([]);
    
    // const findUserCredentials = () => {
    //     setCredentials(props.credentials);
    // }

    // useEffect(findUserCredentials,[]);
    console.log(props.credentials.length);
    console.log('cards',props.cards.length);

    return(
        <ScrollView>
        <View style={{display:'flex', alignItems:'center', paddingVertical:10}}>
            {props.cards.map((card:Card) => {
                if(card!=null){
                      return (<UserCard key={card.id} navigation={props.navigation} card={card} user={props.user}/>)  
                }
            })}
            {/* <FlatList data={props.cards} keyExtractor={(item)=>item? item.id : null} renderItem={({card}:any) => card ? <UserCard navigation={props.navigation} user={props.user}/> : null } /> */}
            {/* <View style={{ alignItems:'center' }}>
                <Text style={{width:'100%'}}>Saved Credentials</Text>
                {Object.values(props.credentials).map((credential:any,index)=><CredentialTile key={index} navigation={props.navigation} credential={credential}/>)}
            </View> */}
        </View>
        </ScrollView>
    )
}

const mapStateToProps = (state:any) => ({
    user: state.auth.user,
    credentials: state.credentials,
    cards: state.cards
})

export default connect(mapStateToProps,null)(HomeScreen) ;