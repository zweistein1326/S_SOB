/** @format */

import { Props, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import CredentialTile from '../components/Credentials/CredentialTile';
import UserCard from '../components/Card/UserCard';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from '../models/Card';
import { style } from '@mui/system';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import selectSharedCards from '../redux/selectors/cards';

const HomeScreen = (props: any) => {
	const [card, setCard] = useState({
		id: '',
		cardInfo: {
			cardTitle: '',
			name: '',
			email: '',
			website: '',
			social1: '',
			social2: '',
			social3: '',
		},
		backgroundColor: '',
		foregroundColor: '',
	});

	let sharedCards: Card[] = [];
	props.sharedCards.forEach((card: Card) => sharedCards.push(card));

	let userCards: Card[] = [];
	props.userCards.forEach((card: Card) => userCards.push(card));

	return (
		<ScrollView style={styles.container}>
			<View style={styles.row}>
				<View style={{flexDirection:'row', alignItems:'center'}}>
					<Text style={styles.heading}>My Avatars</Text>
					<TouchableOpacity onPress={()=>{
						props.navigation.navigate('HomeTab',{screen:'CustomizeCardScreen',params:{cardId:null}})}}>
						<Text style={{...styles.heading, color:'rgb(255,100,20)'}}>+</Text>
					</TouchableOpacity>
				</View>
				<Button
						text=''
						icon = {<Ionicons name='qr-code' size={20} color={'black'}/>}
						onPressed={() => {
							props.navigation.navigate('CameraScreen');
						}}
						textStyle={{ color: 'white', fontSize:40 }}
						style={{ padding: 20 }}
					/>
				</View>
			<View
				style={styles.innerContainer}>
				{userCards.map((card: Card, index) => {
					return (
						<UserCard
							key={index}
							sharedCard={false}
							customize={true}
							card={card}
							navigation={props.navigation}
							user={props.user}
						/>
					);
				})}
				{/* {1==1? <></>:<UserCard key={null} customize={true} sharedCard={false} card={card} navigation={props.navigation} user={props.user}/>} */}
				{/* <FlatList data={props.cards} keyExtractor={(item)=>item? item.id : null} renderItem={({card}:any) => card ? <UserCard navigation={props.navigation} user={props.user}/> : null } /> */}
				{/* <View style={{ alignItems:'center' }}>
                <Text style={{width:'100%'}}>Saved Credentials</Text>
                {Object.values(props.credentials).map((credential:any,index)=><CredentialTile key={index} navigation={props.navigation} credential={credential}/>)}
            </View> */}
			</View>
			<Text>My profile</Text>
			<Text>Connected Apps</Text>
			<Text>My NFT Collection</Text>
			<View style={{width:'100%'}}>
				<View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>
					<View style={{height:100}}>
						<Text>NFT1</Text>
					</View>
					<View style={{height:100}}>
						<Text>NFT1</Text>
					</View>
					<View style={{height:100}}>
						<Text>NFT1</Text>
					</View>
				</View>
				<View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>
					<View style={{height:100}}>
						<Text>NFT1</Text>
					</View>
					<View style={{height:100}}>
						<Text>NFT1</Text>
					</View>
					<View style={{height:100}}>
						<Text>NFT1</Text>
					</View>
				</View>
				<View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>
					<View style={{height:100}}>
						<Text>NFT1</Text>
					</View>
					<View style={{height:100}}>
						<Text>NFT1</Text>
					</View>
					<View style={{height:100}}>
						<Text>NFT1</Text>
					</View>
				</View>
			</View>
			{/* <Text style={styles.heading}>Recently saved</Text>
			<View
				style={styles.sharedCardsContainer}>
				{sharedCards.map((card: Card, index) => {
					return (
						<UserCard
							key={index}
							sharedCard={true}
							customize={true}
							card={card}
							navigation={props.navigation}
							user={props.user}
						/>
					);
				})}
			</View> */}
		</ScrollView>
	);
};

const mapStateToProps = (state: any) => ({
	user: state.auth.user,
	credentials: state.credentials,
	userCards: state.cards.userCards,
	sharedCards: selectSharedCards(state.cards.sharedCards , state.filters),
	filters: state.filters
});

const styles = StyleSheet.create({
	heading: {
		padding: 8,
		fontSize: 22,
		fontWeight: 'bold',
	},
	container:{
		paddingTop:60
	},
	innerContainer:{ 
		display: 'flex', 
		alignItems: 'center',
		paddingVertical: 10 
	},
	sharedCardsContainer:{
		display: 'flex', 
		alignItems: 'center',
		paddingVertical: 10 
	},
	row:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between'
	}
});

export default connect(mapStateToProps, null)(HomeScreen);
