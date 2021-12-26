import { useState } from "react";
import { connect } from "react-redux"
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CredentialTile = (props:any) => {
    const {credential,title} = props;
    console.log(credential)

    const getCredentialInfo = ()=>{
        // find info for credential
    }

    return(
        <div>
            -------------------------------
            <Link to={`${title}`}><Typography>{credential.title}</Typography></Link>
            {credential.pending ?
            <Box>
            <Button 
            onClick={()=>{}} 
            color="success" 
            variant="contained" 
            sx={{ mt:3, mb:2 }}>
                Accept
            </Button>
            <Button onClick={()=>{}}
            color="error"
            variant="contained"
            sx={{ mt:3, mb:2 }}>
                Reject
            </Button>
            </Box> 
            :
            <Button onClick={()=>{}}
            color="error"
            variant="contained"
            sx={{ mt:3, mb:2 }}>
                Delete
            </Button>}
            -------------------------------
        </div>
    )
}

export default CredentialTile;