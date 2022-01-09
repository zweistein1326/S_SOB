import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import Card from '../components/Card';
import CredentialTile from '../components/CredentialTile';
import Header from '../components/Header';
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

  const connectWalletHandler = async () => {
    try{
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      setAccount(accounts[0]);
    } catch(err){
      console.log(err);
    }
  }

  console.log(props.credentials);

  return (
    <Box>
      <Header/>
     {/* <Box component="form" onSubmit={addNFT} noValidate sx={{ mt: 1 }}> */}
          <Typography>Address: {props.account}</Typography>
          <Card/>
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
          <Typography>Your NFTs</Typography>
          {props.credentials.length >0 ? <Box >
            {props.credentials.map((credential:any,index:number)=>(
              <Box key={index}>
                <Typography>NFT: {credential.name}</Typography>
                {credential ? <img style={{height:'200px', width:'200px'}} src={credential.image} alt="token"/> : null}
              </Box>)
            )}
            
          </Box>:null}
        {/* </Box> */}
    </Box>
  );
};

const mapStateToProps = (state:any) => ({
  account:state.auth.account,
  credentials: state.credentials
})

export default connect(mapStateToProps)(Home);
