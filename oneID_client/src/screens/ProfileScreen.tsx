import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

const ProfileScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Hi this is this profile screen</Text>
            <Text style={styles.text}>User Image and Background Image (preferably NFTs)</Text>
            <Text>My NFTs</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingTop:60
    },
    text:{
        fontSize:16
    }
})

const mapStateToProps = () => ({

})

export default connect()(ProfileScreen);