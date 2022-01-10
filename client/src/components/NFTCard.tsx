import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

const NFTCard = (props:any) => {
    return(
        <Grid item key={props.key} style={{margin:'1rem', border:'1px solid white', padding:'10px', backgroundColor:'#EEEEEE'}}>
            <Typography color="black">{props.credential.name}</Typography>
            {/* <Typography>NFT: opensea.io//{props.credential.contract_address}/{props.credential.token_id}</Typography> */}
            {props.credential ? <img style={{height:'200px', width:'200px'}} src={props.credential.image} alt="token"/> : null}
        </Grid>
    )
}

export default NFTCard;