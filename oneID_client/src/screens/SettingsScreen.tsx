import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SettingsScreen = (props:any) => {
    return(
        <View style={styles.container}>
            <Text>This is the settings screen</Text>
            <Text>Update Default Phone number</Text>
            <Text>Update default email</Text>
            <Text>Update gender</Text>
            <Text>Update DOB</Text>
            <Text>Notifications</Text>
            <Text>Share feedback</Text>
            <Text>Contact Us</Text>
            <Text>Leave a review</Text>
            <Text>Logout</Text>
            <Button
					text='Logout'
					onPressed={() => {
						AsyncStorage.setItem('user','');
						props.navigation.navigate('AuthStack',{screen:'Login'})
						// logout user
					}}
					textStyle={{ color: 'white' }}
					style={{ backgroundColor: 'black', padding: 20 }}
				/>
        </View>
    );
}

const mapStateToProps = (state:any) => ({
    user: state.auth.user
})

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%'
    }
})

export default connect(mapStateToProps,null)(SettingsScreen);