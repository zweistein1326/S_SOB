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

  useEffect(()=>{getUserInfo()},[])

  return (
    <Box>
    <Box >
    User information
      <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
    </Box>
    <>
    {/* <Typography variant="h2">Home Page</Typography> */}
      <Typography>
        {loggedIn && props.auth.user ? '' : 'Not logged-in'} 
      </Typography>
      {loggedIn ?
      <>
        <Typography>
          Metamask account address: {account}
        </Typography>
        <Typography>
          DID: {activeUser.id} (@{activeUser.username})
        </Typography>
        <Typography>
          Name: {activeUser.firstname} {activeUser.lastname}
        </Typography>
        <Typography>
          Email: {activeUser.email}
        </Typography>
        
        {activeUser.id == props.auth.user.id?
        <>
        <Typography>
          Your saved credentials
        </Typography>
        <Typography>
          Update user information
        </Typography>
        </>:
        null}
        {activeUser.credentials ?
        Object.values(activeUser.credentials).map((credential:any,index:number)=><CredentialTile key={credential.id} credential={credential} title={Object.keys(activeUser.credentials)[index]} />)
          // <Link to={`${activeUser.degreeCertificate.digest}`}><Typography>Degree Certificate</Typography></Link>
        :''}
      </>: null}
    </>
    </Box>
  );
};

const mapStateToProps = (state:any) => ({
  auth:state.auth
})

export default connect(mapStateToProps)(Home);
