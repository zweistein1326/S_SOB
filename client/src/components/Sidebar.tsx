import { Typography ,Box} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props:any) => {
    return (
        <Box style={{position:'relative', zIndex:'999999', height:'100vh', backgroundColor:'#EEEEEE', width:'20vw', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Box style={{padding:'25px 10px', margin:'10px 0px', backgroundColor:'#777777', width:'90%', display:'flex', justifyContent:'center'}}>
                <Link to='/feed' style={{textDecoration:'none', color:'white'}}>Feed</Link>
            </Box>
            {/* <Box style={{padding:'25px 10px', margin:'10px 0px',backgroundColor:'#777777', width:'90%', display:'flex', justifyContent:'center'}}>
                <Link to='/addCredential' style={{textDecoration:'none', color:'white'}}>Add NFT</Link>
            </Box> */}
            <Box style={{padding:'25px 10px', margin:'10px 0px', backgroundColor:'#777777', width:'90%', display:'flex', justifyContent:'center'}}>
                <Link to={`/${props.user.id}`} style={{textDecoration:'none', color:'white'}}>My Profile</Link>
            </Box>
            <Box style={{padding:'25px 10px', margin:'10px 0px', backgroundColor:'#777777', width:'90%', display:'flex', justifyContent:'center'}}>
                <Link to='/settings' style={{textDecoration:'none', color:'white'}}>Settings</Link>
            </Box>
            <Box style={{padding:'25px 10px', margin:'10px 0px', backgroundColor:'#777777', width:'90%', display:'flex', justifyContent:'center'}}>
                <Link to='/' onClick={()=>{}} style={{textDecoration:'none', color:'white'}}>Logout</Link>
            </Box>
            <Typography style={{overflowWrap:'normal', color:'black'}}>{props.user.id}</Typography>
            <Typography style={{overflowWrap:'normal', color:'black'}}>@{props.user.username}</Typography>
            <img src="https://i1.wp.com/slotshurra.com/wp-content/uploads/2021/08/Leonardo-Da-Vinci-Slot-Game-Symbol-03-1.jpg?resize=564%2C500&ssl=1" className = "sidebarImage"/>
        </Box>
    )
}

export default Sidebar;

