/** @format */

import React, { useState } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CheckItem = (props: any) => {
	const [isSelected, setIsSelected] = useState(false);

	const onCheckMarkPress = () => {
		setIsSelected(!isSelected);
	};

	return (
		<View
			style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
			<Pressable
				style={styles.press}
				disabled={false}
				onPress={onCheckMarkPress}>
				{isSelected && <Ionicons name='checkmark' size={24} color='black' />}
			</Pressable>
			<Text style={{ fontSize: 16 }}> {props.item.title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	press: {
		width: 24,
		height: 24,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderWidth: 2,
		borderColor: 'coral',
		backgroundColor: 'transparent',
	},
});

export default CheckItem;
