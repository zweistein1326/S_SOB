import { Typography ,Box} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props:any) => {
    return (
        <Box style={{position:'relative', zIndex:'999999', height:'100vh', backgroundColor:'#444444', width:'20vw', display:'flex', flexDirection:'column', alignItems:'center'}}>
        <img src="https://bafkreiglrr2xonkkfs37toim6fqy3vogogpz4yrw4wex2ds4ktjrdzlsqq.ipfs.dweb.link" className = "sidebarImage"/>
        <Typography>{props.user.id}</Typography>
        <Typography>@zweistein1326</Typography>
        <Box style={{padding:'25px 10px', margin:'10px 0px', backgroundColor:'#777777', width:'90%', display:'flex', justifyContent:'center'}}>
            <Link to='/feed' style={{textDecoration:'none', color:'white'}}>Feed</Link>
        </Box>
        <Box style={{padding:'25px 10px', margin:'10px 0px',backgroundColor:'#777777', width:'90%', display:'flex', justifyContent:'center'}}>
            <Link to='/addCredential' style={{textDecoration:'none', color:'white'}}>Add NFT</Link>
        </Box>
        <Box style={{padding:'25px 10px', margin:'10px 0px', backgroundColor:'#777777', width:'90%', display:'flex', justifyContent:'center'}}>
            <Link to={`/${props.user.id}`} style={{textDecoration:'none', color:'white'}}>My Profile</Link>
        </Box>
        <Box style={{padding:'25px 10px', margin:'10px 0px', backgroundColor:'#777777', width:'90%', display:'flex', justifyContent:'center'}}>
            <Link to='/feed' style={{textDecoration:'none', color:'white'}}>Settings</Link>
        </Box>
        <Box style={{padding:'25px 10px', margin:'10px 0px', backgroundColor:'#777777', width:'90%', display:'flex', justifyContent:'center'}}>
            <Link to='/feed' style={{textDecoration:'none', color:'white'}}>Logout</Link>
        </Box>
     </Box>
    )
}

export default Sidebar;

