import { Box, Typography } from '@mui/material';
import React from 'react';

const Button = (props:any) => {
    return(
        <Box component="div" style={{width:'', height:'40px'}} onClick = {props.onClick}>
            <Typography style={{}}>{props.buttonText}</Typography>
        </Box>
    )
}

export default Button;