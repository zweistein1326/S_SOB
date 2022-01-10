import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FeedCard from '../components/FeedCard';
import Sidebar from '../components/Sidebar';

const Feed = () => {

    const credentials = useSelector((state:any)=>state.credentials);
    const user = useSelector((state:any)=>state.auth.user);
    
    return(
        <Box style={{backgroundColor:'#332E2E', color:'white', width:'100%', minHeight:'100vh', display:'flex', flexDirection:'row'}}>
            <Sidebar user={user}/>
            <Box style={{backgroundColor:'#332E2E', color:'white', width:'100%', minHeight:'100vh', display:'flex', flexDirection:'column'}}>
                <Box style={{width:'100%'}}>
                <Typography style={{backgroundColor:'#EEEEEE', color:'black', margin:20, padding:10}}>Username, Address</Typography>
                </Box>
                <Box style={{backgroundColor:'#332E2E', color:'white', padding:'10px 200px', display:'flex', flexDirection:'column', alignItems:'center',}}>
                    {credentials.map((credential:any,index:number)=>(
                    <FeedCard credential={credential} key={index}/>)
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default Feed