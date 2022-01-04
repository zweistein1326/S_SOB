/** @format */

import { resolve } from 'node:path/win32';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Button from '../components/Button';
import {
	getCardById,
	getCardsForUser,
	login,
	getUserById,
} from '../functions/axios';
import { Card } from '../models/Card';
import { setUser } from '../redux/actions/AuthActions';
import { setSharedCards, setUserCards } from '../redux/actions/CardActions';
import { setCredentials } from '../redux/actions/CredentialActions';

const LoginScreen = (props: any) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const persistentLogin = async () => {
		let loggedInUser: String = await AsyncStorage.getItem('user');
		if (loggedInUser!=='') {
			console.log(loggedInUser);
			let foundUser = await getUserById(loggedInUser);
			let cards = await getCardsForUser(loggedInUser);
			//let sharedCards = foundUser.sharedCards;
			let sharedCards = [];

			if (foundUser.sharedCards) {
				var bar = new Promise((resolve, reject) => {
					foundUser.sharedCards.forEach(
						async (cardId: String, index: number) => {
							const card = await getCardById(cardId);
							props.setSharedCards([card]);
							sharedCards.push(card);
							if (index === foundUser.sharedCards.length - 1) {
								resolve(null);
							}
						}
					);
				});
				bar.then(() => {
					if (!!loggedInUser) {
						props.setUser(foundUser);
						props.setUserCards(cards);
						props.navigation.navigate('Home', { screen: 'HomeScreen' });
					} else {
						console.log('login failed');
					}
				});
			} else {
				props.setUser(foundUser);
				props.setUserCards(cards);
				props.navigation.navigate('Home', { screen: 'HomeScreen' });
			}
		} else {
		}
	};
	useEffect(() => {
		persistentLogin();
	}, []);

	const handleSubmit = async () => {
		// send login request
		const user = await login({ username, password });
		const cards = await getCardsForUser(user.id);
		const sharedCards: Card[] = [];
		if (user.sharedCards) {
			var bar = new Promise((resolve, reject) => {
				user.sharedCards.forEach(async (cardId: String, index: number) => {
					const card = await getCardById(cardId);
					props.setSharedCards([card]);
					sharedCards.push(card);
					if (index === user.sharedCards.length - 1) {
						resolve(null);
					}
				});
			});
			bar.then(() => {
				if (!!user) {
					props.setUser(user);
					// store the user in localStorage
					AsyncStorage.setItem('user', user.id);
					if (user.credentials) {
						props.setUserCredentials(Object.values(user.credentials));
					}
					props.setUserCards(cards);
					props.navigation.navigate('Home', { screen: 'HomeScreen' });
					// else{
					//     props.navigation.navigate('Home',{
					//     screen:'CustomizeCard',
					//     params:{cardId:null}
					// });
					// }
				} else {
					console.log('login failed');
				}
			});
		}
	};

	return (
		<View style={styles.box}>
			<View style={styles.card}>
				<View
					style={{
						padding: 20,
						margin: 10,
						borderColor: 'white',
						borderWidth: 1,
						borderRadius: 20,
					}}>
					<TextInput
						onChangeText={(username) => {
							setUsername(username);
						}}
						placeholder='username'
					/>
				</View>
				<View
					style={{
						padding: 20,
						margin: 10,
						borderColor: 'white',
						borderWidth: 1,
						borderRadius: 20,
					}}>
					<TextInput
						onChangeText={(password) => {
							setPassword(password);
						}}
						placeholder='password'
					/>
				</View>
				<View
					style={{
						display: 'flex',
						margin: 10,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<Text>Don't have an account?</Text>
					<TouchableOpacity
						onPress={() => {
							props.navigation.navigate('Register');
						}}>
						<Text style={{ color: 'blue' }}> Register</Text>
					</TouchableOpacity>
				</View>
				<View>
					<Button
						onPressed={handleSubmit}
						textStyle={{ color: 'black' }}
						style={{
							padding: 12,
							margin: 10,
							borderRadius: 20,
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: 'white',
						}}
						text={'Next'}
					/>
				</View>
			</View>
		</View>
	);
};

// const mapStateToProps = (state:any) => ({
//     auth: state.auth
// })

const styles = StyleSheet.create({
	box: {
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	card: {
		width: '95%',
		padding: 10,
		// backgroundColor:'gold',
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'transparent',
	},
});

const mapDispatchToProps = (dispatch: any) => ({
	setUser: (user: any) => dispatch(setUser(user)),
	setUserCredentials: (credentials: any[]) =>
		dispatch(setCredentials(credentials)),
	setUserCards: (cards: any[]) => dispatch(setUserCards(cards)),
	setSharedCards: (cards: any[]) => dispatch(setSharedCards(cards)),
});

export default connect(null, mapDispatchToProps)(LoginScreen);
