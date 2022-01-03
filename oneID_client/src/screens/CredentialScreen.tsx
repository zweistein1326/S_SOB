/** @format */

import React from 'react';
import { Text, View } from 'react-native';

const CredentialScreen = (props: any) => {
	const { credential } = props.route.params;
	return (
		<View>
			<Text>{credential.id}</Text>
			<Text>{credential.title}</Text>
			<Text>{credential.issuer} &lt;- Redirect to issuer's page on click</Text>
			<Text>QR Code to share this crednetial</Text>
		</View>
	);
};

export default CredentialScreen;
