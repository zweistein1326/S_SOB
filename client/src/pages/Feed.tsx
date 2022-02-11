import React, { useEffect } from 'react';
import { Box, Button, Grid, Input, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeedCard from '../components/FeedCard';
import sortCredentials from '../redux/selectors/credentials';
import { searchByText } from '../redux/actions/filters';
import Header from '../components/Header';
import { followUser, getAllUsers, getCredentials } from '../functions/axios';

const Feed = () => {

    const credentials = useSelector((state:any)=> sortCredentials(state.credentials));
    const user = useSelector((state:any)=>state.auth.user);
    const allUsers = useSelector((state:any)=>state.auth.allUsers);
    const filters = useSelector((state:any)=>state.filters);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getCredentials());
        dispatch(getAllUsers());
    },[])
    
    return(
        allUsers && user ? <Box component="div" style={{backgroundColor:'#FFFFFF', color:'white',padding:'0px 0px', maxHeight:'90vh', display:'flex', flexDirection:'column'}}>
            <Header/>
            <Box component="div" style={{backgroundColor:'#FFFFFF', color:'white', padding:'20px 10px', minHeight:'90vh', display:'flex', flexDirection:'row'}}>
            <Box component="div" style={{backgroundColor:'#FFFFFF', color:'white', width:'100%', minHeight:'90vh', display:'flex', flexDirection:'row', alignItems:'center' }}>
                {/* <Box style={{width:'80%'}}>
                <Typography style={{backgroundColor:'#02F9A7', color:'black', margin:20, padding:'10px 30px', borderRadius:'20px'}}>Username, Address</Typography>
                </Box> */}
                <Box component="div" style={{zIndex:'999999', height:'90vh', backgroundColor:'#333333', maxWidth:'20vw', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', padding:'0px 10px', overflowY:'scroll'}}>
                    <Typography style={{color:'white', fontSize:'20px', fontWeight:'bold', padding:'20px'}}>Recommended for you</Typography>
                    {/* <Typography style={{color:'white', fontSize:'14px', fontWeight:'bold',textAlign:'right', width:'100%', padding:'0px 20px'}}>View more</Typography> */}
                    { allUsers.map((recommendUser:any)=>{
                        return(
                        recommendUser.id!==user.id?<Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:'100%', margin:'10px',}}>
                            <Box component="div" style={{display:'flex', flexDirection:'row', flex:1, alignItems:'center'}} onClick ={()=>{navigate(`/${recommendUser.id}`)}}>
                                {recommendUser.profileImageUrl? <img src={recommendUser.profileImageUrl} style={{width:'50px', height:'50px',backgroundColor:'pink', borderRadius:'50%'}}/>:<Box component="div" style={{width:'50px', height:'50px', backgroundColor:'pink', borderRadius:'50%'}}></Box>}
                                <Typography style={{flex:1, paddingLeft:'10px'}}>{recommendUser.username}</Typography>
                                <Button onClick={()=>{dispatch(followUser(user.id,recommendUser.id))}}>+ Follow</Button>
                            </Box>
                        </Box>:null
                        )})
                        }
                </Box>
                <Box component="div" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, width:'90%', backgroundColor:'#02F9A7', color:'black' }}
                        // disabled={loading}
                        onClick={()=>{navigate('/addCredential')}}
                    >
                        +Create 
                    </Button>
                    <Box component="div" style={{width:'60vw', display:'flex', alignItems:'center', flexDirection:'column', height:'90vh', overflowY:'scroll'}}>
                        {/* {<Grid container columns={3} style={{backgroundColor:'#FFFFFF', color:'white', padding:'0px 20px', maxHeight:'100vh', overflowY:'scroll', width:'100%'}}> */}
                            {credentials.map((credential:any,index:number)=>(
                                <FeedCard credential={credential} key={index}/>)
                                )}
                        {/* </Grid>} */}
                    </Box>
                </Box>
                <Box component="div" style={{zIndex:'999999', height:'90vh', backgroundColor:'#333333', maxWidth:'20vw', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', padding:'0px 10px', overflowY:'scroll'}}>
                    <Typography style={{color:'white', fontSize:'20px', fontWeight:'bold', padding:'20px'}}>Recommended for you</Typography>
                    {/* <Typography style={{color:'white', fontSize:'14px', fontWeight:'bold',textAlign:'right', width:'100%', padding:'0px 20px'}}>View more</Typography> */}
                    { allUsers.map((recommendUser:any)=>{
                        return(
                        recommendUser.id!==user.id?<Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:'100%', margin:'10px',}}>
                            <Box component="div" style={{display:'flex', flexDirection:'row', flex:1, alignItems:'center'}} onClick ={()=>{navigate(`/${recommendUser.id}`)}}>
                                {recommendUser.profileImageUrl? <img src={recommendUser.profileImageUrl} style={{width:'50px', height:'50px',backgroundColor:'pink', borderRadius:'50%'}}/>:<Box component="div" style={{width:'50px', height:'50px', backgroundColor:'pink', borderRadius:'50%'}}></Box>}
                                <Typography style={{flex:1, paddingLeft:'10px'}}>{recommendUser.username}</Typography>
                                <Button onClick={()=>{dispatch(followUser(user.id,recommendUser.id))}}>+ Follow</Button>
                            </Box>
                        </Box>:null
                        )})
                        }
                </Box>
            </Box>
            {/* <Sidebar user={user}/> */}
            </Box>
        </Box> : null
    )
}

export default Feed