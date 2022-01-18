import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Button = (props:any) => {

    return(
        <TouchableOpacity onPress={props.onPressed} style = {props.style}>
            <Text style={props.textStyle}>{props.text? props.text:props.icon}</Text>
        </TouchableOpacity>
    )
}

export default Button;