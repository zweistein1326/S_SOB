import React from 'react';
import { Box, Button, Input, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeedCard from '../components/FeedCard';
import Sidebar from '../components/Sidebar';
import sortCredentials from '../selectors/credentials';
import { searchByText } from '../actions/filters';

const Feed = () => {

    const credentials = useSelector((state:any)=> sortCredentials(state.credentials));
    const sortedCredentials = credentials.sort((a:any, b:any) => b.iat - a.iat)
    const user = useSelector((state:any)=>state.auth.user);
    const allUsers = useSelector((state:any)=>state.auth.allUsers);
    const filters = useSelector((state:any)=>state.filters);
    const dispatch = useDispatch();
    console.log(sortedCredentials);
    
    return(
        <Box style={{backgroundColor:'#EEEEEE', color:'white', padding:'20px', minHeight:'90vh', display:'flex', flexDirection:'row'}}>
            <Sidebar user={user}/>
            <Box style={{backgroundColor:'#EEEEEE', color:'white', width:'100%', minHeight:'90vh', display:'flex', flexDirection:'column', alignItems:'center'}}>
                {/* {filters.text ==='' ? null :
                    <Box style={{ width:'100%', height:'20%'}}>
                    {allUsers.map((user:any)=>{return(<Link to={`/${user.id}`} onClick={()=>{dispatch(searchByText(''))}}><Typography style={{color:'black'}}>{user.username}</Typography></Link>)})}
                    </Box>
                }
                <Box style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-end', width:'100%',padding: '1rem'}}>
                    <Box style={{flex:1}}>
                    <Input name="search_text" placeholder="Search by Username, Address" value={filters.text} onChange={(event)=>{dispatch(searchByText(event.target.value))}} disableUnderline={true} style={{ width:'80%',backgroundColor:'#02F9A7', color:'black', margin:'20px 0px', padding:'10px 20px', borderRadius:'20px'}}/>
                    </Box>
                </Box> */}
                {/* <Box style={{width:'80%'}}>
                <Typography style={{backgroundColor:'#02F9A7', color:'black', margin:20, padding:'10px 30px', borderRadius:'20px'}}>Username, Address</Typography>
                </Box> */}
                <Box style={{backgroundColor:'#EEEEEE', color:'white', padding:'10px 20px', display:'flex', flexDirection:'column', alignItems:'center', minHeight:'90vh',maxHeight:'98vh', overflowY:'auto',}}>
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
    )
}

export default Feed