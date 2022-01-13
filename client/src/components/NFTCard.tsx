import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import './NFTCard.css';

const NFTCard = (props:any) => {
    return(
        <Grid item key={props.key} style={{height:'350px',width:'350px', margin:'1rem', position:'relative', backgroundColor:'#EEEEEE', borderRadius:'20px'}}>
            <Box style={{backgroundColor:'rgba(0,0,0,0.6)', height:'20%', width:'100%', position:'absolute',borderRadius:'15px', bottom:0, display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                <Typography color="white">{props.credential.name}</Typography>
                <Box style={{ height:'100%', width:'30%', borderRadius:'15px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <img src="https://i1.wp.com/slotshurra.com/wp-content/uploads/2021/08/Leonardo-Da-Vinci-Slot-Game-Symbol-03-1.jpg?resize=564%2C500&ssl=1" style={{objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>
                </Box>
            </Box>
            {/* <Typography>NFT: opensea.io//{props.credential.contract_address}/{props.credential.token_id}</Typography> */}
            {props.credential ? <img style={{height:'350px', width:'350px', borderRadius:'15px'}} src={props.credential.image} alt="token"/> : null}
        </Grid>
    )
}

export default NFTCard;