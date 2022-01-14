import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
            <Box style={{margin:'40px', textAlign:'center'}}>
                {/* <Box style={{ height:'100%', width:'30%', borderRadius:'30px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <img src="https://i1.wp.com/slotshurra.com/wp-content/uploads/2021/08/Leonardo-Da-Vinci-Slot-Game-Symbol-03-1.jpg?resize=564%2C500&ssl=1" style={{objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>
                </Box> */}
                {credential.name ? <Typography color="black">{credential.name}</Typography> : null}
                <Typography>Attributes</Typography>
                <Typography>{credential.id}</Typography>
                {credential.attributes.map(({trait_type,value}:any)=>{return(
                    <Box style={{border:'1px solid #02F9A7', padding:'20px'}}>
                        <Typography>{trait_type}</Typography>
                        <Typography>{value}</Typography>
                    </Box>
                )})}
                <a href={credential.external_link}>{credential.external_link}</a>
            </Box>:null}
            {/* <Typography>NFT: opensea.io//{props.credential.contract_address}/{props.credential.token_id}</Typography> */}
            {credential ? <img style={{height:'600px', width:'600px', borderRadius:'30px'}} src={imageUrl} alt="token"/> : null}
        </Box>
    );
}

export default NFTScreen;