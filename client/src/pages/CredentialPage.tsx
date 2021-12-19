import {Typography} from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Credential } from '../models/Credential';

const CredentialPage = (props:any) => {
    const {credentialId} = useParams();
    const [credential,setCredential] = useState<Credential|null>(null);
    const [isAuth,setAuth] = useState(
        props.auth.user !== null //set inital to public
    );    
    
    const fetchCredentialInfo = () => {
        var cred  = Object.values<Credential>(props.auth.user.credentials).find((credential:Credential)=> credential.id == credentialId) || null;
        setCredential(cred);
    }

    useEffect(fetchCredentialInfo,[]);
    
    return(
        <>
        <Typography>
            Hi this is credential no. {`${credentialId}`}
        </Typography>
        {credential?
        <>
            <Typography><Link to={`/user/${credential.issuer}`}>Issuer: {credential.issuer}</Link></Typography>
            <Typography><Link to={`/user/${credential.issuer}`}>Signature: {credential.signature}</Link></Typography>
            <a href={credential.url}><Typography>Url: {credential.url}</Typography></a>
            <Typography>View History</Typography>
        </>:
           null}
        
        </>
    )
}

const mapStateToProps =(state:any)=>({
    auth:state.auth
})

export default connect(mapStateToProps)(CredentialPage);