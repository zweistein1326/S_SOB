import React, { useState, useEffect } from 'react';
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
  CircularProgress,
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
import Web3Modal from 'web3modal';
import {nftAddress, NFTMarketAddress} from '../../config';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../artifacts/contracts/Market.sol/NFTMarket.json'
import {create as ipfsHttpClient } from 'ipfs-http-client'
import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Authereum from "authereum";

declare var window: any;

const Register = (props:any) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [account, setAccount] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    setLoading(false);
  })

  const connectWalletHandler = async (event:any) => {
    try{
        event.preventDefault();
        let web3Modal:any;
        let connection:any;
        let provider:any;
        // const signer = provider.getSigner();
        let web3:any;
        let providerOptions:any;
        providerOptions = {
            metamask: {
              id: "injected",
              name: "Metamask", 
              type: "injected",
              check: "isMetaMask",
            },
          walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: "23pWFcRt7vce0drcQcwyGhIhpyI", // Required
            network: "IPFS",
            qrcodeModalOptions: {
              mobileLinks: [
                "rainbow",
                "metamask",
                "argent",
                "trust",
                "imtoken",
                "pillar"
                ]
              }
            } 
          },
          authereum: {
            package: Authereum // required
          },
        };

        web3Modal = new Web3Modal({
          providerOptions
        });
        provider = await web3Modal.connect();
        provider.on('error', (e:any)=> console.error("WS Error", e));
        provider.on('end', (e:any) => console.error("WS End", e));

        provider.on("disconnect", (error: { code: number; message: string }) => {
        console.log(error);
        });
        provider.on("connect", (info: { chainId: number }) => {
        console.log(info);
        });
        web3 = new Web3(provider);
        setLoading(false);
        await web3.eth.getAccounts().then(async(result:any)=>{
          try{
            const user:any = await dispatch(getUserById(result[0]));
            console.log(user);
            if(user.user){
                setAccount(user.user.id);
                dispatch(setUser(user.user));
                setLoading(true);
                navigate('/feed')
            }
            else{
                setWalletConnected(true);
                setAccount(result[0]);
            }
          }catch(e:any){
            console.log(e);
          }
    });
    }
    catch(error:any){
      console.log(error);
    }
  }

  const accountChangeHandler = async(address:any,username:string) => {
    if(username!==''){
      // getUserBalance(newAccount);
      const user = await props.register({address,username});
      setLoading(true);
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
            setLoading(true)
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
        <Box component="form" noValidate sx={{ mt: 1, height:'100%', width:'100%', display:'flex', alignItems:'center', flexDirection:'column', justifyContent:'center' }}>
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
            InputLabelProps={{
              style:{
                color:'white'
              }
            }}
            sx={{ mt: 3, mb: 2, backgroundColor:'#333333', border:'1px solid #02F9A7',color:'white', input:{color:'white'}}}
          />:null}
          {!loading?(walletConnected?
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor:'#333333', border:'1px solid #02F9A7', color:'#02F9A7' }}
              // disabled={loading}
              onClick ={login}
            >
              Continue
            </Button>:<Box component="div" style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor:'#333333', color:'#02F9A7', borderRadius:'30px', position:'relative', padding:'20px', width:'60%' }}
              // disabled={loading}
              onClick ={connectWalletHandler}
            >
              Connect Wallet
              {/* <img src={metamask_logo} style={{height:'40px', width:'40px', padding:'5px 20px', position:'absolute', left:0}}/> */}
            </Button>
          </Box>)
          :<CircularProgress/>}
        </Box>
      </Box>
    </Box>
  );
};

const mapDispatchToProps = (dispatch:any) => ({
  register: (address:string)=> dispatch(register(address))
})

export default connect(null,mapDispatchToProps)(Register);
