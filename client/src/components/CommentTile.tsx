import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserById } from '../functions/axios';

const CommentTile = (props:any) => {

    const [comment,setComment] = useState<any>(props.comment);
    const [commenter,setCommenter] = useState<any>(null);
    const dispatch = useDispatch();
    const timestamp = new Date(props.comment.iat).toDateString();
    console.log(timestamp)

    useEffect(()=>{
        (async()=>{
            const commenter:any = await dispatch(getUserById(comment.userId));
            setCommenter(commenter.user);

        })();
    },[props.comment]);

    return(
        <Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding:'5px', width:'100%'}}>
            <Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                {commenter? <img src={commenter.profileImageUrl || ''} style={{height:'40px', width:'40px', borderRadius:'50%'}}/> : null }
                {commenter? <Typography style={{padding:'0px 10px', color:'black'}}>{commenter.username}</Typography> : null }
                <Typography style={{padding:'0px 10px', color:'black'}}>{comment.comment}</Typography>
            </Box>
            <Typography style={{padding:'0px 10px', color:'black'}}>{timestamp}</Typography>
        </Box>
    )
}

export default CommentTile;