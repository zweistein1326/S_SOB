import { Card } from '@mui/material';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UserCard = (props:any) => {
    return(
        <View style={{display:'flex',justifyContent:'space-between', flexDirection:'column', alignItems:'center', backgroundColor:'red', width:'95%', height:250, borderRadius:20, padding:20}}>
            <Text style={[styles.cardText,{color:'white'}]}>{props.card.title}</Text>
            <View style= {{display:'flex',justifyContent:'space-between', flexDirection:'row', alignItems:'center',width:'90%', height:'100%'}}>
                <View>
                    <Text style={[styles.cardText,{color:'white'}]}>Avatar</Text>
                </View>
                <View style={{width:'50%'}}>
                    <Text style={{...styles.cardText,fontSize:16, color:'white'}}>@{props.user.username} </Text>
                    <Text style={{...styles.cardText,fontSize:20, color:'white'}}>{props.user.firstname} {props.user.lastname} </Text>
                </View>
                {/* <Text>UID: </Text>
                <Text>UID: </Text> */}
            </View>
            {!props.customize?<View style={{position:'absolute', bottom:20, right:20}}>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('CustomizeCard',{cardId:props.card.id}) }} style={{borderRadius:20, borderColor:'white', borderWidth:1, padding:8}}> 
                    <Text style={{color:'white'}}>Customize</Text>
                </TouchableOpacity>
            </View>:null}
        </View>
    );
}

const styles = StyleSheet.create({
    cardText:{
        fontSize:16
    },
})

export default UserCard;