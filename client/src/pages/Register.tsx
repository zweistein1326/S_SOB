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
import metamask_logo from '../assets/logos/metamask-fox.svg';
import wallet_connect_logo from '../assets/logos/walletconnect-circle-white.svg';

declare var window: any;

const Register = (props:any) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [account, setAccount] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const dispatch = useDispatch();


  const connectWalletHandler = (event:any) => {
    event.preventDefault()
    setLoading(true);
    if(window.ethereum){
      window.ethereum.request({method:'eth_requestAccounts'}).then(async (result:any[]) => {
        setAccount(result[0]);
        const user:any = await dispatch(getUserById(result[0]));
        if(!!user){
          window.localStorage.setItem('userId',result[0]);
          setLoading(false);
          dispatch(setUser(user.user));
          navigate(`/feed`)
        }else{
          if(walletConnected){
            await accountChangeHandler(account,username);
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
          setAccount(accounts[0]);
          const user:any = await dispatch(getUserById(accounts[0]));
          if(!!user){
            window.localStorage.setItem('userId',accounts[0]);
            setLoading(false);
            dispatch(setUser(user.user));
            navigate(`/feed`)
          }else{
            if(walletConnected){
              await accountChangeHandler(accounts[0],username);
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
  }
}

  connector.on("connect", async (error, payload) => {
      if (error) {
          throw error
      }
      const { accounts, chainId } = payload.params[0];
      (async()=>{
          setAccount(accounts[0])
          const user:any = await dispatch(getUserById(accounts[0]));
          if(!!user){
            setLoading(false);
            dispatch(setUser(user.user));
            navigate(`/feed`)
          }else{
            if(walletConnected){
              await accountChangeHandler(account,username);
          }
          else{
            setWalletConnected(true);
            setLoading(false);
          }
        }
        })();
    });

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

  const login = async(event:any) => {
    event.preventDefault();
    if(username!==''){
      const user:any = await dispatch(register({address:account, username}));
      if(!!user){
            window.localStorage.setItem('userId',account);
            setLoading(false)
            navigate('/feed');
      }
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
            sx={{ mt: 3, mb: 2, backgroundColor:'#333333', border:'1px solid #02F9A7',color:'white', input:{color:'white'} }}
          />:null}
          {walletConnected?
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor:'#333333', border:'1px solid #02F9A7', color:'#02F9A7' }}
              // disabled={loading}
              onClick ={login}
            >
              Continue
            </Button>:<Box component="div">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor:'#333333', color:'#02F9A7', borderRadius:'30px', position:'relative', padding:'20px' }}
              // disabled={loading}
              onClick ={connectWalletHandler}
            >
              Sign in with Metamask
              <img src={metamask_logo} style={{height:'40px', width:'40px', padding:'5px 20px', position:'absolute', left:0}}/>
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor:'#333333', color:'#02F9A7', borderRadius:'30px', position:'relative', padding:'20px' }}
              // disabled={loading}
              onClick={walletConnect}
            >
              <Typography>
                Sign in with WalletConnect
              </Typography>
              <img src={wallet_connect_logo} style={{height:'40px', width:'40px', padding:'5px 20px', position:'absolute', left:0}}/>
            </Button>
          </Box>}
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
