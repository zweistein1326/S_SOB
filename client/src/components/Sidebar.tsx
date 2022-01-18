import { Typography ,Box} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = (props:any) => {

    const user = useSelector((state:any)=>state.auth.user);

    return (
        <Box style={{position:'relative', zIndex:'999999', height:'100vh', backgroundColor:'#EEEEEE', minWidth:'3vw', maxWidth:'12vw', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'10px 20px'}}>
                <Link to='/feed' style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 0px', backgroundColor:'#000000', width:'90%', display:'flex', justifyContent:'center',textDecoration:'none', color:'#02F9A7'}}>
                    <Box >
                        Feed
                    </Box>
                </Link>
            {/* <Box style={{padding:'25px 10px', margin:'10px 0px',backgroundColor:'#777777', width:'90%', display:'flex', justifyContent:'center'}}>
                <Link to='/addCredential' style={{textDecoration:'none', color:'white'}}>Add NFT</Link>
            </Box> */}
            <Link to={`/${props.user.id}`} style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 0px', backgroundColor:'#000000', width:'90%', display:'flex', justifyContent:'center',textDecoration:'none', color:'#02F9A7'}}>
                <Box>
                    My Portfolio
                </Box>        
            </Link>
    
           
            <Link to='/settings' style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 0px', backgroundColor:'#000000', width:'90%', display:'flex', justifyContent:'center',textDecoration:'none', color:'#02F9A7'}}>
                <Box >
                    Settings
                </Box>
            </Link>
            <Link to='/addCredential' style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 0px', backgroundColor:'#02F9A7', width:'90%', display:'flex', justifyContent:'center', textDecoration:'none', color:'#000000'}} onClick={()=>{}}>
                <Box>
                    +Add NFT
                </Box>
            </Link>
            <Box style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <Box style={{display:'flex', flexDirection:'column'}}>
                    <Typography style={{overflowWrap:'anywhere', color:'black'}}>{props.user.id}</Typography>
                    <Typography style={{overflowWrap:'normal', color:'black'}}>@{props.user.username}</Typography>
                </Box>
                <img src={user.profileImageUrl || ''} className = "sidebarImage"/>
            </Box>
        </Box>
    )
}

export default Sidebar;

