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
import Modal from 'react-modal';
import styles from './CredentialScreen.module.css';

const NFTScreen = (state:any) => {

    const [credential,setCredential]= useState<any>(null);
    const [imageUrl,setImageUrl]= useState<any>(null);
    const [loading,setLoading]= useState<any>(false);
    const [isModalOpen,setModalIsOpen]= useState<boolean>(false);
    const {credentialId} = useParams();
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const dispatch = useDispatch();
    const [isLiked, setLiked] = useState(false);
    const [comment,setComment] = useState<string>('');
    const [isEdit, setIsEdit]= useState<boolean>(false);
    const [isPrivate, setPrivacy]= useState<number>(0);
    const [bidAmount, setBidAmount]= useState<number>(0);
    const [minPrice, setMinPrice]= useState<number>(0);
    const [credentialOwner, setCredentialOwner] = useState<any>(null);
    const allUsers = useSelector((state:any)=> state.auth.allUsers);
    const credentials = useSelector((state:any)=>state.credentials)
    const favoriteIds = useSelector((state:any)=> state.auth.favorite);
    const user = useSelector((state:any)=> state.auth.user);
    
    const setFavorite = () => {
        setIsFavorite(!isFavorite);
        dispatch(favorite(credential.id));
    }

    useEffect(()=>{
        setLoading(true);
        console.log(credentials);
        const cred = credentials.get(credentialId);
        setCredential(cred);
    
        if(user){
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
        }        
    },[
        credentialId, credentials, user
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

    const closeModal = ()=>{
        setModalIsOpen(false);
    }

    const afterOpenModal = () => {
        console.log('modal open')
    }

    return(
        user ? <Box component="div" className={styles.container}>
            <Header/>
            <Modal
            isOpen = {isModalOpen}
            onAfterOpen = {afterOpenModal}
            onRequestClose = {closeModal}
            contentLabel = "Example Label"
            style={{
                overlay:{
                    zIndex:9999,
                },
                content:{
                    backgroundColor:'#02F9A7'
                }
            }}
            >
                <Typography component="h2">Hello</Typography>
                <Button onClick={closeModal}>Close</Button>
                <Box component="div">I am a modal</Box>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
            {credential ?
            <Box component="div">
                    <Box component="div" className='UserInfo' style={{display:'flex', padding:'10px 20px', flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:'100%'}}>
                        <Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center', padding:'10px'}}>
                                {credentialOwner?<img src={credentialOwner.profileImageUrl ? credentialOwner.profileImageUrl:''} style={{backgroundColor:'pink',objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>:
                                <Box component="div" style={{backgroundColor:'#E46A6A',objectFit:'cover', width:'50px', height:'50px', borderRadius:'50%'}}></Box>}
                                {credentialOwner?<Typography style={{color:'black', padding:'0px 10px'}}>@{credentialOwner.username}</Typography>:<Typography style={{color:'black', padding:'0px 10px'}}>@{credential.owner}</Typography>}
                                {/* <Typography style={{color:'black'}} >{credential.iat}</Typography> */}
                        </Box>
                         <Box component="div" className={styles.actionContainer}>
                                <Button className={styles.actionButton} style={{border: '1px solid black',margin: '10px' ,borderRadius:'10px',padding:'10px '}}><a target="_blank" href={`https://opensea.io/assets/${credential.contract_address}/${credential.token_id}`}>View on OpenSea</a></Button>
                                <Button style={{border: '1px solid black',margin: '10px' ,borderRadius:'10px',padding:'10px '}} className={styles.actionButton}><a target="_blank" href={`https://etherscan.io/address/${credential.contract_address}`}>View on EtherScan</a></Button>
                                <Button onClick = {setFavorite} className={styles.actionButton} style={{display:'flex', flexDirection:'row'}}>
                                    {isFavorite? <FavoriteIcon style={{color:'red'}} />: <FavoriteIcon style={{color:'grey'}}/>}
                                    <Typography style={{color:'black'}}>{isFavorite?`Add to Favorites`:`Add to Favorites`}</Typography>
                                </Button>
                                {credential.owner===user.id ? <Button onClick = {()=>{
                                    dispatch(updateUser({id:user.id, profileImageUrl: imageUrl}))
                                }} style={{border:'1px solid black', margin:'10px', borderRadius:'10px', padding:'10px', color:'black'}}>Use as profile image</Button>
                                :
                                null}
                            </Box>
                    </Box>
                    <Box component="div" className={styles.tokenInfo}>
                        <Box component="div" className={styles.imgContainer}>
                            <img className={styles.credentialImg} src={imageUrl} alt="token"/> 
                        </Box>
                       
                        <Box component="div" className={styles.infoContainer}>
                            {credential.name ? <Typography style={{fontSize:'24px', fontWeight:'bold', color:'black', padding:'10px', textAlign:'center'}} color="black">{credential.name} #{credential.token_id}</Typography> : null}
                            {/* {credential.token_id ? <Typography style={{fontSize:'24px', fontWeight:'500', color:'black', padding:'10px', textAlign:'center'}} color="black">Token: </Typography> : null} */}
                            <Grid container columns={3} style={{height:'100%', margin:'0px 10px', borderRadius:'20px',padding:'1rem', justifyContent:'center', alignItems:'flex-start', overflowY:'scroll', backgroundColor:'black'}}>
                            <Typography style={{fontSize:'20px', fontWeight:'bold', color:'white', width:'100%', textAlign:'center', padding:'10px'}}>Attributes</Typography>
                                {credential.attributes?credential.attributes.map(({trait_type,value}:any)=>{return(
                                    <Grid item style={{border:'1px solid #000000', backgroundColor:'#E46A6A', padding:'0.3rem', minWidth:'10rem', margin:'0.5rem', textAlign:'center'}}>
                                        <Typography style={{fontSize:'18px', fontWeight:'bold', color:'#000000', textTransform:'capitalize'}}>{trait_type}</Typography>
                                        <Typography style={{fontSize:'14px', fontWeight:'500', color:'#000000', textTransform:'capitalize'}}>{value}</Typography>
                                    </Grid>
                                )}):<Grid item style={{border:'1px solid #000000', backgroundColor:'#E46A6A', padding:'0.3rem', minWidth:'10rem', margin:'0.5rem', textAlign:'center'}}>
                                        <Typography style={{fontSize:'18px', fontWeight:'bold', color:'#000000'}}>Attributes not available</Typography>
                                    </Grid>}
                            </Grid>
                            {/* <Button onClick={()=>{setModalIsOpen(true)}} style={{ backgroundColor:'#02F9A7', padding:'10px', color:'black', width:'100%', margin:'10px'}}>Purchase</Button> */}
                        </Box>
                        {/* <Typography>NFT: opensea.io//{props.credential.contract_address}/{props.credential.token_id}</Typography> */}
                    </Box>
                </Box>
                : null}
            {credential ?
            <Box component="div" style={{display:'flex',position:'relative', alignItems:'center', justifyContent:'space-between', backgroundColor:'#EEEEEE', margin:'20px 40px 40px 40px'}}>
                <Box component="div" style={{flex:1}}>
                    <Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center', padding:'0px 40px', cursor:'pointer'}} onClick={setLike}>
                        <BiUpArrow color={isLiked ? 'darkGreen':'red'}/>
                        <Typography style={{color:(isLiked?'darkGreen':'red')}}>Like</Typography>
                    </Box>
                    <Box component="div" style={{padding:'0px 40px', margin:'10px 0px'}}>
                        <Typography style={{fontSize:'24px', color:'black'}}>Comments</Typography>
                        {credential ?(credential.comments ? credential.comments.map((comment:any)=>{return (<CommentTile comment={comment}/>)}) : null):null}
                        <Box component="div" style={{width:'100%', display:'flex', flexDirection:'row', padding:'5px'}}>
                            {user.profileImageUrl? <img src={user.profileImageUrl} style={{height:'40px', width:'40px', borderRadius:'50%', backgroundColor:'#E46A6A'}}/> : <Box component="div" style={{backgroundColor:'#E46A6A',objectFit:'cover', width:'40px', height:'40px', margin:'10px', borderRadius:'50%'}}></Box> }
                            <Box component="div" style={{flex:1, padding:'0px 10px'}}>
                                <Input style={{width:'100%'}} name="comment" value={comment} onChange={(event:any)=>{setComment(event.target.value)}} placeholder="Add Comment" id="comment"/>
                            </Box>
                            <Button onClick = {submitComment}>Submit</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>:null}
        </Box> : null
    );
}

export default NFTScreen;