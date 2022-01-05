/** @format */

import { Ionicons } from '@expo/vector-icons';
import React, { Key } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';
import { connect } from 'react-redux';
import { baseUrl } from '../../constants/Constants';
import { Card } from '../../models/Card';
import IconFontisto from 'react-native-vector-icons/Fontisto';

const UserCard = (props: any) => {
	console.log(props.card);

	const {cardInfo} = props.card;

	return (
		<View
			style={styles.cardContainer}>
			{props.card.id !== '' ? (
				// <Text style={[styles.cardText,{color:'white'}]}>{cardInfo.title}</Text>
				<View style={styles.card}>
					<View>
						{1==1?<QRCode
							value={
								baseUrl +
								'/share?cardId=' +
								props.card.id +
								'&issuerId=' +
								props.user.id +
								'&receiverId='
							}
						/>:null}
						{1==1 ? (
							<Text
								style={{ ...styles.cardText, fontSize: 16, color: props.card.foregroundColor }}>
								@{cardInfo.name}
							</Text>
						) : null}
						{/* <Text style={[styles.cardText,{color:'white'}]}>Avatar</Text> */}
					</View>
					<View style={{ width: '60%' }}>
								<TouchableOpacity onPress={()=>{
									Linking.openURL(`mailto:${cardInfo.email}`)
								}} style={styles.social}>
									<IconFontisto name="email" size={18}/>
									<Text style={styles.socialText}> {cardInfo.email}</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={()=>{
									Linking.openURL(`https://www.instagram.com`)
								}} style={styles.social}>
									<IconFontisto name="instagram" size={18}/>
									<Text style={styles.socialText}> {cardInfo.social1}</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={()=>{
									Linking.openURL(`https://www.linkedin.com`)
								}} style={styles.social}>
									<IconFontisto name="linkedin" size={18}/>
									<Text style={styles.socialText}> {cardInfo.social2}</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={()=>{
									Linking.openURL(`https://www.facebook.com`)
								}} style={styles.social}>
									<IconFontisto name="facebook" size={18}/>
									<Text style={styles.socialText}> {cardInfo.social3}</Text>
								</TouchableOpacity>
					</View>
				</View>
			) : null}
			{props.customize && !props.sharedCard ? (
				<View style={{ position: 'absolute', bottom: 20, right: 20 }}>
					{props.card.id !== '' ? (
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								console.log(props.card.id);
								props.navigation.navigate('HomeTab',{ screen:'CustomizeCardScreen', params:{
									cardId: props.card.id,
								}});
							}}>
							<Text style={{ color: 'white' }}>Customize</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={{}}
							onPress={() => {
								props.navigation.navigate('CustomizeCardScreen', { cardId: null });
							}}>
							<Text style={{ color: 'white', fontSize: 40 }}>+</Text>
						</TouchableOpacity>
					)}
				</View>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: 'rgb(255,120,10)',
		width: '95%',
		height: 250,
		borderRadius: 20,
		padding: 20,
		fontSize: 16,
		color: 'white',
	},
	card: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		width: '98%',
		height: '100%',
	},
	cardText: {
		fontSize: 16,
	},
	button: {
		borderRadius: 20,
		borderColor: 'white',
		borderWidth: 1,
		padding: 8,
	},
	social:{
		marginVertical:10,
		padding:5,
		flexDirection:'row',
		alignContent:'center',
	},
	socialText:{
		color:'white'
	}
});

const mapStateToProps = (state: any) => ({
	userCards: state.cards.userCards,
	sharedCards: state.cards.sharedCards,
});

export default connect(mapStateToProps, null)(UserCard);
