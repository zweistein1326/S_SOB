import React from 'react';
import { Box, Button, Input, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeedCard from '../components/FeedCard';
import Sidebar from '../components/Sidebar';
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
        <Box style={{backgroundColor:'#EEEEEE', color:'white', minHeight:'90vh', display:'flex', flexDirection:'column'}}>
            {/* <Header/> */}
            <Box style={{backgroundColor:'#EEEEEE', color:'white', padding:'20px', minHeight:'90vh', display:'flex', flexDirection:'row'}}>
                <Sidebar user={user}/>
            <Box style={{backgroundColor:'#EEEEEE', color:'white', width:'100%', minHeight:'90vh', display:'flex', flexDirection:'column', alignItems:'center' }}>
                {filters.text ==='' ? null :
                    <Box style={{ width:'100%', height:'10%'}}>
                        {allUsers.map((user:any)=>{return(<Link to={`/${user.id}`} onClick={()=>{dispatch(searchByText(''))}}><Typography style={{color:'black'}}>{user.username}</Typography></Link>)})}
                    </Box>
                }
                <Box style={{width:'100%', backgroundColor:'transparent', display:'flex', justifyContent:'center', alignItems:'center', zIndex:9999}}>
                    <Input name="search_text" placeholder="Search by Username, Address" value={filters.text} onChange={(event)=>{dispatch(searchByText(event.target.value))}} disableUnderline={true} style={{ width:'80%',backgroundColor:'rgba(0,0,0,0.2)', color:'black', margin:'10px 0px', padding:'10px 20px', borderRadius:'20px'}}/>
                </Box>
                {/* <Box style={{width:'80%'}}>
                <Typography style={{backgroundColor:'#02F9A7', color:'black', margin:20, padding:'10px 30px', borderRadius:'20px'}}>Username, Address</Typography>
                </Box> */}
                <Box style={{backgroundColor:'#EEEEEE', color:'white', padding:'40px 20px', display:'flex', flexDirection:'column', alignItems:'center', minHeight:'90vh',maxHeight:'98vh', overflowY:'auto',position:'absolute', scrollbarWidth: 'none'}}>
                    {credentials.map((credential:any,index:number)=>(
                        <FeedCard credential={credential} key={index}/>)
                        )}
                </Box>
            </Box>
            <Box style={{position:'relative', zIndex:'999999', height:'100vh', backgroundColor:'#000000', minWidth:'20vw', maxWidth:'12vw', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'10px 20px'}}>
                <Typography>No Live Auctions yet</Typography>
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