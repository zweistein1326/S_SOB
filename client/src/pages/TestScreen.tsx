import React, { useEffect, useState } from 'react';
import {Box, Button, Input, Typography} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import  { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase';
import { updateUser } from '../functions/axios';
import { setUser } from '../redux/actions/user';
import Header from '../components/Header';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import BG from '../assets/bg.jpeg';
// import { connector } from '../functions/walletConnector';

const TestScreen = (props:any) => {

    const navigate = useNavigate();
    const user = useSelector((state:any)=>state.auth.user);
    const[imageUrl, setImageUrl]= useState<string|null>(null);
    let imagesRef:any = null;
    const dispatch = useDispatch();

    useEffect(()=>{
        imagesRef = ref(storage, `images/${user.id}`);
        getDownloadURL(imagesRef).then((url)=>{setImageUrl(url)})
    })

    return(
        <Box component="div" style={{backgroundColor:'#111111', color:'white', padding:'0px 20px', minHeight:'100vh', display:'flex', flexDirection:'column'}}>
            <Header />
            <Box component="div"  style={{ height:'100%', width:'100%', marginTop:'100px', borderRadius:'30px', display:'flex', flexDirection:'column', alignItems:'center', }}>
                {user.profileImageUrl?
                    <Box component="div"  style={{ height:'100%', width:'30%', borderRadius:'30px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <img src={user.profileImageUrl} style={{objectFit:'cover', width:'200px', height:'200px', borderRadius:'50%'}} className = "cardImage"/>
                    </Box>
                :<Box component="div"  style={{ height:'200px', width:'200px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'pink'}}>
                    </Box>}
                <Typography style={{color:'#FFFFFF', fontSize:'20px'}}>@{user.username}</Typography>
                <Button onClick = {()=>{navigate('/addCredential')}} style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 0px', backgroundColor:'#02F9A7', color:'#000000', width:'60%', display:'flex', justifyContent:'center'}}>+ Add NFT</Button>
                <Button onClick = {async()=>{
                    window.localStorage.removeItem('walletconnect');
                    navigate('/');
                    dispatch(setUser({}));
                }} 
                    style={{padding:'20px 10px', borderRadius:'30px', margin:'20px 0px', backgroundColor:'#000000', color:'#02F9A7', width:'60%', display:'flex', justifyContent:'center'}}>Logout</Button>
            </Box>
        </Box>
    )
}

export default TestScreen;