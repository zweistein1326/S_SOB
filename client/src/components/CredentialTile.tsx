import { useState } from "react";
import { connect } from "react-redux"
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CHANGESTATUS } from "../graphql";

const CredentialTile = (props:any) => {
    const {credential,title} = props;
    const [changeCredentialStatus,{loading,error}] = useMutation(CHANGESTATUS);
    console.log(props.auth.user);

    const getCredentialInfo = ()=>{
        // find info for credential
    }

     const acceptCredential=()=>{
        changeCredentialStatus({
            variables:{
                input: {
                    id:title,
                    ownerId: props.auth.user.id
                }
            }
        }).then((res)=>{
            const {status} = res.data.changeCredentialStatus;
            console.log(status);
        })
    }

    const rejectCredential = ()=>{
        // delink credential from user's account
    }

    return(
        <Box sx={{ mt:3, mb:2, border:'1px solid grey', p:2 }}>
            <Link to={`${title}`}><Typography variant="h6">{credential.title}</Typography></Link>
            {credential.pending ?
            <Box>
            <Button 
            onClick={acceptCredential} 
            color="success" 
            variant="contained" 
            sx={{ mt:3, mb:2 }}>
                Accept
            </Button>
            <Button onClick={rejectCredential}
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
        </Box>
    )
}

const mapStateToProps = (state:any) => ({
    auth:state.auth
})
export default connect(mapStateToProps)(CredentialTile);