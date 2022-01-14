import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FeedCard from '../components/FeedCard';
import Sidebar from '../components/Sidebar';
import sortCredentials from '../selectors/credentials';

const Feed = () => {

    const credentials = useSelector((state:any)=> sortCredentials(state.credentials));
    const user = useSelector((state:any)=>state.auth.user);
    console.log(credentials);
    
    return(
        <Box style={{backgroundColor:'#EEEEEE', color:'white', padding:'20px', minHeight:'100vh', display:'flex', flexDirection:'row'}}>
            <Sidebar user={user}/>
            <Box style={{backgroundColor:'#EEEEEE', color:'white', width:'55%', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Box style={{width:'80%'}}>
                <Typography style={{backgroundColor:'#02F9A7', color:'black', margin:20, padding:'10px 30px', borderRadius:'20px'}}>Username, Address</Typography>
                </Box>
                <Box style={{backgroundColor:'#EEEEEE', color:'white', padding:'10px 200px', display:'flex', flexDirection:'column', alignItems:'center',}}>
                    {credentials.map((credential:any,index:number)=>(
                        <FeedCard credential={credential} key={index}/>)
                        )}
                </Box>
            </Box>
            <Sidebar user={user}/>
        </Box>
    )
}

export default Feed