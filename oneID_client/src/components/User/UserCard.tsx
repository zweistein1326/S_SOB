import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from '../../models/Card';

interface Props{
    card: Card,
    user: User,
}

const UserCard = (props:Props) => {

    return(
        <View style={{display:'flex',justifyContent:'space-between', flexDirection:'column', alignItems:'center', backgroundColor:'red', width:'95%', height:250, borderRadius:20, padding:20}}>
            {!!props.card.cardInfo?
            // <Text style={[styles.cardText,{color:'white'}]}>{props.card.cardInfo.title}</Text>
             <View style= {{display:'flex',justifyContent:'space-between', flexDirection:'row', alignItems:'center',width:'98%', height:'100%'}}>
                <View>
                    <Text style={[styles.cardText,{color:'white'}]}>Avatar</Text>
                </View>
                 <View style={{width:'60%'}}>
                    <Text style={{...styles.cardText,fontSize:16, color:'white'}}>@{props.user.username} </Text>
                    <Text style={{...styles.cardText,fontSize:16, color:'white'}}>Fullname: {props.card.cardInfo.name}</Text>
                {Object.values(props.card.cardInfo).map((info:String,index)=><Text style={{...styles.cardText,fontSize:16, color:'white'}}>{Object.keys(props.card.cardInfo)[index]}: {info}</Text>)}
                </View>
                {/* <Text>UID: </Text>
                <Text>UID: </Text> */}
            </View> : 
            null}
            {/* {!props.customize ? <View style={{position:'absolute', bottom:20, right:20}}>
                 {props.card.cardInfo?
                 <TouchableOpacity onPress={()=>{props.navigation.navigate('CustomizeCard',{cardId:props.card.cardInfo.id}) }} style={{borderRadius:20, borderColor:'white', borderWidth:1, padding:8}}> 
                    <Text style={{color:'white'}}>Customize</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>{props.navigation.navigate('CustomizeCard',{cardId:null}) }} style={{}}> 
                    <Text style={{color:'white', fontSize:40}}>+</Text>
                </TouchableOpacity>
            
                }
            </View>:null} */}
        </View>
    );
}

const styles = StyleSheet.create({
    cardText:{
        fontSize:16
    },
})

export default UserCard;