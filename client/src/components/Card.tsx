import React from 'react';
import {Box, Button, Typography, Icon} from '@mui/material';
import './Card.css';
import { useNavigate } from 'react-router-dom';
import {SocialIcon} from 'react-social-icons';
import EditIcon from '@mui/icons-material/Edit';

const Card = (props:any) => {
    const navigate = useNavigate();

    return(
        <Box component="div" className="Card">
            <Box component="div" style={{display:'flex', flexDirection:'column'}}>
                <Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <SocialIcon style={{margin:'0.2rem 0.6rem'}} url={`${props.user.twitter}`}/>
                    <Typography style={{color:'black'}}>Twitter</Typography>
                </Box>
                <Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <SocialIcon style={{margin:'0.2rem 0.6rem'}} url={`${props.user.facebook}`}/>
                    <Typography style={{color:'black'}}>Facebook</Typography>
                </Box>
                <Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <SocialIcon style={{margin:'0.2rem 0.6rem'}} url={`${props.user.instagram}`}/>
                    <Typography style={{color:'black'}}>Instagram</Typography>
                </Box>
                <Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <SocialIcon style={{margin:'0.2rem 0.6rem'}} url={`${props.user.linkedIn}`}/>
                    <Typography style={{color:'black'}}>LinkedIn</Typography>
                </Box>
            </Box>
            <Box component="div" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <img src="https://i1.wp.com/slotshurra.com/wp-content/uploads/2021/08/Leonardo-Da-Vinci-Slot-Game-Symbol-03-1.jpg?resize=564%2C500&ssl=1" className = "cardImage"/>
                <Typography style={{color:'black', fontSize:'18px'}} className="cardText">@{props.user.username}</Typography>
            </Box>
            <Box component="div">
                <Typography style={{color:'black', fontSize:'18px'}} className="cardText">{props.user.bio}</Typography>
            </Box>
            <Button onClick={()=>{navigate('/editCard')}} style={{position:'absolute',bottom:'20px', right:'20px'}}>
                <EditIcon color="secondary" />
            </Button>
        </Box>
    );
}

export default Card;