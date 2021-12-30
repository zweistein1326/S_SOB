import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CredentialTile = (props:any) => {
    // Give a card like feel to the card
    return(
        <View style={{width:'80%', height:150, justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:'black', backgroundColor:'grey', margin:10, paddingHorizontal:10 }}>
            <TouchableOpacity onPress={()=>{
                // redirect to credential page
                props.navigation.navigate('Credential',{credential:props.credential})
            }}>
                <Text style={{color:'white'}}>id:{props.credential.id}</Text>
                <Text style={{color:'white', fontSize:18}} key={props.credential.id}>title:{props.credential.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CredentialTile;