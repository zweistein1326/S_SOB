import React from 'react';
import { Text, View } from 'react-native';

const TestScreen = (props:any) => {
    console.log(props.route.params);
    return(
        <View>
            <Text>{props.route.params.qrcode.data}</Text>
        </View>
    )
}

export default TestScreen;