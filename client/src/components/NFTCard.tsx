import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BiUpArrow } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { like } from '../functions/axios';
import './NFTCard.css';
import sortCredentials from '../redux/selectors/credentials';

interface Props{
    credentialId:string,
    key:number,
}

interface State{
    credentials:Map<string,any>;
}


const NFTCard = (props:Props) => {
    
    const navigate = useNavigate();
    const [imageUrl,setImageUrl] = useState('');
    const [credential, setCredential] = useState<any>(null);
    const credentials = useSelector((state:State)=> (state.credentials));
    const user = useSelector((state:any)=>state.auth.user);
     const [isLiked, setLiked] = useState(false);
     const dispatch = useDispatch();

    useEffect(()=>{
        const credential = credentials.get(props.credentialId);
        console.log(credential);
        if(credential){
            setCredential(credential);
            if(credential.likes){
                if(credential.likes.find((like:string)=>like.toLowerCase()===user.id.toLowerCase())){
                    setLiked(true);
                }
                else{
                    setLiked(false);
                }
            }
        if(credential.image.split('://')[0]=="ipfs"){
            setImageUrl(`https://gateway.ipfs.io/ipfs/${credential.image.split('://')[1]}`);
        }
        else{
            setImageUrl(credential.image);
        }
        }
    },[props.credentialId])

    const setLike = async() => {
        setLiked(!isLiked);
        const newCredential:any = await dispatch(like(credential.id));
        setCredential(newCredential.data);
    }

    if(credential && (!credential.private || user.id===credential.owner)){
        return(
        <Grid onClick ={()=>{navigate(`/credential/${credential.id}`)}} item key={props.key} style={{height:'350px',width:'350px', margin:'1rem', position:'relative', backgroundColor:'#EEEEEE', borderRadius:'50px'}}>
            <Box style={{backgroundColor:'rgba(0,0,0,0.6)', height:'20%', width:'100%', position:'absolute',borderRadius:'30px', bottom:0, display:'flex', alignItems:'center', justifyContent:'space-around'}}>
                <Box style={{width:'80%', display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                    {/* {user ? <Box onClick={()=>{navigate(`/credential/${credential.id}`)}} style={{position:'absolute', bottom:0, left:0, height:'20%', width:'20%', display:'flex', alignItems:'center', justifyContent:'center', zIndex:'99999'}}>
                        <img src={user.profileImageUrl ? user.profileImageUrl:''} style={{backgroundColor:'pink',objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>
                    </Box> : 
                    <Box onClick={()=>{navigate(`/credential/${credential.id}`)}} style={{position:'absolute', bottom:0, left:0, height:'20%', width:'20%', display:'flex', alignItems:'center', justifyContent:'center', zIndex:'99999'}}>
                        <Box style={{backgroundColor:'pink',objectFit:'cover', width:'50%', height:'50%', borderRadius:'50%'}}>
                        </Box>
                    </Box>} */}
                    <Typography color="white">{credential.name} #{credential.token_id}</Typography>
                    {credential? 
                    <Box style={{zIndex:99999, display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <BiUpArrow size={22} color={isLiked ? '#02F9A7':'red'} onClick={setLike}/>
                        {<Typography style={{padding:'0px 10px', fontSize:'21px'}}>{credential.likes ? credential.likes.length : 0}</Typography>}
                        {/* <BiDownArrow onClick={setLike}/> */}
                    </Box> 
                    : 
                    null}
                    {credential? 
                    <Box style={{zIndex:99999, display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <FaRegComment size={22} color={'#02F9A7'} onClick={()=>{navigate(`/credential/${credential.id}`)}}/>
                        {<Typography style={{padding:'0px 10px', fontSize:'21px'}}>{credential.comments ? credential.comments.length : 0}</Typography>}
                        {/* <BiDownArrow onClick={setLike}/> */}
                    </Box> 
                    : 
                    null}
                    {/* <Typography style={{fontSize:'21px'}} color="white">ETH{props.credential.minPrice}</Typography> */}
                </Box>
                {/* {credential.name?<Typography style={{flex:1}} color="white">{credential.name} #{credential.token_id}</Typography>:null} */}
                {/* {credential.minPrice?<Typography style={{flex:1}} color="white">{credential.minPrice}</Typography>:null} */}
            </Box>
            {/* <Typography>NFT: opensea.io//{props.credential.contract_address}/{props.credential.token_id}</Typography> */}
            {credential ? <img style={{height:'350px', width:'350px', borderRadius:'30px'}} src={imageUrl} alt="token"/> : null}
        </Grid>
    )
    }else{
        return<></>
    }

}

export default NFTCard;