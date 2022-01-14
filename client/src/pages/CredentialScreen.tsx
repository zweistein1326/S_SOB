import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const NFTScreen = (props:any) => {

    const [credential,setCredential]= useState<any>(null);
    const [imageUrl,setImageUrl]= useState<any>(null);
    const [loading,setLoading]= useState<any>(false);
    const {credentialId} = useParams();
    const credentials = useSelector((state:any)=>state.credentials)

    useEffect(()=>{
        setLoading(true);
        console.log(credentialId);
        const cred = credentials.get(credentialId);
        console.log(cred);
        setCredential(cred);
        if(cred.image.split('://')[0]=="ipfs"){
            setImageUrl(`https://gateway.ipfs.io/ipfs/${cred.image.split('://')[1]}`);
        }
        else{
            setImageUrl(cred.image);
        }
        setLoading(false);
    },[credentialId]);

    return(
        <Box style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            {!loading && credential?
            <Box style={{backgroundColor:'rgba(0,0,0,0.6)', height:'20%', width:'100%', position:'absolute',borderRadius:'30px', bottom:0, display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                {/* {credential.name?<Typography color="white">{credential.name}</Typography>:null}
                <Box style={{ height:'100%', width:'30%', borderRadius:'30px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <img src="https://i1.wp.com/slotshurra.com/wp-content/uploads/2021/08/Leonardo-Da-Vinci-Slot-Game-Symbol-03-1.jpg?resize=564%2C500&ssl=1" style={{objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>
                </Box> */}
            </Box>:null}
            {/* <Typography>NFT: opensea.io//{props.credential.contract_address}/{props.credential.token_id}</Typography> */}
            {credential ? <img style={{height:'600px', width:'600px', borderRadius:'30px'}} src={imageUrl} alt="token"/> : null}
        </Box>
    );
}

export default NFTScreen;