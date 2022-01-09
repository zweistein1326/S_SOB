import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import './Card.css';
import { useNavigate } from 'react-router-dom';

const Card = (props:any) => {
    const navigate = useNavigate();
    return(
        <Box className="Card">
            <img src="https://bafkreiglrr2xonkkfs37toim6fqy3vogogpz4yrw4wex2ds4ktjrdzlsqq.ipfs.dweb.link" className = "cardImage"/>
            <Box>
                <Typography>Linkedin</Typography>
                <Typography>Facebook</Typography>
                <Typography>Instagram</Typography>
                <Typography>Discord</Typography>
            </Box>
            <Button onClick={()=>{navigate('/editCard')}} style={{position:'absolute',bottom:'20px', right:'20px'}}>
                <Typography style={{color:'white'}}>Customize</Typography>
            </Button>
        </Box>
    );
}

export default Card;