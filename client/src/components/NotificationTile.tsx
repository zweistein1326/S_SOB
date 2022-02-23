import { Typography, Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {getUserById} from '../functions/axios';
import { useDispatch, useSelector } from 'react-redux';

const NotificationTile = (props:any) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [from, setFrom] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        (async ()=>{           
            if(props.creator){
                const {user}:any = await dispatch(getUserById(props.creator));
                setFrom(user);
                setLoading(false);
            }
        })();
    },[props.creator])

    return(
        loading?<CircularProgress/>:
        <Box onClick={()=>{navigate(`/credential/${props.notification.credentialId}`)}}  component="div" style={{border:'1px solid gray', width:'80%', padding:'20px', position:'relative', display:'flex', flexDirection:'row'}}>
            {from ? <img src={from.profileImageUrl ? from.profileImageUrl:''} style={{backgroundColor:'pink',objectFit:'cover', width:'50px', height:'50px', borderRadius:'50%'}} className = "cardImage"/>:
                    <Box component="div" style={{backgroundColor:'#E46A6A',objectFit:'cover', width:'50px', height:'50px', borderRadius:'50%'}}></Box>}
            <Box component="div" style={{marginLeft:'20px'}}>
                <Typography onClick={()=>{navigate(`/credential/${props.notification.credentialId}`)}} style={{color:'black', fontWeight:'bold'}}>{props.notification.title}</Typography>
                <Typography onClick={()=>{navigate(`/credential/${props.notification.credentialId}`)}} style={{color:'black'}}>{props.notification.message}</Typography>
            </Box>
        </Box>
    )

}

export default NotificationTile;