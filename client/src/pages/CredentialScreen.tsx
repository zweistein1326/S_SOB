import { Box, Button, Grid, Icon, Input, MenuItem, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { favorite, like, comment as postComment, changePrivacy, submitBid, submitMinPrice } from '../functions/axios';
import CommentTile from '../components/CommentTile';
import {BiDownArrow, BiUpArrow} from 'react-icons/bi';

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
    const dispatch = useDispatch();
    const [isLiked, setLiked] = useState(false);
    const [comment,setComment] = useState<string>('');
    const [isEdit, setIsEdit]= useState<boolean>(false);
    const [isPrivate, setPrivacy]= useState<number>(0);
    const [bidAmount, setBidAmount]= useState<number>(0);
    const [minPrice, setMinPrice]= useState<number>(0);

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
        if (!!favoriteIds && credential){
            if(favoriteIds.find((id:string)=>id.toLowerCase()==credential.id.toLowerCase())){
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
        <Box>
            <Box style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh'}}>
                {!loading && credential?
                <Box style={{margin:'40px', textAlign:'center'}}>
                    {/* <Box style={{ height:'100%', width:'30%', borderRadius:'30px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <img src="https://i1.wp.com/slotshurra.com/wp-content/uploads/2021/08/Leonardo-Da-Vinci-Slot-Game-Symbol-03-1.jpg?resize=564%2C500&ssl=1" style={{objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>
                    </Box> */}
                    {credential.name ? <Typography style={{fontSize:'24px', fontWeight:'bold'}} color="black">Collection: {credential.name}</Typography> : null}
                    {credential.name ? <Typography style={{fontSize:'24px', fontWeight:'bold'}} color="black">Token: #{credential.token_id}</Typography> : null}
                    <a target="_blank" href={`https://etherscan.io/address/${credential.contract_address}`}>View on Etherscan</a>
                    <a href={credential.external_link}>{credential.external_link}</a>
                            {isFavorite? <FavoriteIcon style={{color:'red', padding:'10px'}} onClick = {setFavorite}/>: <FavoriteIcon style={{color:'grey',padding:'10px'}} onClick = {setFavorite}/>}
                    {/* <Typography>Token ID: {credential.token_id}</Typography> */}
                    <Typography onClick={()=>{navigate(`/${credential.owner}`)}}>Owner: {credential.owner}</Typography> 
                    <Box style={{ backgroundColor:'rgba(2, 249, 167,0)', borderRadius:'20px', padding:'1rem'}}>
                        {/* <Typography style={{fontSize:'24px', fontWeight:'bold', color:'black'}}>Attributes</Typography>
                        <Grid container columns={3} style={{width:'40vw', height:'30vh', justifyContent:'center', alignItems:'center', overflowY:'scroll'}}>
                        {credential.attributes.map(({trait_type,value}:any)=>{return(
                            <Grid item style={{border:'1px solid #02F9A7', backgroundColor:'#000000', padding:'0.2rem', minWidth:'10rem', margin:'0.4rem'}}>
                                <Typography style={{fontSize:'18px', fontWeight:'bold', color:'#FFFFFF'}}>{trait_type}</Typography>
                                <Typography style={{fontSize:'14px', fontWeight:'500', color:'#FFFFFF'}}>{value}</Typography>
                            </Grid>
                        )})}
                        </Grid> */}
                        {credential? 
                            <Box>
                                <BiUpArrow color={isLiked ? 'red':'black'} onClick={setLike}/>
                                {<Typography style={{fontSize:'24px'}}>{credential.likes ? credential.likes.length : 0}</Typography>}
                                {/* <BiDownArrow onClick={setLike}/> */}
                            </Box> 
                            : 
                        null}
                        <Box style={{padding:'0px 40px', margin:'20px 0px'}}>
                            <Typography style={{fontSize:'24px'}}>Comments</Typography>
                            {credential?(credential.comments ? credential.comments.map((comment:any)=>{return (<CommentTile comment={comment}/>)}) : null):null}
                            <Input name="comment" value={comment} onChange={(event)=>{setComment(event.target.value)}} placeholder="Comment" id="comment"/>
                            <Button onClick = {submitComment}>Submit</Button>
                        </Box>
                        {isEdit?<Box>
                            <Select
                                style={{backgroundColor:'#EEEEEE', margin:10, width:'90%'}}
                                required
                                fullWidth
                                value={isPrivate}
                                name="token_id"
                                labelId="Token Id"
                                type="text"
                                id="token_id"
                                onChange = {handlePrivacyChange}
                            >
                                <MenuItem value={0}>Public</MenuItem>
                                <MenuItem value={1}>Private</MenuItem>
                            </Select>
                        </Box>:
                        null}
                        {!isEdit?<Box style={{padding:'0px 40px', margin:'20px 0px'}}>
                            <Typography style={{fontSize:'24px'}}>Bid</Typography>
                            <Input name="bid" value={bidAmount} onChange={(event)=>{setBidAmount(parseFloat(event.target.value))}} type="number" placeholder="Bid" id="bid_amount"/>
                            <Button onClick = {submitNewBid}>Submit Bid</Button>
                        </Box>:<Box style={{padding:'0px 40px', margin:'20px 0px'}}>
                            <Typography style={{fontSize:'24px'}}>Minimum Price</Typography>
                            <Input name="min_price" value={minPrice} onChange={(event)=>{setMinPrice(parseFloat(event.target.value))}} type="number" placeholder="Minimum Price" id="minPrice"/>
                            <Button onClick = {submitNewMinPrice}>Set</Button>
                        </Box>}
                    </Box>
                </Box>:null}
                {/* <Typography>NFT: opensea.io//{props.credential.contract_address}/{props.credential.token_id}</Typography> */}
                {credential ? <img style={{height:'600px', width:'600px', borderRadius:'30px'}} src={imageUrl} alt="token"/> : null}
            </Box>
        </Box>
    );
}

export default NFTScreen;