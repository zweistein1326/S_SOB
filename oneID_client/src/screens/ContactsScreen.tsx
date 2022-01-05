import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import UserCard from '../components/Card/UserCard';
import SearchBar from '../components/SearchBar';
import { Card } from '../models/Card';
import { searchByText } from '../redux/actions/Filters';
import selectCards from '../redux/selectors/cards';

const ContactsScreen = (props) => {

    const [clicked, setClicked] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');

    const searchByName = (name:string) => {
        setSearchPhrase(name);
        props.searchByText(searchPhrase);
    }

    return(
        <View style={styles.container}>
        	<SearchBar clicked={clicked} searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} setClicked={setClicked} searchByName={searchByName}/>
            {props.sharedCards.map((card: Card, index) => {
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
        </View>
    )
}

const mapStateToProps = (state:any) => ({
    sharedCards: selectCards(state.cards.sharedCards , state.filters),
	filters: state.filters,
    user: state.auth.user
})

const mapDispatchToProps = (dispatch:any) => ({
    searchByText: (text:string) => dispatch(searchByText(text))
})

const styles = StyleSheet.create({
    container:{
        paddingTop:40,
        flexDirection:'column',
        alignItems:'center',
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(ContactsScreen);