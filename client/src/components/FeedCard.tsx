import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FeedCard = (props:any) => {

    const [imageUrl,setImageUrl] = useState<any>('');
    const [credential,setCredential]= useState<any>(null);
    const [credentialOwner, setOwner] = useState<any>(null);
    const allUsers = useSelector((state:any)=>state.auth.allUsers);
    const navigate = useNavigate();

     useEffect(()=>{
        const credential = props.credential;
        if(credential){
            console.log(credential);
            setCredential(credential);
            const owner = allUsers.find((user:any)=>user.id.toLowerCase() === credential.owner.toLowerCase())
            setOwner(owner);
        if(credential.image.split('://')[0]=="ipfs"){
            setImageUrl(`https://gateway.ipfs.io/ipfs/${credential.image.split('://')[1]}`);
        }
        else{
            setImageUrl(credential.image);
        }
        }
    },[props.credentialId])

    return(
        <Grid item onClick={()=>{navigate(`/credential/${credential.id}`)}} key={props.key} style={{margin:'2rem 0', height:'60vh', minWidth:'30vw', border:'2px solid white',position:'relative', borderRadius:'0px', backgroundColor:'#EEEEEE', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            {props.credential ? <img style={{height:'100%', width:'100%', borderRadius:'0px'}} src={imageUrl} alt="token"/> : null}
            <Box style={{backgroundColor:'rgba(0,0,0,0.6)', height:'20%', width:'100%', position:'absolute', bottom:0,  display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
            {/* <Typography color="black">{props.credential.name}</Typography> */}
            {/* <Typography>NFT: opensea.io//{props.credential.contract_address}/{props.credential.token_id}</Typography> */}
                <Typography color="white">{props.credential.name} {props.credential.token_id}</Typography>
                {/* <Box style={{ height:'100%', width:'20%', borderRadius:'30px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <img src="https://i1.wp.com/slotshurra.com/wp-content/uploads/2021/08/Leonardo-Da-Vinci-Slot-Game-Symbol-03-1.jpg?resize=564%2C500&ssl=1" style={{objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>
                </Box> */}
            </Box>
            <Box onClick ={()=>{navigate(`/${credentialOwner.id}`)}} style={{position:'absolute', bottom:0, right:0, height:'20%', width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <img src={credentialOwner?credentialOwner.profileImageUrl:''} style={{backgroundColor:'pink',objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>
            </Box>
        </Grid>
    )
}

export default FeedCard;