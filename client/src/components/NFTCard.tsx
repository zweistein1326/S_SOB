import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './NFTCard.css';

interface Props{
    credentialId:string,
    key:number,
}

interface State{
    credentials:Map<string,any>;
}


const NFTCard = (props:Props) => {
    
    const navigate = useNavigate();
    const [imageUrl,setImageUrl] = useState('');
    const [credential, setCredential] = useState<any>(null);
    const credentials = useSelector((state:State)=>state.credentials);

    useEffect(()=>{
        const credential = credentials.get(props.credentialId);
        console.log(credential);
        if(credential){
            setCredential(credential);
        if(credential.image.split('://')[0]=="ipfs"){
            setImageUrl(`https://gateway.ipfs.io/ipfs/${credential.image.split('://')[1]}`);
        }
        else{
            setImageUrl(credential.image);
        }
        }
    },[props.credentialId])

    if(credential){
        return(
        <Grid onClick ={()=>{navigate(`/credential/${credential.id}`)}} item key={props.key} style={{height:'350px',width:'350px', margin:'1rem', position:'relative', backgroundColor:'#EEEEEE', borderRadius:'50px'}}>
            <Box style={{backgroundColor:'rgba(0,0,0,0.6)', height:'20%', width:'100%', position:'absolute',borderRadius:'30px', bottom:0, display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                {credential.name?<Typography color="white">{credential.name}</Typography>:null}
                <Box style={{ height:'100%', width:'30%', borderRadius:'30px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <img src="https://i1.wp.com/slotshurra.com/wp-content/uploads/2021/08/Leonardo-Da-Vinci-Slot-Game-Symbol-03-1.jpg?resize=564%2C500&ssl=1" style={{objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>
                </Box>
            </Box>
            {/* <Typography>NFT: opensea.io//{props.credential.contract_address}/{props.credential.token_id}</Typography> */}
            {credential ? <img style={{height:'350px', width:'350px', borderRadius:'30px'}} src={imageUrl} alt="token"/> : null}
        </Grid>
    )
    }else{
        return<></>
    }

}

export default NFTCard;