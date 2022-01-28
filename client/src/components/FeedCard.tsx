import { Box, Grid, Icon, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BiUpArrow } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { favorite, like } from '../functions/axios';
import {FaRegComment} from 'react-icons/fa';
import styles from 'FeedCard.module.css';

const FeedCard = (props:any) => {

    const [imageUrl,setImageUrl] = useState<any>('');
    const [credential,setCredential]= useState<any>(props.credential);
    const [credentialOwner, setOwner] = useState<any>(null);
    const allUsers = useSelector((state:any)=>state.auth.allUsers);
    const user = useSelector((state:any)=>state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLiked, setLiked] = useState(false);
 
     useEffect(()=>{
        if(credential){
            const owner = allUsers.find((user:any)=>user.id.toLowerCase() === credential.owner.toLowerCase())
            if(credential.likes){
                if(credential.likes.find((like:string)=>like.toLowerCase()===user.id.toLowerCase())){
                    setLiked(true);
                }
                else{
                    setLiked(false);
                }
            }
            setOwner(owner);
        if(credential.image.split('://')[0]=="ipfs"){
            setImageUrl(`https://gateway.ipfs.io/ipfs/${credential.image.split('://')[1]}`);
        }
        else{
            setImageUrl(credential.image);
        }
        }
    },[props.credentialId,credential])

    const setLike = async() => {
        setLiked(!isLiked);
        const newCredential:any = await dispatch(like(credential.id));
        setCredential(newCredential.data);
    }

    // return(
    //     <Grid item  key={props.key} style={{margin:'2rem 0', height:'60vh', minWidth:'30vw', border:'2px solid white',position:'relative', borderRadius:'20px', backgroundColor:'#EEEEEE', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
    //         {props.credential ? <img onClick={()=>{navigate(`/credential/${credential.id}`)}} style={{height:'100%', width:'100%', borderRadius:'20px'}} src={imageUrl} alt="token"/> : null}
    //         {credentialOwner ? <Box onClick={()=>{navigate(`/credential/${credential.id}`)}} style={{position:'absolute', bottom:0, left:0, height:'20%', width:'20%', display:'flex', alignItems:'center', justifyContent:'center', zIndex:'99999'}}>
    //             <img src={credentialOwner.profileImageUrl ? credentialOwner.profileImageUrl:''} style={{backgroundColor:'pink',objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>
    //         </Box> : 
    //         <Box onClick={()=>{navigate(`/credential/${credential.id}`)}} style={{position:'absolute', bottom:0, left:0, height:'20%', width:'20%', display:'flex', alignItems:'center', justifyContent:'center', zIndex:'99999'}}>
    //             <Box style={{backgroundColor:'pink',objectFit:'cover', width:'50%', height:'50%', borderRadius:'50%'}}>
    //             </Box>
    //         </Box>}
    //         <Box style={{backgroundColor:'rgba(0,0,0,0.6)', borderBottomLeftRadius:'20px',borderBottomRightRadius:'20px', height:'20%', width:'100%', position:'absolute', bottom:0,  display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
    //         {/* <Typography color="black">{props.credential.name}</Typography> */}
    //         {/* <Typography>NFT: opensea.io//{props.credential.contract_address}/{props.credential.token_id}</Typography> */}
    //             <Box style={{width:'80%', display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
    //                 <Box>
    //                     <Typography color="white">{props.credential.name} #{props.credential.token_id}</Typography>
    //                     <Typography color="white">{props.credential.caption}</Typography>
    //                 </Box>
    //                 {credential? 
    //                 <Box style={{zIndex:99999, display:'flex', flexDirection:'row', alignItems:'center'}}>
    //                     <BiUpArrow size={22} color={isLiked ? '#02F9A7':'red'} onClick={setLike}/>
    //                     {<Typography style={{padding:'0px 10px', fontSize:'21px'}}>{credential.likes ? credential.likes.length : 0}</Typography>}
    //                     {/* <BiDownArrow onClick={setLike}/> */}
    //                 </Box> 
    //                 : 
    //                 null}
    //                 {credential? 
    //                 <Box style={{zIndex:99999, display:'flex', flexDirection:'row', alignItems:'center'}}>
    //                     <FaRegComment size={22} color={'#02F9A7'} onClick={()=>{navigate(`/credential/${credential.id}`)}}/>
    //                     {<Typography style={{padding:'0px 10px', fontSize:'21px'}}>{credential.comments ? credential.comments.length : 0}</Typography>}
    //                     {/* <BiDownArrow onClick={setLike}/> */}
    //                 </Box> 
    //                 : 
    //                 null}
    //                 {/* <Typography style={{fontSize:'21px'}} color="white">ETH{props.credential.minPrice}</Typography> */}
    //             </Box>
    //             {/* <Box style={{ height:'100%', width:'20%', borderRadius:'30px', display:'flex', alignItems:'center', justifyContent:'center'}}>
    //                 <img src="https://i1.wp.com/slotshurra.com/wp-content/uploads/2021/08/Leonardo-Da-Vinci-Slot-Game-Symbol-03-1.jpg?resize=564%2C500&ssl=1" style={{objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>
    //             </Box> */}
    //         </Box>
    //     </Grid>
    // )
    return(
        <Grid item key ={props.key} className="feedCard" style={{width:'80%', margin:'0px 20px 20px 20px', padding:'20px', position:'relative', backgroundColor:'#CDCDCD', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <Box component="div" className="Right" style={{display:'flex'}}>
                <Box component="div" className="PostAssets">
                    {credential && imageUrl ? <img onClick={()=>{navigate(`/credential/${credential.id}`)}} style={{height:'100%', width:'400px', borderRadius:'20px',}} src={imageUrl} alt="token"/> : <Box component="div" style={{backgroundColor:'#332E2E',objectFit:'cover', width:'250px', height:'250px', borderRadius:'20px'}}></Box>}
                </Box>
            </Box>
            <Box component="div" className='Left' style={{width:'100%', height:'100%'}}>
                <Box component="div" className='UserInfo' style={{display:'flex', padding:'20px', flexDirection:'row', alignItems:'center', position:'absolute', top:0, left:0}}>
                    {credentialOwner?<img src={credentialOwner.profileImageUrl ? credentialOwner.profileImageUrl:''} style={{backgroundColor:'pink',objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>:
                    <Box component="div" style={{backgroundColor:'#E46A6A',objectFit:'cover', width:'40px', height:'40px', margin:'10px', borderRadius:'50%'}}></Box>}
                    {/* {credentialOwner?<Typography style={{color:'black', padding:'0px 10px'}}>@{credentialOwner.username}</Typography>:<Typography style={{color:'black', padding:'0px 10px'}}>@{credential.owner}</Typography>} */}
                </Box>
                <Box onClick={()=>{navigate(`/credential/${credential.id}`)}} component="div" className="PostInfo" style={{width:'100%',height:'100%',display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                    <Typography color="black">{props.credential.name} #{props.credential.token_id}</Typography>
                    {credential?<Typography style={{color:'black'}}>{credential.caption}</Typography>:null}
                </Box>
                <Box component="div" className="PostActions" style={{display:'flex', flexDirection:'row', position:'absolute', bottom:0, right:0, padding:'20px'}}>
                    {credential? 
                    <Box component="div" style={{zIndex:99999, display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <BiUpArrow size={22} color={isLiked ? '#02F9A7':'red'} onClick={setLike}/>
                        {<Typography style={{padding:'0px 10px', fontSize:'21px', color:'black'}}>{credential.likes ? credential.likes.length : 0}</Typography>}
                    </Box> 
                    : 
                    null}
                    {credential? 
                    <Box component="div" style={{zIndex:99999, display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <FaRegComment size={22} color={'#02F9A7'} onClick={()=>{navigate(`/credential/${credential.id}`)}}/>
                        {<Typography style={{padding:'0px 10px', fontSize:'21px', color:'black'}}>{credential.comments ? credential.comments.length : 0}</Typography>}
                    </Box> 
                    : 
                    null}
                </Box>
            </Box>
            
        </Grid>
    )
}

export default FeedCard;