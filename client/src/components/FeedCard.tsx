import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

const FeedCard = (props:any) => {
    return(
        <Grid item key={props.key} style={{margin:'1rem', height:'50vh', width:'30vw', border:'1px solid white', padding:'10px', backgroundColor:'#EEEEEE', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <Typography color="black">NFT: {props.credential.name}</Typography>
            {/* <Typography>NFT: opensea.io//{props.credential.contract_address}/{props.credential.token_id}</Typography> */}
            {props.credential ? <img style={{height:'80%', width:'80%'}} src={props.credential.image} alt="token"/> : null}
        </Grid>
    )
}

export default FeedCard;