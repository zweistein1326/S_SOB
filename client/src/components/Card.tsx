import React from 'react';
import {Box, Button, Typography, Icon} from '@mui/material';
import './Card.css';
import { useNavigate } from 'react-router-dom';
import {SocialIcon} from 'react-social-icons';
import EditIcon from '@mui/icons-material/Edit';

const Card = (props:any) => {
    const navigate = useNavigate();

    return(
        <Box className="Card">
            <Box>
                <SocialIcon url={`${props.user.twitter}`}/>
                <SocialIcon url={`${props.user.facebook}`}/>
                <SocialIcon url={`${props.user.instagram}`}/>
                <SocialIcon url={`${props.user.linkedIn}`}/>
            </Box>
            <Box style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <img src="https://i1.wp.com/slotshurra.com/wp-content/uploads/2021/08/Leonardo-Da-Vinci-Slot-Game-Symbol-03-1.jpg?resize=564%2C500&ssl=1" className = "cardImage"/>
                <Typography style={{color:'black', fontSize:'18px'}} className="cardText">@{props.user.username}</Typography>
            </Box>
            <Box>
                <Typography style={{color:'black', fontSize:'18px'}} className="cardText">{props.user.bio}</Typography>
            </Box>
            <Button onClick={()=>{navigate('/editCard')}} style={{position:'absolute',bottom:'20px', right:'20px'}}>
                {/* <Typography style={{color:'white'}}>Customize</Typography> */}
                <EditIcon color="secondary" />
            </Button>
        </Box>
    );
}

export default Card;