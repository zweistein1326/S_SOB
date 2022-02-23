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
import SelectProfilePictureModal from '../components/SelectProfilePictureModal';
// import { connector } from '../functions/walletConnector';

const SettingsScreen = (props:any) => {

    const navigate = useNavigate();
    const user = useSelector((state:any)=>state.auth.user);
    const dispatch = useDispatch();
    const [isModalActive, setModalStatus] = useState(false);

    useEffect(()=>{
        console.log(user);
    },[])

    return(
        user ? <Box component="div" style={{backgroundColor:'#FFFFFF', color:'black', padding:'0px 20px', minHeight:'100vh', display:'flex', flexDirection:'column'}}>
            <Header />
            <SelectProfilePictureModal user={user} closeModal={()=>{setModalStatus(false)}} isModalActive={isModalActive}/>
            <Box component="div"  style={{ height:'100%', width:'100%', marginTop:'100px', borderRadius:'30px', display:'flex', flexDirection:'column', alignItems:'center', }}>
                {user.profileImageUrl?
                    <Box component="div"  style={{ height:'100%', width:'30%', borderRadius:'30px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <img src={user.profileImageUrl} style={{objectFit:'cover', width:'200px', height:'200px', borderRadius:'50%'}} className = "cardImage"/>
                    </Box>
                :<Box component="div"  style={{ height:'200px', width:'200px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'pink'}}>
                    </Box>}
                <Typography style={{color:'#000000', fontSize:'20px'}}>@{user.username}</Typography>
                <Button onClick = {()=>{setModalStatus(true)}} style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 0px', backgroundColor:'#02F9A7', color:'#000000', width:'60%', display:'flex', justifyContent:'center'}}>Change Profile Picture</Button>
                <Button onClick = {async()=>{
                    window.localStorage.removeItem('userId');
                    navigate('/');
                    dispatch(setUser(null));
                }} 
                    style={{padding:'20px 10px', borderRadius:'30px', margin:'20px 0px', backgroundColor:'#000000', color:'#02F9A7', width:'60%', display:'flex', justifyContent:'center'}}>Logout</Button>
            </Box>
        </Box> : null
    )
}

export default SettingsScreen;