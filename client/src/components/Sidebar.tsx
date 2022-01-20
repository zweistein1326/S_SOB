import { Typography ,Box} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = (props:any) => {

    const user = useSelector((state:any)=>state.auth.user);

    return (
        <Box style={{position:'relative', zIndex:'999999', height:'100vh', backgroundColor:'#EEEEEE', minWidth:'3vw', maxWidth:'12vw', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'10px 20px'}}>
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

