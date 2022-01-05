import React from 'react';
import { Button, Keyboard, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import {Feather, Entypo} from '@expo/vector-icons';
import { style } from '@mui/system';
import { TextInput } from 'react-native-gesture-handler';

const SearchBar = (props:any) => {
    return(
        <View>
            <View style={!props.clicked?styles.searchBar__unclicked:styles.searchBar__clicked}>
                <Feather name="search"
                size={20}
                color="black"
                style={{marginLeft:1}}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Search'
                    value={props.searchPhrase}
                    onChangeText = {(val)=>{props.searchByName(val)}}
                    onFocus = {()=>{
                        props.setClicked(true)
                    }}
                />
                {props.clicked && (<Entypo name="cross" size={20} color="black" style={{padding:1}} onPress={()=>{
                    props.setSearchPhrase("");
                }}/>)}
            </View>
            {props.clicked && (
                <View>
                    <Button title='Cancel' onPress={()=>{
                        Keyboard.dismiss();
                        props.setClicked(false);
                    }}></Button>
                </View>
            )}
        </View>
    )
}

const mapStateToProps = (state:any) => ({
    userCards: state.cards.userCards,
	sharedCards: state.cards.sharedCards,
})

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",

  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
})

export default connect(mapStateToProps,null)(SearchBar);