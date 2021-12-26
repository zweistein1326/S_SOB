import { useMutation } from '@apollo/client';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import CredentialTile from '../components/CredentialTile';
import Header from '../components/Header';
import { GETUSERBYID } from '../graphql';
import { User } from '../models/User';
declare var window:any;

const Home = (props:any) => {
  const [loggedIn, setLoggedIn] = useState(
    props.auth.user !==null ,
  );
  const [activeUser,setActiveUser] = useState<any>({});
  const [fetchInfo,{loading,error}] = useMutation(GETUSERBYID);
  const [account, setAccount] = useState<any>(null);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };
  
  const {id} = useParams();

  const {ethereum} = window;

  const connectWalletHandler = async () => {
    try{
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      setAccount(accounts[0]);
    } catch(err){
      console.log(err);
    }
  }

  const getUserInfo = async () =>{
    console.log(id);
    await connectWalletHandler();
    fetchInfo({
      variables: {
        id
    },
  })
    .then((res)=>{
      let user:User = res.data.getUserById.user;
      setActiveUser(user);
    })
  }

  useEffect(()=>{ 
    getUserInfo()
  },activeUser);


  return (
    <Box>
    <Box >
    User information
      <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
    </Box>
    <Box sx={{display:'flex'}}>
    <Box sx={{width:'20vw', height:'100vh', mt:2, backgroundColor:'beige', p:3}}>
      <Typography>
          My photo (optional)
        </Typography>
        {/* <Typography>
          Metamask account address: {account}
        </Typography> */}
        <Typography sx={{display:'inline'}}>
          DID: <span style={{fontWeight:'bold'}}>{activeUser.id} (@{activeUser.username})</span>
        </Typography>
        <Typography>
          Name: {activeUser.firstname} {activeUser.lastname}
        </Typography>
        <Typography>
          Email: {activeUser.email}
        </Typography>
        <Button sx={{ mt:3, mb:2 }} variant="contained"><Link to={`/addCredential`}><Typography sx={{color:'white'}}>Add new Credential</Typography></Link></Button>
    </Box>
      {/* <Typography>
        {loggedIn && props.auth.user ? '' : 'Not logged-in'} 
      </Typography> */}
      <Box sx={{width:'60vw', height:'100vh', m:3}}>
      {loggedIn ?
      <>
        {activeUser.id == props.auth.user.id?
        <Box display='flex'>
          <Box sx={{width:'50%'}}>
          <Typography variant="h4" >
            Pending Requests
          </Typography>
          {activeUser.credentials ?
          Object.values(activeUser.credentials).map((credential:any,index:number)=>credential.pending?<CredentialTile key={credential.id} credential={credential} title={Object.keys(activeUser.credentials)[index]} />:null)
          :''}
          </Box>
          <Box sx={{width:'50%'}}>
          <Typography variant="h4">
            Accepted credentials
          </Typography>
          {activeUser.credentials ?
          Object.values(activeUser.credentials).map((credential:any,index:number)=>!credential.pending?<CredentialTile key={credential.id} credential={credential} title={Object.keys(activeUser.credentials)[index]} />:null)
          :''}
          </Box>
        </Box>:
        null}
      </>: null}
      </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state:any) => ({
  auth:state.auth
})

export default connect(mapStateToProps)(Home);
