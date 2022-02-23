import { Box, Button, Grid, Typography } from '@mui/material';
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
            if (credential.image.split('://')[1].split('/')[0] === "ipfs") {
                setImageUrl(`https://gateway.ipfs.io/${credential.image.split('://')[1]}`);
            }
            else {
                    setImageUrl(`https://gateway.ipfs.io/ipfs/${credential.image.split('://')[1]}`);
            }
        }
        else{
            setImageUrl(credential.image);
        }
        if(credential.gif){
            if(credential.image.split('://')[0]=="ipfs"){
                setImageUrl(`https://gateway.ipfs.io/ipfs/${credential.gif.split('://')[1]}`);
            }
            else{
                setImageUrl(credential.gif);
            }
        }
        }
    },[props.credentialId])

    const setLike = async() => {
        setLiked(!isLiked);
        const newCredential:any = await dispatch(like(credential.id));
        setCredential(newCredential.data);
    }

    if(credential && (1==1 || user.id===credential.owner)){
        return(
        <Grid item key={props.key} style={{height:'400px',width:'400px', margin:'1rem', position:'relative', backgroundColor:'#EEEEEE', borderRadius:'15px'}}>
            <Box component="div" style={{backgroundColor:'rgba(0,0,0,0.6)', height:'20%', width:'100%', position:'absolute',borderBottomRightRadius:'15px',borderBottomLeftRadius:'15px', bottom:0, display:'flex', alignItems:'center', justifyContent:'space-around'}}>
                <Box component="div" style={{width:'80%', display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                    {/* {user ? <Box onClick={()=>{navigate(`/credential/${credential.id}`)}} style={{position:'absolute', bottom:0, left:0, height:'20%', width:'20%', display:'flex', alignItems:'center', justifyContent:'center', zIndex:'99999'}}>
                        <img src={user.profileImageUrl ? user.profileImageUrl:''} style={{backgroundColor:'pink',objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>
                    </Box> : 
                    <Box onClick={()=>{navigate(`/credential/${credential.id}`)}} style={{position:'absolute', bottom:0, left:0, height:'20%', width:'20%', display:'flex', alignItems:'center', justifyContent:'center', zIndex:'99999'}}>
                        <Box style={{backgroundColor:'pink',objectFit:'cover', width:'50%', height:'50%', borderRadius:'50%'}}>
                        </Box>
                    </Box>} */}
                    <Typography color="white" style={{fontSize:'18px', fontWeight:'bold', textAlign:'center'}}>{credential.collection_name} #{credential.token_id}</Typography>
                    {/* <Button onClick={()=>{}}>Add To Collection</Button>
                    <Button onClick={()=>{}}>Share</Button> */}
                    {/* <Typography style={{fontSize:'21px'}} color="white">ETH{props.credential.minPrice}</Typography> */}
                </Box>
                {/* {credential.name?<Typography style={{flex:1}} color="white">{credential.name} #{credential.token_id}</Typography>:null} */}
                {/* {credential.minPrice?<Typography style={{flex:1}} color="white">{credential.minPrice}</Typography>:null} */}
            </Box>
            {/* <Typography>NFT: opensea.io//{props.credential.contract_address}/{props.credential.token_id}</Typography> */}
            {credential ? <img onClick ={()=>{navigate(`/credential/${credential.id}`)}} style={{height:'400px', width:'400px', borderRadius:'15px'}} src={imageUrl} alt="token"/> : null}
        </Grid>
    )
    }else{
        return<></>
    }

}

export default NFTCard;