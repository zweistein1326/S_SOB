import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import './Card.css';
import { useNavigate } from 'react-router-dom';

const Card = (props:any) => {
    const navigate = useNavigate();

    console.log(props.account);

    return(
        <Box className="Card">
             <Box>
                <Typography className="cardText">Linkedin</Typography>
                <Typography className="cardText">Facebook</Typography>
                <Typography className="cardText">Instagram</Typography>
                <Typography className="cardText">Discord</Typography>
            </Box>
            <img src="https://i1.wp.com/slotshurra.com/wp-content/uploads/2021/08/Leonardo-Da-Vinci-Slot-Game-Symbol-03-1.jpg?resize=564%2C500&ssl=1" className = "cardImage"/>
            <Box>
                <Typography className="cardText">{props.account}</Typography>
                <Typography className="cardText">@zweistein1326</Typography>
                <Typography className="cardText">Siddharth Agarwal</Typography>
                <Typography className="cardText">My favorite person</Typography>
                {/* <Typography>Discord</Typography> */}
            </Box>
            <Button onClick={()=>{navigate('/editCard')}} style={{position:'absolute',bottom:'20px', right:'20px'}}>
                <Typography style={{color:'white'}}>Customize</Typography>
            </Button>
        </Box>
    );
}

export default Card;