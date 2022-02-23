import { Box, Button, Grid, Icon, Input, MenuItem, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { favorite, like, comment as postComment, changePrivacy, submitBid, submitMinPrice, updateUser, followUser } from '../functions/axios';
import CommentTile from '../components/CommentTile';
import {BiDownArrow, BiUpArrow} from 'react-icons/bi';
import Header from '../components/Header';
import Modal from 'react-modal';
import styles from './CredentialScreen.module.css';
import {FaRegComment} from 'react-icons/fa';
import {MentionsInput, Mention, MentionItem } from 'react-mentions';
import mentionsInputStyles from './mentionsInputStyles';

const NFTScreen = (state:any) => {

    const [credential,setCredential]= useState<any>(null);
    const [imageUrl,setImageUrl]= useState<any>(null);
    const [mentions,setMentions]= useState<any>([]);
    const [usernames,setUsernames]= useState<any>([]);
    const [loading,setLoading]= useState<any>(true);
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
        let usernames = Array.from(allUsers.values()).map((user:any)=>{
            if(!!user.username){
                return {id:user.id, display:user.username}
            }
        });
        setUsernames(usernames);

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
            if (cred.image.split('://')[1].split('/')[0] === "ipfs") {
                setImageUrl(`https://gateway.ipfs.io/${cred.image.split('://')[1]}`);
            }
            else {
                    setImageUrl(`https://gateway.ipfs.io/ipfs/${cred.image.split('://')[1]}`);
            }
        }
            else{
                setImageUrl(cred.image);
            }
        }        
        setLoading(false);
    },[
        credentialId, credentials, user
    ]);

    const setLike = async() => {
        setLiked(!isLiked);
        const newCredential:any = await dispatch(like(credential.id));
        setCredential(newCredential.data);
    }

    const submitComment = async() => {
        let newCredential:any;
        console.log(mentions);
        if(credentialOwner){
            newCredential = await dispatch(postComment(credential.id,credentialOwner.id, comment, mentions));
        }
        else{
            newCredential = await dispatch(postComment(credential.id,null, comment, mentions));
        }
        setMentions([]);
        setComment('');
        setCredential(newCredential.data);
    }

    const handleComment = (commentText:string) => {
        setComment(commentText);
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
        user && !loading ? <Box component="div" className={styles.container}>
            <Header/>
            {/* <Modal
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
            </Modal> */}
            <Box component="div" style={{display:'flex', flexDirection:'row', justifyContent:'center', width:'100%', overflowY:'scroll'}}>
            {credential ?
            <Box component="div" style={{width:'70%'}}>
                    <Box component="div" className='UserInfo' style={{display:'flex', padding:'10px 20px', flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:'100%'}}>
                        <Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center', padding:'10px'}}>
                                {credentialOwner?<img src={credentialOwner.profileImageUrl ? credentialOwner.profileImageUrl:''} style={{backgroundColor:'#E46A6A',objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>:
                                <Box component="div" style={{backgroundColor:'#E46A6A',objectFit:'cover', width:'50px', height:'50px', borderRadius:'50%'}}></Box>}
                                {credentialOwner?<Typography style={{color:'black', padding:'0px 10px'}}>@{credentialOwner.username}</Typography>:<Typography style={{color:'black', padding:'0px 10px'}}>@{credential.owner}</Typography>}
                                {/* <Typography style={{color:'black'}} >{credential.iat}</Typography> */}
                        </Box>
                         <Box component="div" className={styles.actionContainer}>
                                <Button className={styles.actionButton} style={{border: '1px solid black',margin: '10px' ,borderRadius:'10px',padding:'10px'}}><a target="_blank"  href={`https://opensea.io/assets/${credential.contract_address}/${credential.token_id}`}>OpenSea</a></Button>
                                <Button style={{border: '1px solid black',margin: '10px' ,borderRadius:'10px', padding:'10px '}} className={styles.actionButton}><a target="_blank" href={`https://etherscan.io/address/${credential.contract_address}`}>EtherScan</a></Button>
                                <Button onClick = {setFavorite} className={styles.actionButton} style={{display:'flex', flexDirection:'row'}}>
                                    {/* <Typography style={{color:'black'}}>{isFavorite?`Add to Favorites`:`Add to Favorites`}</Typography> */}
                                </Button>
                            </Box>
                    </Box>
                    <Box component="div" className={styles.tokenInfo}>
                        <Box component="div">
                            <Box component="div" className={styles.imgContainer}>
                                <img className={styles.credentialImg} src={imageUrl} alt="token"/> 
                            </Box>
                        </Box>
                       
                        <Box component="div" className={styles.infoContainer}>
                            {credential.name ? <Typography style={{fontSize:'24px', fontWeight:'bold', color:'black', padding:'10px', textAlign:'center'}} color="black">{credential.name} #{credential.token_id}  {isFavorite? <FavoriteIcon style={{color:'red'}} />: <FavoriteIcon style={{color:'grey'}}/>}</Typography> : null}
                            {credential.description ? <Typography style={{fontSize:'24px', fontWeight:'bold', color:'black', padding:'10px', textAlign:'center'}} color="black">{credential.description} </Typography> : null}
                            {/* {credential.token_id ? <Typography style={{fontSize:'24px', fontWeight:'500', color:'black', padding:'10px', textAlign:'center'}} color="black">Token: </Typography> : null} */}
                             <Grid container columns={3} style={{ margin:'0px 10px', borderRadius:'0px',padding:'0.2rem', justifyContent:'center', alignItems:'flex-start', overflowY:'scroll', backgroundColor:'black', marginTop:'10px'}}>
                                <Typography style={{fontSize:'20px', fontWeight:'bold', color:'white', width:'100%', textAlign:'center', padding:'10px'}}>Attributes</Typography>
                                {credential.attributes?credential.attributes.map(({trait_type,value}:any)=>{return(
                                    <Grid item style={{border:'1px solid #000000', backgroundColor:'#E46A6A', padding:'0.3rem', minWidth:'8rem', margin:'0.5rem', textAlign:'center'}}>
                                        <Typography style={{fontSize:'18px', fontWeight:'bold', color:'#000000', textTransform:'capitalize'}}>{trait_type}</Typography>
                                        <Typography style={{fontSize:'14px', fontWeight:'500', color:'#000000', textTransform:'capitalize'}}>{value}</Typography>
                                    </Grid>
                                )}):<Grid item style={{border:'1px solid #000000', backgroundColor:'#E46A6A', padding:'0.3rem', minWidth:'10rem', margin:'0.5rem', textAlign:'center'}}>
                                        <Typography style={{fontSize:'18px', fontWeight:'bold', color:'#000000'}}>Attributes not available</Typography>
                                    </Grid>}
                            </Grid>
                            <Box component="div" style={{display:'flex', flexDirection:'row',}}>
                                <Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center', padding:'20px', cursor:'pointer'}} onClick={setLike}>
                                    <BiUpArrow color={isLiked ? '#02F9A7':'red'}/>
                                    <Typography style={{padding:'0px 10px', color:isLiked ? '#02F9A7':'red'}}>Like</Typography>
                                </Box>
                                <Box component="div" style={{zIndex:99999, display:'flex', flexDirection:'row', alignItems:'center'}}>
                                    <FaRegComment size={18} color={'#02F9A7'} onClick={()=>{navigate(`/nft/${credential.id}`)}}/>
                                    {<Typography style={{padding:'0px 10px', color:'black'}}>{credential.comments ? credential.comments.length : 0}</Typography>}
                                </Box> 
                            </Box>
                            {/* <Button onClick={()=>{setModalIsOpen(true)}} style={{ backgroundColor:'#02F9A7', padding:'10px', color:'black', width:'100%', margin:'10px'}}>Purchase</Button> */}
                        </Box>
                        {/* <Typography>NFT: opensea.io//{props.credential.contract_address}/{props.credential.token_id}</Typography> */}
                    </Box>
                     {credential ?
                        <Box component="div" style={{display:'flex',position:'relative', alignItems:'center', justifyContent:'space-between', backgroundColor:'#FFFFFF', margin:'20px 40px 40px 40px'}}>
                            <Box component="div" style={{flex:1}}>
                                <Box component="div" style={{padding:'0px 40px', margin:'10px 0px'}}>
                                    <Typography style={{fontSize:'24px', color:'black'}}>Comments</Typography>
                                    {credential ?(credential.comments ? credential.comments.map((comment:any)=>{return (<CommentTile comment={comment}/>)}) : null):null}
                                    <Box component="div" style={{width:'100%', display:'flex', flexDirection:'row', padding:'5px'}}>
                                        {user.profileImageUrl? <img src={user.profileImageUrl} style={{height:'40px', width:'40px', borderRadius:'50%', backgroundColor:'#E46A6A', border:'2px solid #02F9A7'}}/> : <Box component="div" style={{backgroundColor:'#E46A6A',objectFit:'cover', width:'40px', height:'40px', margin:'10px', borderRadius:'50%'}}></Box> }
                                        <Box component="div" style={{flex:1, padding:'0px 10px'}}>
                                            <MentionsInput style={mentionsInputStyles} value={comment} onChange={(event:any,newValue:string,newPlainTextValue:string,newMentions:MentionItem[])=>{
                                                setComment(newPlainTextValue)
                                                if(newMentions.length>0){
                                                    setMentions(mentions.concat(newMentions));
                                                }              
                                            }} placeholder="Comment">
                                                <Mention displayTransform={(id,display) => `@${display}`} trigger="@" data={usernames} style={{backgroundColor: '#cee4e5'}}/>
                                            </MentionsInput>
                                        </Box>
                                        <Button onClick = {submitComment}>Submit</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>:null}
                </Box>
                : null}
                <Box component="div" style={{zIndex:'999999', height:'100vh', backgroundColor:'#333333', maxWidth:'20vw', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', padding:'0px 10px', overflowY:'scroll'}}>
                    <Typography style={{color:'white', fontSize:'20px', fontWeight:'bold', padding:'20px'}}>Recommended for you</Typography>
                    {/* <Typography style={{color:'white', fontSize:'14px', fontWeight:'bold',textAlign:'right', width:'100%', padding:'0px 20px'}}>View more</Typography> */}
                    { allUsers.map((recommendUser:any)=>{
                        return(
                        recommendUser.id!==user.id?<Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:'100%', margin:'10px',}}>
                            <Box component="div" style={{display:'flex', flexDirection:'row', flex:1, alignItems:'center'}} onClick ={()=>{navigate(`/${recommendUser.id}`)}}>
                                {recommendUser.profileImageUrl? <img src={recommendUser.profileImageUrl} style={{width:'50px', height:'50px',backgroundColor:'#E46A6A', borderRadius:'50%'}}/>:<Box component="div" style={{width:'50px', height:'50px', backgroundColor:'#E46A6A', borderRadius:'50%'}}></Box>}
                                <Typography style={{flex:1, paddingLeft:'10px'}}>{Array.from(recommendUser.username).map((letter:any, index:number)=>index<17 ? letter: (index<20?'.':null))}</Typography>
                                <Button onClick={()=>{dispatch(followUser(user.id,recommendUser.id))}}>+ Follow</Button>
                            </Box>
                        </Box>:null
                        )})
                        }
                </Box>
            </Box>
        </Box> : null
    );
}

export default NFTScreen;