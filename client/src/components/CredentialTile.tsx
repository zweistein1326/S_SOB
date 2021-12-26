import { useState } from "react";
import { connect } from "react-redux"
import { Typography } from "@mui/material";
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
            <Link to={`${title}`}><Typography>{title}</Typography></Link>
            -------------------------------
        </div>
    )
}

export default CredentialTile;