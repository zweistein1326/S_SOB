import { Box,  Grid, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import Card from '../components/Card';
import CredentialTile from '../components/CredentialTile';
import Header from '../components/Header';
import NFTCard from '../components/NFTCard';
import Sidebar from '../components/Sidebar';
import { getNFT } from '../functions/axios';
import { User } from '../models/User';
import '../styles/Home.css'
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
    <Box style={{backgroundColor:'#EEEEEE', color:'white', padding:'20px', minHeight:'100vh', display:'flex', flexDirection:'row'}}>
      {/* <Header/> */}
     {/* <Box component="form" onSubmit={addNFT} noValidate sx={{ mt: 1 }}> */}
     {/* <Sidebar user={props.user}/> */}
     <Box style={{flex:1, padding:'20px', alignItems:'center', display:'flex', flexDirection:'column'}}>

          <Card user={props.user}/>
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
          <Box style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-end',width:'100%'}}>
            <Box style={{flex:1}}>
              <Typography style={{backgroundColor:'#02F9A7', color:'black', margin:20, padding:'10px 20px', width:'40%', borderRadius:'20px'}}>Username, Address</Typography>
            </Box>
            <Button onClick = {()=>{console.log('follow')}} style={{backgroundColor:'#02F9A7', margin:20, padding:10, color:'black', borderRadius:'20px', width:'100px'}}>Follow</Button>
            <Button onClick = {()=>{navigate('/addCredential')}} style={{backgroundColor:'#02F9A7', margin:20, padding:10, color:'black', borderRadius:'20px',  width:'100px'}}>+ Add NFT</Button>
          </Box>
          {props.credentials.length > 0 ? <Grid container columns={3} style={{justifyContent:'center'}}>
            {props.credentials.map((credential:any,index:number)=>(
              <NFTCard credential={credential} key={index}/>)
            )}
          </Grid> : null }
        </Box>
        {/* </Box> */}
    </Box>
  );
};

const mapStateToProps = (state:any) => ({
  credentials: state.credentials,
  user: state.auth.user
})

export default connect(mapStateToProps,null)(Home);
