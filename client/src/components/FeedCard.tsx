import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

const FeedCard = (props:any) => {
    return(
        <Grid item key={props.key} style={{margin:'1rem', height:'50vh', width:'30vw', border:'2px solid white',position:'relative', borderRadius:'0px', backgroundColor:'#EEEEEE', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            {props.credential ? <img style={{height:'100%', width:'100%', borderRadius:'0px'}} src={props.credential.image} alt="token"/> : null}
            <Box style={{backgroundColor:'rgba(0,0,0,0.6)', height:'20%', width:'100%', position:'absolute', bottom:0,  display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
            {/* <Typography color="black">{props.credential.name}</Typography> */}
            {/* <Typography>NFT: opensea.io//{props.credential.contract_address}/{props.credential.token_id}</Typography> */}
                <Typography color="white">{props.credential.name}</Typography>
                <Box style={{ height:'100%', width:'20%', borderRadius:'30px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <img src="https://i1.wp.com/slotshurra.com/wp-content/uploads/2021/08/Leonardo-Da-Vinci-Slot-Game-Symbol-03-1.jpg?resize=564%2C500&ssl=1" style={{objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>
                </Box>
            </Box>
        </Grid>
    )
}

export default FeedCard;