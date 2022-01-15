import { Typography ,Box} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props:any) => {
    return (
        <Box style={{position:'relative', zIndex:'999999', height:'100vh', backgroundColor:'#EEEEEE', minWidth:'3vw', maxWidth:'12vw', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'10px 20px'}}>
            <Box style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 0px', backgroundColor:'#000000', width:'90%', display:'flex', justifyContent:'center'}}>
                <Link to='/feed' style={{textDecoration:'none', color:'#02F9A7'}}>Feed</Link>
            </Box>
            {/* <Box style={{padding:'25px 10px', margin:'10px 0px',backgroundColor:'#777777', width:'90%', display:'flex', justifyContent:'center'}}>
                <Link to='/addCredential' style={{textDecoration:'none', color:'white'}}>Add NFT</Link>
            </Box> */}
            <Box style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 0px', backgroundColor:'#000000', width:'90%', display:'flex', justifyContent:'center'}}>
                <Link to={`/${props.user.id}`} style={{textDecoration:'none', color:'#02F9A7'}}>My Profile</Link>
            </Box>
            <Box style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 0px', backgroundColor:'#000000', width:'90%', display:'flex', justifyContent:'center'}}>
                <Link to='/settings' style={{textDecoration:'none', color:'#02F9A7'}}>Settings</Link>
            </Box>
            <Box style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 0px', backgroundColor:'#02F9A7', width:'90%', display:'flex', justifyContent:'center'}}>
                <Link to='/addCredential' onClick={()=>{}} style={{textDecoration:'none', color:'#000000'}}>+Add NFT</Link>
            </Box>
            <Box style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <Box style={{display:'flex', flexDirection:'column'}}>
                    <Typography style={{overflowWrap:'anywhere', color:'black'}}>{props.user.id}</Typography>
                    <Typography style={{overflowWrap:'normal', color:'black'}}>@{props.user.username}</Typography>
                </Box>
                <img src="https://i1.wp.com/slotshurra.com/wp-content/uploads/2021/08/Leonardo-Da-Vinci-Slot-Game-Symbol-03-1.jpg?resize=564%2C500&ssl=1" className = "sidebarImage"/>
            </Box>
        </Box>
    )
}

export default Sidebar;

