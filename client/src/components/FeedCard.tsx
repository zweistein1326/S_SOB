import { Box, Button, Grid, Icon, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BiUpArrow } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { favorite, like } from '../functions/axios';
import {FaRegComment} from 'react-icons/fa';
import styles from 'FeedCard.module.css';

const FeedCard = (props:any) => {

    const [imageUrl,setImageUrl] = useState<any>('');
    const [nft,setNFT]= useState<any>(props.nft);
    const [nftOwner, setOwner] = useState<any>(null);
    const allUsers = useSelector((state:any)=>state.auth.allUsers);
    const user = useSelector((state:any)=>state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLiked, setLiked] = useState(false);
 
     useEffect(()=>{
         console.log(nft);
        if(nft){
            if(nft.owner){
                const owner = allUsers.find((user:any)=>user.id.toLowerCase() === nft.owner.toLowerCase())
                setOwner(owner);
            }
            if(nft.likes){
                if(nft.likes.find((like:string)=>like.toLowerCase()===user.id.toLowerCase())){
                    setLiked(true);
                }
                else{
                    setLiked(false);
                }
            }
        if(nft.image.split('://')[0]=="ipfs"){
            if (nft.image.split('://')[0].split('/')[0] === "ipfs") {
                setImageUrl(`https://gateway.ipfs.io/${nft.image.split('://')[1]}`);
            }
            else {
                    setImageUrl(`https://gateway.ipfs.io/ipfs/${nft.image.split('://')[1]}`);
            }
        }
        else{
            setImageUrl(nft.image);
        }
        if(nft.gif){
            if(nft.gif.split('://')[0]=="ipfs"){
                setImageUrl(`https://gateway.ipfs.io/ipfs/${nft.gif.split('://')[1]}`);
            }
            else{
                setImageUrl(nft.gif);
            }
        }
        }
    },[props.nftId,nft])

    const setLike = async() => {
        setLiked(!isLiked);
        const newnft:any = await dispatch(like(nft.id));
        setNFT(newnft.data);
    }

    // return(
    //     <Grid item  key={props.key} style={{margin:'2rem 0', height:'60vh', minWidth:'30vw', border:'2px solid white',position:'relative', borderRadius:'20px', backgroundColor:'#EEEEEE', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
    //         {props.nft ? <img onClick={()=>{navigate(`/nft/${nft.id}`)}} style={{height:'100%', width:'100%', borderRadius:'20px'}} src={imageUrl} alt="token"/> : null}
    //         {nftOwner ? <Box onClick={()=>{navigate(`/nft/${nft.id}`)}} style={{position:'absolute', bottom:0, left:0, height:'20%', width:'20%', display:'flex', alignItems:'center', justifyContent:'center', zIndex:'99999'}}>
    //             <img src={nftOwner.profileImageUrl ? nftOwner.profileImageUrl:''} style={{backgroundColor:'pink',objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>
    //         </Box> : 
    //         <Box onClick={()=>{navigate(`/nft/${nft.id}`)}} style={{position:'absolute', bottom:0, left:0, height:'20%', width:'20%', display:'flex', alignItems:'center', justifyContent:'center', zIndex:'99999'}}>
    //             <Box style={{backgroundColor:'pink',objectFit:'cover', width:'50%', height:'50%', borderRadius:'50%'}}>
    //             </Box>
    //         </Box>}
    //         <Box style={{backgroundColor:'rgba(0,0,0,0.6)', borderBottomLeftRadius:'20px',borderBottomRightRadius:'20px', height:'20%', width:'100%', position:'absolute', bottom:0,  display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
    //         {/* <Typography color="black">{props.nft.name}</Typography> */}
    //         {/* <Typography>NFT: opensea.io//{props.nft.contract_address}/{props.nft.token_id}</Typography> */}
    //             <Box style={{width:'80%', display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
    //                 <Box>
    //                     <Typography color="white">{props.nft.name} #{props.nft.token_id}</Typography>
    //                     <Typography color="white">{props.nft.caption}</Typography>
    //                 </Box>
    //                 {nft? 
    //                 <Box style={{zIndex:99999, display:'flex', flexDirection:'row', alignItems:'center'}}>
    //                     <BiUpArrow size={22} color={isLiked ? '#02F9A7':'red'} onClick={setLike}/>
    //                     {<Typography style={{padding:'0px 10px', fontSize:'21px'}}>{nft.likes ? nft.likes.length : 0}</Typography>}
    //                     {/* <BiDownArrow onClick={setLike}/> */}
    //                 </Box> 
    //                 : 
    //                 null}
    //                 {nft? 
    //                 <Box style={{zIndex:99999, display:'flex', flexDirection:'row', alignItems:'center'}}>
    //                     <FaRegComment size={22} color={'#02F9A7'} onClick={()=>{navigate(`/nft/${nft.id}`)}}/>
    //                     {<Typography style={{padding:'0px 10px', fontSize:'21px'}}>{nft.comments ? nft.comments.length : 0}</Typography>}
    //                     {/* <BiDownArrow onClick={setLike}/> */}
    //                 </Box> 
    //                 : 
    //                 null}
    //                 {/* <Typography style={{fontSize:'21px'}} color="white">ETH{props.nft.minPrice}</Typography> */}
    //             </Box>
    //             {/* <Box style={{ height:'100%', width:'20%', borderRadius:'30px', display:'flex', alignItems:'center', justifyContent:'center'}}>
    //                 <img src="https://i1.wp.com/slotshurra.com/wp-content/uploads/2021/08/Leonardo-Da-Vinci-Slot-Game-Symbol-03-1.jpg?resize=564%2C500&ssl=1" style={{objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>
    //             </Box> */}
    //         </Box>
    //     </Grid>
    // )
    return(
        <Grid item key ={props.key} className="feedCard" style={{margin:'0px 20px 50px 20px',  position:'relative', backgroundColor:'#FFFFFF', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', borderRadius:'20px', border: '2px solid black'}}>
            <Box component="div" className="Right" style={{display:'flex',width:'100%', backgroundColor:'transparent', marginBottom:'0px'}}>
                <Box component="div" className="PostAssets" style={{width:'100%' }}>
                    {nft && imageUrl ? <img onClick={()=>{navigate(`/credential/${nft.id}`)}} style={{height:'100%', width:'500px',objectFit:'cover', borderRadius:'20px', borderBottomLeftRadius:'0px',borderBottomRightRadius:'0px'}} src={imageUrl} alt="token"/> : <Box component="div" style={{backgroundColor:'#332E2E',objectFit:'contain', width:'100%', height:'100%', borderRadius:'20px'}}></Box>}
                </Box>
            </Box>
            <Box component="div" className='Left' style={{width:'100%', flex:1, padding:'10px 0px'}}>
                <Box component="div" className='UserInfo' style={{display:'flex', padding:'10px 10px', flexDirection:'row', alignItems:'center'}} onClick={()=>{navigate(`/${nftOwner}`)}}>
                    {nftOwner ? <img src={nftOwner.profileImageUrl ? nftOwner.profileImageUrl:''} style={{backgroundColor:'pink',objectFit:'cover', width:'50%', height:'50%'}} className = "cardImage"/>:
                    <Box component="div" style={{backgroundColor:'#E46A6A',objectFit:'cover', width:'40px', height:'40px', borderRadius:'50%'}}></Box>}
                    {nftOwner ? <Typography style={{color:'black', padding:'0px 10px'}}>@{nftOwner.id}</Typography>:<Typography style={{color:'black', padding:'0px 10px'}}>@{nft.owner}</Typography>}
                </Box>
                <Box onClick={()=>{navigate(`/credential/${nft.id}`)}} component="div" className="PostInfo" style={{flex:1, padding:'10px 10px', display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                    {/* <Typography color="black">{props.nft.name} #{props.nft.token_id}</Typography> */}
                    <Typography style={{color:'black', fontWeight:'bold', padding:'0px 10px', fontSize:'20px'}}>{nft.name} #{nft.token_id}</Typography>
                    <Box component="div" className="PostActions" style={{display:'flex', flexDirection:'row', padding:'0px 10px'}}>
                        {nft? 
                            <Box component="div" style={{zIndex:99999, display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <BiUpArrow size={18} color={isLiked ? '#02F9A7':'red'} onClick={setLike}/>
                                {<Typography style={{padding:'0px 10px', fontSize:'21px', color:'black'}}>{nft.likes ? nft.likes.length : 0}</Typography>}
                            </Box> 
                        : 
                        null}
                        {nft? 
                            <Box component="div" style={{zIndex:99999, display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <FaRegComment size={18} color={'#02F9A7'} onClick={()=>{navigate(`/nft/${nft.id}`)}}/>
                                {<Typography style={{padding:'0px 10px', fontSize:'21px', color:'black'}}>{nft.comments ? nft.comments.length : 0}</Typography>}
                            </Box> 
                        : 
                        null}
                    </Box>
                    {/* <Typography style={{color:'black', padding:'0px 10px'}}>{nft.description}</Typography> */}
                    {/* <Typography style={{color:'black', padding:'0px 10px'}}>{nft.price} MATIC</Typography> */}
                </Box>
            </Box>
             {/* <Box component="div" style={{width:'100%', borderBottomRightRadius:'20px', borderBottomLeftRadius:'20px'}}>
                <Button style={{width:'100%', padding:'20px', borderBottomRightRadius:'20px', borderBottomLeftRadius:'20px', backgroundColor:'black', color:'orange'}} onClick={()=>{props.buyNft(nft)}}>
                    Buy
                </Button>
            </Box> */}
        </Grid>
    )
}

export default FeedCard;