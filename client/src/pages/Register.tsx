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
import { getNFT, getUserById, register } from '../functions/axios';
import { Image } from '@mui/icons-material';
import { connect, useDispatch } from 'react-redux';
import { setAccount, setUser } from '../redux/actions/user';
import { setCredentials } from '../redux/actions/credentials';
import BG from '../assets/bg.jpeg';
import { ThreeDots } from 'react-loader-spinner';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { connector } from '../functions/walletConnector';

declare var window: any;

const Register = (props:any) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const dispatch = useDispatch();


  const connectWalletHandler = (event:any) => {
    event.preventDefault()
    setLoading(true);
   
    if(window.ethereum){
      window.ethereum.request({method:'eth_requestAccounts'}).then(async (result:any[]) => {
        const user:any = await dispatch(getUserById(result[0]));
        if(!!user){
          console.log(user.user);
          setLoading(false);
          dispatch(setUser(user.user));
          navigate(`/feed`)
        }else{
          if(walletConnected){
            await accountChangeHandler(result[0],username);
          }
          else{
            setWalletConnected(true);
            setLoading(false);
          }
        }
      })
    }
    else{
      setErrorMessage('Install Metamask');
    }
  }

  const walletConnect=async(event:any)=>{
    event.preventDefault();
    if(connector.connected){
      const {accounts,chainId}= connector;
      (async()=>{
          console.log(accounts[0]);
          const user:any = await dispatch(getUserById(accounts[0]));
          console.log(user);
          if(!!user){
            setLoading(false);
            dispatch(setUser(user.user));
            navigate(`/feed`)
          }else{
            if(walletConnected){
              console.log(event.target);
              await accountChangeHandler(accounts[0],event.target.elements.username.value);
          }
          else{
            setWalletConnected(true);
            setLoading(false);
          }
        }
        })();
    }
    else{
      await connector.createSession();
      connector.on("connect", async (error, payload) => {
      if (error) {
          throw error
      }
      const { accounts, chainId } = payload.params[0];
      (async()=>{
          console.log(accounts[0]);
          const user:any = await dispatch(getUserById(accounts[0]));
          if(!!user){
            setLoading(false);
            dispatch(setUser(user.user));
            navigate(`/feed`)
          }else{
            if(walletConnected){
              console.log(event.target);
              await accountChangeHandler(accounts[0],event.target.elements.username.value);
          }
          else{
            setWalletConnected(true);
            setLoading(false);
          }
        }
        })();
    });
  }
}

  connector.on("disconnect", (error:any, payload:any) => {
    window.localStorage.removeItem('walletconnect');
    navigate('/');
    dispatch(setUser({}));
    if (error) {
        throw error;
    }
  })

  const accountChangeHandler = async(address:any,username:string) => {
    if(username!==''){
      // getUserBalance(newAccount);
      const user = await props.register({address,username});
      setLoading(false);
      navigate(`/feed`)
    }else{
      setErrorMessage('Username cannot be empty');
    }
  }

  return (
    <Box component="main" sx={{backgroundImage:`url(${BG})`, backgroundSize:'cover', width:'100vw', minHeight:'100vh'}}>   
      <Box
      component="div"
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
        <Box component="form" noValidate sx={{ mt: 1, height:'100%',display:'flex', alignItems:'center', flexDirection:'column', justifyContent:'center' }}>
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
          {walletConnected?<TextField
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            type="text"
            id="username"
            autoComplete="username"
            onChange={(event:any)=>{setUsername(event.target.value)}}
            sx={{ mt: 3, mb: 2, backgroundColor:'#333333', border:'1px solid #02F9A7', color:'#02F9A7' }}
          />:null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor:'#333333', border:'1px solid #02F9A7', color:'#02F9A7' }}
            // disabled={loading}
            onClick ={connectWalletHandler}
          >
            Sign in with Metamask
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor:'#333333', border:'1px solid #02F9A7', color:'#02F9A7' }}
            // disabled={loading}
            onClick={walletConnect}
          >
            Connect Wallet
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
  register: (address:string)=> dispatch(register(address))
})

export default connect(null,mapDispatchToProps)(Register);
