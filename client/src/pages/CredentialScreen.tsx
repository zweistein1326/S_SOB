import { Box, Button, Grid, Icon, Input, MenuItem, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { favorite, like, comment as postComment, changePrivacy, submitBid, submitMinPrice, updateUser } from '../functions/axios';
import CommentTile from '../components/CommentTile';
import {BiDownArrow, BiUpArrow} from 'react-icons/bi';
import Header from '../components/Header';

const NFTScreen = (props:any) => {

    const [credential,setCredential]= useState<any>(null);
    const [imageUrl,setImageUrl]= useState<any>(null);
    const [loading,setLoading]= useState<any>(false);
    const {credentialId} = useParams();
    const credentials = useSelector((state:any)=>state.credentials)
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const favoriteIds = useSelector((state:any)=> state.auth.favorite);
    const user = useSelector((state:any)=> state.auth.user);
    const allUsers = useSelector((state:any)=> state.auth.allUsers);
    const dispatch = useDispatch();
    const [isLiked, setLiked] = useState(false);
    const [comment,setComment] = useState<string>('');
    const [isEdit, setIsEdit]= useState<boolean>(false);
    const [isPrivate, setPrivacy]= useState<number>(0);
    const [bidAmount, setBidAmount]= useState<number>(0);
    const [minPrice, setMinPrice]= useState<number>(0);
    const [credentialOwner, setCredentialOwner] = useState<any>(null);

    const setFavorite = () => {
        setIsFavorite(!isFavorite);
        dispatch(favorite(credential.id));
    }

    useEffect(()=>{
        setLoading(true);
        const cred = credentials.get(credentialId);
        if(user.id.toLowerCase()=== user.id.toLowerCase()){
            setIsEdit(true);
        }
        setPrivacy(cred.private?1:0);
        setMinPrice(cred.minPrice);
        setCredential(cred);
        // const owner = allUsers.get(cred.owner);
        // setCredentialOwner(owner);
        console.log(favoriteIds);
        if (!!favoriteIds && credential){
            if(favoriteIds.find((id:string)=>id.toLowerCase()==credential.id.toLowerCase())){
                console.log(true);
                setIsFavorite(true);
            }
        }
        if(cred.likes){
            if(cred.likes.find((like:string)=>like.toLowerCase()===user.id.toLowerCase())){
                setLiked(true);
            }
            else{
                setLiked(false);
            }
        }
        if(cred.image.split('://')[0]=="ipfs"){
            setImageUrl(`https://gateway.ipfs.io/ipfs/${cred.image.split('://')[1]}`);
        }
        else{
            setImageUrl(cred.image);
        }
        setLoading(false);
    },[
        credentialId, credentials
    ]);

    const setLike = async() => {
        setLiked(!isLiked);
        const newCredential:any = await dispatch(like(credential.id));
        setCredential(newCredential.data);
    }

    const submitComment = async() => {
        const newCredential:any = await dispatch(postComment(credential.id,comment));
        setComment('');
        setCredential(newCredential.data);
    }

    const handlePrivacyChange = async(event:any)=>{
        setPrivacy(event.target.value)
        const newCredential: any = await dispatch(changePrivacy(credential.id,event.target.value));
        setCredential(newCredential);
    }

    const submitNewBid = async() => {
        dispatch(submitBid(credential.id, bidAmount));
    }

    const submitNewMinPrice = async () => {
        dispatch(submitMinPrice(credential.id, minPrice))
    }

    return(
        <Box component="div" style={{backgroundColor:'#111111', height:'100vh', color:'white',padding:'0px 20px', maxHeight:'100vh', display:'flex', flexDirection:'column', overflowY:'scroll'}}>
            <Header/>
            {credential ?
                    <Box component="div" className="tokenInfo" style={{display:'flex', flexDirection:'row', position:'relative', padding:'20px 0px', margin:'auto', alignItems:'center', justifyContent:'center', width:'80vw'}}>
                        <Box component="div" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <img style={{height:'450px', width:'450px', borderRadius:'30px'}} src={imageUrl} alt="token"/> 
                        </Box>
                        <Box component="div" style={{width:'40vw', display:'flex', flexDirection:'column', alignItems:'center', marginLeft:'2rem'}}>
                            <Box component="div" style={{display:'flex', flexDirection:'row', borderRadius:'10px', alignItems:'center'}}>
                                <Button style={{border:'1px solid white', margin:'10px', borderRadius:'10px', padding:'10px'}} onClick = {()=>{}}><a target="_blank" href={`https://opensea.io/assets/${credential.contract_address}/${credential.token_id}`} style={{textDecoration:'none', color:'white'}}>View on OpenSea</a></Button>
                                <Button onClick = {()=>{}} style={{border:'1px solid white', margin:'10px', borderRadius:'10px', padding:'10px'}}><a target="_blank" href={`https://etherscan.io/address/${credential.contract_address}`} style={{textDecoration:'none', color:'white'}}>View on EtherScan</a></Button>
                                <Box component="div" onClick = {setFavorite} style={{display:'flex', flexDirection:'row', borderRadius:'10px', border:'1px solid white', alignItems:'center', padding:'10px 10px', margin:'5px'}}>
                                    {isFavorite? <FavoriteIcon style={{color:'red'}} />: <FavoriteIcon style={{color:'grey'}}/>}
                                    <Typography style={{color:'white'}}>{isFavorite?`Add to Favorites`:`Add to Favorites`}</Typography>
                                </Box>
                                {credential.owner===user.id ? <Button onClick = {()=>{
                                    dispatch(updateUser({id:user.id, profileImageUrl: imageUrl}))
                                }} style={{border:'1px solid white', margin:'10px', borderRadius:'10px', padding:'10px', color:'white'}}>Use as profile image</Button>
                                :
                                null}
                            </Box>
                            {credential.name ? <Typography style={{fontSize:'24px', fontWeight:'bold', color:'white', padding:'10px', textAlign:'center'}} color="black">Collection: {credential.name}</Typography> : null}
                            {credential.token_id ? <Typography style={{fontSize:'24px', fontWeight:'500', color:'white', padding:'10px', textAlign:'center'}} color="black">Token: #{credential.token_id}</Typography> : null}
                            <Typography style={{fontSize:'20px', fontWeight:'bold', color:'white', width:'100%', textAlign:'center', padding:'10px'}}>Attributes</Typography>
                            <Grid container columns={3} style={{height:'100%', margin:'0px 20px', borderRadius:'20px',padding:'1rem', justifyContent:'center', alignItems:'center', overflowY:'scroll', backgroundColor:'black'}}>
                                {credential.attributes?credential.attributes.map(({trait_type,value}:any)=>{return(
                                    <Grid item style={{border:'1px solid #000000', backgroundColor:'#E46A6A', padding:'0.3rem', minWidth:'10rem', margin:'0.5rem', textAlign:'center'}}>
                                        <Typography style={{fontSize:'18px', fontWeight:'bold', color:'#FFFFFF'}}>{trait_type}</Typography>
                                        <Typography style={{fontSize:'14px', fontWeight:'500', color:'#FFFFFF'}}>{value}</Typography>
                                    </Grid>
                                )}):<Grid item style={{border:'1px solid #000000', backgroundColor:'#E46A6A', padding:'0.3rem', minWidth:'10rem', margin:'0.5rem', textAlign:'center'}}>
                                        <Typography style={{fontSize:'18px', fontWeight:'bold', color:'#FFFFFF'}}>Attributes not available</Typography>
                                    </Grid>}
                            </Grid>
                        </Box>
                        {/* <Typography>NFT: opensea.io//{props.credential.contract_address}/{props.credential.token_id}</Typography> */}
                    </Box>
                : null}
            {credential?
            <Box component="div" style={{display:'flex',position:'relative', alignItems:'center', justifyContent:'space-between', backgroundColor:'#EEEEEE', margin:'20px 40px 40px 40px'}}>
                <Box component="div" className='UserInfo' style={{display:'flex', padding:'20px', flexDirection:'row', alignItems:'center', justifyContent:'space-between', position:'absolute', top:0, left:0, width:'50%'}}>
                    <Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center', position:'absolute', top:0, left:0, padding:'20px'}}>
                            {credentialOwner?<img src={credentialOwner.profileImageUrl ? credentialOwner.profileImageUrl:''} style={{backgroundColor:'pink',objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>:
                            <Box component="div" style={{backgroundColor:'#E46A6A',objectFit:'cover', width:'50px', height:'50px', borderRadius:'50%'}}></Box>}
                            {credentialOwner?<Typography style={{color:'black', padding:'0px 10px'}}>@{credentialOwner.username}</Typography>:<Typography style={{color:'black', padding:'0px 10px'}}>@{credential.owner}</Typography>}
                            {/* <Typography style={{color:'black'}}>{credential.iat}</Typography> */}
                    </Box>
                </Box>
                <Box component="div" style={{flex:1}}>
                    <Box component="div" style={{padding:'90px 40px 10px 40px', flex:1}}>
                        {credential.caption?<Typography style={{color:'black', fontSize:'24px', fontWeight:'bold'}}>{credential.caption}</Typography>:null}
                    </Box>
                    <Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center', padding:'0px 40px', cursor:'pointer'}} onClick={setLike}>
                        <BiUpArrow color={isLiked ? 'darkGreen':'red'}/>
                        <Typography style={{color:(isLiked?'darkGreen':'red')}}>Like</Typography>
                    </Box>
                    <Box component="div" style={{padding:'0px 40px', margin:'10px 0px'}}>
                        <Typography style={{fontSize:'24px', color:'black'}}>Comments</Typography>
                        {credential ?(credential.comments ? credential.comments.map((comment:any)=>{return (<CommentTile comment={comment}/>)}) : null):null}
                        <Box component="div" style={{width:'100%', display:'flex', flexDirection:'row', padding:'5px'}}>
                            {user.profileImageUrl? <img src={user.profileImageUrl || ''} style={{height:'40px', width:'40px', borderRadius:'50%'}}/> : null }
                            <Box component="div" style={{flex:1, padding:'0px 10px'}}>
                                <Input style={{width:'100%'}} name="comment" value={comment} onChange={(event:any)=>{setComment(event.target.value)}} placeholder="Add Comment" id="comment"/>
                            </Box>
                            <Button onClick = {submitComment}>Submit</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>:null}
        </Box>
    );
}

export default NFTScreen;