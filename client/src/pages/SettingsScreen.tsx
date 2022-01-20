import React, { useEffect, useState } from 'react';
import {Box, Button, Input, Typography} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import  { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase';
import { updateUser } from '../functions/axios';
import { setUser } from '../redux/actions/user';
import Header from '../components/Header';

const SettingsScreen = (props:any) => {

    const navigate = useNavigate();
    const user = useSelector((state:any)=>state.auth.user);
    const[imageUrl, setImageUrl]= useState<string|null>(null);
    let imagesRef:any = null;
    const dispatch = useDispatch();

    useEffect(()=>{
        imagesRef = ref(storage, `images/${user.id}`);
        getDownloadURL(imagesRef).then((url)=>{setImageUrl(url)})
    })
    const onFileChange = (event:any) => {
        imagesRef = ref(storage, `images/${user.id}`);
        const file = event.target.files[0];
        console.log(file);
        uploadBytes(imagesRef,file).then((snapshot)=>{ 
            getDownloadURL(imagesRef).then((url)=>{
                setImageUrl(url);
                dispatch(updateUser({id:user.id, profileImageUrl: url}))})
    })
    }

    return(
        <Box component="div" style={{backgroundColor:'#332E2E', color:'white', padding:'0px 20px', minHeight:'100vh', display:'flex', flexDirection:'column'}}>
            <Header />
            <Box component="div"  style={{ height:'100%', width:'100%', marginTop:'100px', borderRadius:'30px', display:'flex', flexDirection:'column', alignItems:'center', }}>
                {imageUrl?
                    <Box component="div"  style={{ height:'100%', width:'30%', borderRadius:'30px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <img src={imageUrl} style={{objectFit:'cover', width:'200px', height:'200px', borderRadius:'50%'}} className = "cardImage"/>
                    </Box>
                :null}
                <Input type="file" name="profile_image" onChange={onFileChange} placeholder='Profile Image'/>
                {/* <Typography style={{color:'#000000', fontSize:'20px'}}>@{user.username}</Typography> */}
                <Button onClick = {()=>{navigate('/addCredential')}} style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 0px', backgroundColor:'#02F9A7', color:'#000000', width:'60%', display:'flex', justifyContent:'center'}}>+ Add NFT</Button>
                <Button onClick = {()=>{
                    navigate('/')
                    dispatch(setUser(null))
                }} 
                    style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 0px', backgroundColor:'#000000', color:'#02F9A7', width:'60%', display:'flex', justifyContent:'center'}}>Logout</Button>
            </Box>
        </Box>
    )
}

export default SettingsScreen;