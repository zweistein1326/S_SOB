/** @format */

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CredentialTile = (props: any) => {
	// Give a card like feel to the card
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => {
					// redirect to credential page
					props.navigation.navigate('Credential', {
						credential: props.credential,
					});
				}}>
				<Text style={styles.id_text}>id:{props.credential.id}</Text>
				<Text style={styles.text} key={props.credential.id}>
					title:{props.credential.title}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '80%',
		height: 150,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: 'grey',
		margin: 10,
		paddingHorizontal: 10,
	},
	id_text: { color: 'white' },
	text: { color: 'white', fontSize: 18 },
});

export default CredentialTile;
