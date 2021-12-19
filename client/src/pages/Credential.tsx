import {Typography} from '@mui/material';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';



const Credential = (props:any) => {
    const [isAuth,setAuth] = useState(
        props.auth.user !== null //set inital to public
    );    
    const {credentialId} = useParams();

    const fetchCredentialInfo = () => {
        
    }

    return(
        <>
        <Typography>
            Hi this is credential no. {`${credentialId}`}
        </Typography>
        <Typography><Link to={`/user/${props.auth.user.degreeCertificate.issuer}`}>Issuer: {props.auth.user.degreeCertificate.issuer}</Link></Typography>
        <Typography><Link to={`/user/${props.auth.user.degreeCertificate.issuer}`}>Signature: {props.auth.user.degreeCertificate.signature}</Link></Typography>
        <a href={props.auth.user.degreeCertificate.url}><Typography>Url: {props.auth.user.degreeCertificate.url}</Typography></a>
        <Typography>View History</Typography>
        </>
    )
}

const mapStateToProps =(state:any)=>({
    auth:state.auth
})

export default connect(mapStateToProps)(Credential);