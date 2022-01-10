import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import Card from '../components/Card';
import CredentialTile from '../components/CredentialTile';
import Header from '../components/Header';
import NFTCard from '../components/NFTCard';
import { getNFT } from '../functions/axios';
import { User } from '../models/User';
declare var window:any;

const Home = (props:any) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(
    props.account !==null ,
  );
  const [activeUser,setActiveUser] = useState<any>({});
  const [activeCredentials,setActiveCredentials] = useState<any>([]);
  const [account, setAccount] = useState<any>(null);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };
  
  const {id} = useParams();

  const {ethereum} = window;

  console.log(props.user);

  return (
    <Box style={{backgroundColor:'#332E2E', color:'white', padding:'20px', minHeight:'100vh'}}>
      {/* <Header/> */}
     {/* <Box component="form" onSubmit={addNFT} noValidate sx={{ mt: 1 }}> */}
          <Card account={props.user.id}/>
          {/* <Typography>Balance: {userBalance}</Typography> */}
          {/* <Button
            onClick={()=>{navigate('/addCredential')}}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // disabled={loading}
          >
            Add new NFT
          </Button> */}
          <Box style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
            <Box style={{flex:1}}>
              <Typography style={{backgroundColor:'#EEEEEE', color:'black', margin:20, padding:10}}>Username, Address</Typography>
            </Box>
            <Button onClick = {()=>{}} style={{backgroundColor:'#02F9A7', margin:20, padding:10}}>Follow</Button>
            <Button onClick = {()=>{}} style={{backgroundColor:'#02F9A7', margin:20, padding:10}}>Add NFT</Button>
          </Box>
          {props.credentials.length > 0 ? <Box style={{display:'flex', flexDirection:'row'}}>
            {props.credentials.map((credential:any,index:number)=>(
              <NFTCard credential={credential} key={index}/>)
            )}
          </Box> : null }
        {/* </Box> */}
    </Box>
  );
};

const mapStateToProps = (state:any) => ({
  credentials: state.credentials,
  user: state.auth.user
})

export default connect(mapStateToProps,null)(Home);
