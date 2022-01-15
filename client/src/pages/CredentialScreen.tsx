import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const NFTScreen = (props:any) => {

    const [credential,setCredential]= useState<any>(null);
    const [imageUrl,setImageUrl]= useState<any>(null);
    const [loading,setLoading]= useState<any>(false);
    const {credentialId} = useParams();
    const credentials = useSelector((state:any)=>state.credentials)
    const navigate = useNavigate();

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
        <Box style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh'}}>
            {!loading && credential?
            <Box style={{margin:'40px', textAlign:'center'}}>
                {/* <Box style={{ height:'100%', width:'30%', borderRadius:'30px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <img src="https://i1.wp.com/slotshurra.com/wp-content/uploads/2021/08/Leonardo-Da-Vinci-Slot-Game-Symbol-03-1.jpg?resize=564%2C500&ssl=1" style={{objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>
                </Box> */}
                {credential.name ? <Typography style={{fontSize:'24px', fontWeight:'bold'}} color="black">Collection: {credential.name} #{credential.token_id}</Typography> : null}
                <a href={credential.external_link}>{credential.external_link}</a>
                {/* <Typography>Token ID: {credential.token_id}</Typography> */}
                <Typography onClick={()=>{navigate(`/${credential.owner}`)}}>Owner: {credential.owner}</Typography> 
                <Box style={{ backgroundColor:'rgba(2, 249, 167,0)', borderRadius:'20px', padding:'1rem'}}>
                    <Typography style={{fontSize:'24px', fontWeight:'bold', color:'black'}}>Attributes</Typography>
                    <Grid container columns={3} style={{width:'40vw', height:'60vh', justifyContent:'center', alignItems:'center', overflowY:'scroll'}}>
                    {credential.attributes.map(({trait_type,value}:any)=>{return(
                        <Grid item style={{border:'1px solid #02F9A7', backgroundColor:'#000000', padding:'0.4rem', minWidth:'14rem', margin:'0.4rem'}}>
                            <Typography style={{fontSize:'24px', fontWeight:'bold', color:'#FFFFFF'}}>{trait_type}</Typography>
                            <Typography style={{fontSize:'18px', fontWeight:'500', color:'#FFFFFF'}}>{value}</Typography>
                        </Grid>
                    )})}
                    </Grid>
                </Box>
            </Box>:null}
            {/* <Typography>NFT: opensea.io//{props.credential.contract_address}/{props.credential.token_id}</Typography> */}
            {credential ? <img style={{height:'600px', width:'600px', borderRadius:'30px'}} src={imageUrl} alt="token"/> : null}
        </Box>
    );
}

export default NFTScreen;