import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Box,
  Checkbox,
  Container,
  TextField,
  FormControlLabel,
  Link,
  Grid,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { getAllCredentialData, getNFT, register } from '../functions/axios';
import { Image } from '@mui/icons-material';
import { connect } from 'react-redux';
import { setAccount, setUser } from '../actions/auth';
import { setCredentials } from '../actions/credentials';
import BG from '../assets/bg.jpeg';

declare var window: any;

const Register = (props:any) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [defaultAccount, setDefaultAccount] = useState<any>(null);
  const [userBalance, setUserBalance] = useState<any>(null);
  const [connButtonText, setConnButtonText] = useState('Connect');
  

  const connectWalletHandler = (event:any) => {
    event.preventDefault()
    if(window.ethereum){
      window.ethereum.request({method:'eth_requestAccounts'}).then(async (result:any[]) => {
        await accountChangeHandler(result[0]);
      })
    }
    else{
      setErrorMessage('Install Metamask');
    }
  }

  const accountChangeHandler = async(newAccount:any) => {
    console.log(newAccount);
    setDefaultAccount(newAccount);
    // getUserBalance(newAccount);
    const user = await register(newAccount);
    props.setUser(user);
    console.log(user);
    if(user.credentials){
      const credentials = await getAllCredentialData(user.credentials,newAccount);
      console.log(credentials)
      props.setCredentials(credentials)
    }
    navigate(`/${newAccount}`)
  }

  const getUserBalance = (address:any) =>{
    window.ethereum.request({method:'eth_getBalance', params:[address,'latest']}).then((balance:any)=>{
      console.log(balance);
      setUserBalance(ethers.utils.formatEther(balance));
    })
  }

  return (
    <Box component="main" sx={{backgroundImage:`url(${BG})`, backgroundSize:'cover', width:'100vw', minHeight:'100vh'}}>   
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height:'100vh'
        }}
      >
        {message && (
          <Typography variant="body1" color="red" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
        <Box component="form" onSubmit={connectWalletHandler} noValidate sx={{ mt: 1, height:'100%',display:'flex', alignItems:'center', justifyContent:'center', }}>
          {/* <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="current-password"
          /> */}
          {/* <Typography>Address: {defaultAccount}</Typography>
          <Typography>Balance: {userBalance}</Typography> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor:'#333333', border:'1px solid #02F9A7', color:'#02F9A7' }}
            // disabled={loading}
          >
            {connButtonText}
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {'Already have an account? Login'}
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
    </Box>
  );
};

const mapDispatchToProps = (dispatch:any) => ({
  setAccount: (account:any) => dispatch(setAccount(account)),
  setUser: (user:any) => dispatch(setUser(user)),
  setCredentials: (credentials:any[]) => dispatch(setCredentials(credentials))
})

export default connect(null,mapDispatchToProps)(Register);
