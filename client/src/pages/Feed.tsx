import React from 'react';
import { Box, Button, Input, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeedCard from '../components/FeedCard';
import sortCredentials from '../redux/selectors/credentials';
import { searchByText } from '../redux/actions/filters';
import Header from '../components/Header';

const Feed = () => {

    const credentials = useSelector((state:any)=> sortCredentials(state.credentials));
    const sortedCredentials = credentials.sort((a:any, b:any) => b.iat - a.iat)
    const user = useSelector((state:any)=>state.auth.user);
    const allUsers = useSelector((state:any)=>state.auth.allUsers);
    const filters = useSelector((state:any)=>state.filters);
    const dispatch = useDispatch();
    
    return(
        <Box component="div" style={{backgroundColor:'#332E2E', color:'white',padding:'0px 20px', minHeight:'90vh', display:'flex', flexDirection:'column'}}>
            <Header/>
            <Box component="div" style={{backgroundColor:'#332E2E', color:'white', padding:'20px', minHeight:'90vh', display:'flex', flexDirection:'row'}}>
            <Box component="div" style={{backgroundColor:'#332E2E', color:'white', width:'100%', minHeight:'90vh', display:'flex', flexDirection:'column', alignItems:'center' }}>
                {/* <Box style={{width:'80%'}}>
                <Typography style={{backgroundColor:'#02F9A7', color:'black', margin:20, padding:'10px 30px', borderRadius:'20px'}}>Username, Address</Typography>
                </Box> */}
                <Box component="div" style={{backgroundColor:'#332E2E', color:'white', padding:'40px 20px', height:'82vh', display:'flex', flexDirection:'column', alignItems:'center', overflowY:'auto',position:'absolute', scrollbarWidth: 'none', width:'95vw'}}>
                    {credentials.map((credential:any,index:number)=>(
                        <FeedCard credential={credential} key={index}/>)
                        )}
                </Box>
            </Box>
            {/* <Box style={{position:'relative', zIndex:'999999', height:'100vh', backgroundColor:'#02F9A7', minWidth:'3vw', maxWidth:'12vw', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'10px 20px'}}>
                <Typography style={{color:'black'}}>Live Auctions</Typography>
            </Box> */}
            {/* <Sidebar user={user}/> */}
            </Box>
        </Box>
    )
}

export default Feed