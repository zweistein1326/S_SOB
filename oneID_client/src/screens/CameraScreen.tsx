import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Linking } from 'react-native';
// import { PERMISSIONS } from 'react-native-permissions';
import Button from '../components/Button';
import { Camera } from 'expo-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BarCodeScanner from 'expo-barcode-scanner';
import { connect } from 'react-redux';

const CameraScreen = (props:any) => {
    
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(()=>{
        (async()=>{
            const {status} = await Camera.requestPermissionsAsync();
            console.log(status);
            setHasPermission( status == "granted")
        })();
    },[]);

    if(hasPermission === null){
        return <View/>;
    }
    if(hasPermission===false){
        return <Text>No access to camera</Text>
    }

    return(
        <View style={styles.body}>
            <Camera onBarCodeScanned={({type,data})=>{
                console.log(data+props.user.id);
                Linking.openURL(data+props.user.id)
                }} type={type} style={styles.camera}>
                <Button text="Capture" style={{width:'100%', padding:20, backgroundColor:'blue'}} textStyle={{color:'black'}}/>
                <TouchableOpacity style={styles.button} onPress={()=>{setType(type===Camera.Constants.Type.back?Camera.Constants.Type.front: Camera.Constants.Type.back)}}></TouchableOpacity>
            </Camera>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        height:'100%',
        width:'100%'
    },
    camera: {
        flex:1, 
        alignItems:'center',
        justifyContent:'flex-end',
        width:'100%'
    },
    button:{
        padding: 10,
        backgroundColor: 'red'
    }
})

const mapStateToProps = (state:any) => ({
    user: state.auth.user,
})

export default connect(mapStateToProps,null)(CameraScreen);