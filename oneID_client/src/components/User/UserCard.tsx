import React, { Key } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';
import { connect } from 'react-redux';
import { baseUrl } from '../../constants/Constants';
import { Card } from '../../models/Card';

const UserCard = (props:any) => {

    console.log(props.card);

    return(
        <View style={{display:'flex',justifyContent:'space-between', flexDirection:'column', alignItems:'center', backgroundColor:'red', width:'95%', height:250, borderRadius:20, padding:20}}>
            {props.card.id !== ''?
            // <Text style={[styles.cardText,{color:'white'}]}>{props.card.cardInfo.title}</Text>
             <View style= {{display:'flex',justifyContent:'space-between', flexDirection:'row', alignItems:'center',width:'98%', height:'100%'}}>
                <View>
                    <QRCode value={ baseUrl+'/share?cardId='+props.card.id+'&issuerId='+props.user.id+'&receiverId=51a6cbf7-456f-4693-8479-5f6654f475a2' }/>
                    {!props.sharedCard ? <Text style={{...styles.cardText,fontSize:16, color:'white'}}>@{props.user.username} </Text> : null}
                    {/* <Text style={[styles.cardText,{color:'white'}]}>Avatar</Text> */}
                </View>
                 <View style={{width:'60%'}}>
                    {Object.values(props.card.cardInfo).map((info:String,index)=><Text style={{...styles.cardText,fontSize:16, color:'white'}}>{Object.keys(props.card.cardInfo)[index]!=="cardTitle" ?`${Object.keys(props.card.cardInfo)[index]}: ${info}` : '' }</Text>)}
                </View>
                {/* <Text>UID: </Text>
                <Text>UID: </Text> */}
            </View> : 
            null}
            {props.customize && !props.sharedCard ?
             <View style={{position:'absolute', bottom:20, right:20}}>
                {props.card.id !== '' ?
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('CustomizeCard',{cardId:props.card.id}) }} style={{borderRadius:20, borderColor:'white', borderWidth:1, padding:8}}> 
                        <Text style={{color:'white'}}>Customize</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('CustomizeCard',{cardId:null}) }} style={{}}> 
                        <Text style={{color:'white', fontSize:40}}>+</Text>
                    </TouchableOpacity>
                }
            </View>:null}
        </View>
    );
}

const styles = StyleSheet.create({
    cardText:{
        fontSize:16
    },
});

const mapStateToProps = (state:any) => ({
    userCards: state.cards.userCards,
    sharedCards: state.cards.sharedCards
})


export default connect(mapStateToProps,null)(UserCard);