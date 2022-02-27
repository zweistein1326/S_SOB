import { Box,  Grid, Button, TextField, Typography, Input, Select, MenuItem, CircularProgress } from '@mui/material';
import { useEffect, useState, Suspense } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import Card from '../components/Card';
import CredentialTile from '../components/CredentialTile';
import Header from '../components/Header';
import NFTCard from '../components/NFTCard';
import { getCredentialById, getNFT, getUserById, followUser, createPost, updateCredential} from '../functions/axios';
import '../styles/Home.css'
import {SocialIcon} from 'react-social-icons';

declare var window:any;

const Home = (props:any) => {
  const navigate = useNavigate();
  const [activeUser,setActiveUser] = useState<any>({});
  const [activeCredentials,setActiveCredentials] = useState<any>([]);
  const [account, setAccount] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [isUserProfile, setIsUserProfile] = useState<boolean>(false);
  const [loading,setLoading]= useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  
  const user = useSelector((state:any)=>state.auth.user);
  const [loggedIn, setLoggedIn] = useState(
    user !==null ,
  );
  const followingIds = useSelector((state:any)=>state.auth.following);
  const [view, setView] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [privacy, setPrivacy] = useState(0);
  const [caption, setCaption] = useState<string>('');
  const [tokenData, setTokenData] = useState<any>(null);
  const [nfts, setNFTs] = useState<any>([]);
  const dispatch = useDispatch();  

  const loadNFTs = async(user:any) => {
    let activeCreds:any = [];
    if(user && user.credentials){
      console.log(user);
      if(activeCreds.length < user.credentials.length){
        await Promise.all(user.credentials).then(async(credentialIds:any)=>{
          await credentialIds.forEach(async(credentialId:string)=>{
          const credential:any = await dispatch(getCredentialById(credentialId));
          activeCreds.push(credential.credential);
          if(activeCreds.length===user.credentials.length){
            setActiveCredentials(activeCreds);
            Promise.resolve();
          }
          })
        });
      }
    else{
      setActiveCredentials([]);
    }
  }
}

  const {address} = useParams();

  useEffect(()=>{
    (async ()=>{
      setActiveCredentials([]);
      const {user}:any = await dispatch(getUserById(address));
      setIsUserProfile(address?.toLowerCase()===user.id.toLowerCase());
      if(followingIds){
        const resAddress= followingIds.find((id:any)=>id===address);
        setIsFollowing(!!resAddress);
      }else{
        setIsFollowing(false);
      }
      const activeUser:any = await dispatch(getUserById(address));
      setActiveUser(activeUser.user);
      console.log(activeUser.user);
      loadNFTs(activeUser.user);
      if(user.credentials){
         user.credentials.forEach(async(credentialId:string,index:number)=>{
          setActiveCredentials([...activeCredentials,credentialId].sort((a:any,b:any)=>b.iat-a.iat))
    });
      }
      setLoading(false);
  })();
  },[address])

  const renderView=(view:number)=>{
    if(view==0){
      return(
        activeCredentials.length>0?
          (activeCredentials.map((nft:any,index:number)=>(
            // <Box component="div" key={index} style={{border:'1px solid black', margin:'10px', boxShadow:'10px 10px', borderRadius:'20px', overflow:'hidden' }} onClick={()=>{navigate(`/credential/${nft.id}`)}}>
            //     <img width="400px" src={nft.image}/>
            //     <Box component="div" style={{padding:'20px'}}>
            //         <Typography style={{fontSize:'20px',fontWeight:'semi-bold', color:'black'}}>{nft.name} #{nft.token_id}</Typography>
            //         <Box component="div" style={{overflow:'hidden'}}>
            //             <Typography style={{color:'gray'}}>{nft.description}</Typography>
            //         </Box>
            //     </Box>
            // </Box>       
            <NFTCard credentialId={nft.id} key={index}/>
            )).reverse()
          )
          : (activeUser.id===user.id?<Box component="div" style={{width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center',}}>
            {/* <Typography style={{color:'black'}}>No NFTs added yet</Typography> */}
            <Button style={{backgroundColor:'#02F9A7',color:'black', borderRadius:0, padding:'20px 0px', marginTop:'20px', width:'100%'}} onClick={()=>{setView(2)}}>Upload</Button>
            </Box>:
            <Button style={{backgroundColor:'#02F9A7',flex:1, color:'black', borderRadius:0, padding:'20px 0px', marginTop:'20px'}} onClick={()=>{navigate('/feed')}}>Explore</Button>)
          )
    }
    else if(view===1){
      return (
        activeUser.favorite ? 
          (activeUser.favorite.map((favoriteId:string,index:number)=>(
            <NFTCard credentialId={favoriteId} key={index}/>))
          )
          : <Button style={{backgroundColor:'#02F9A7',flex:1, color:'black', borderRadius:0, padding:'20px 0px', marginTop:'20px'}} onClick={()=>{navigate('/feed')}}>Explore</Button>)
    }
  }
  
  return (
    <Box component="div" style={{backgroundColor:'#FFFFFF', color:'white', padding:'0px 0px', display:'flex', flexDirection:'column', height:'100vh'}}>
        <Header/>
        {!loading ? <Box component="div" style={{display:'flex', flexDirection:'row'}}>
        <Box component="div" style={{width:'30vw', height:'90%', display:'flex', flexDirection:'column', alignItems:'center', padding:'20px 0px'}}>
          {activeUser.profileImageUrl ? <img src={`${activeUser.profileImageUrl}`} style={{ width:'300px', borderRadius:'50%', border:'3px solid #02F9A7'}}/>:<Box component="div" style={{width:'300px', height:'300px', borderRadius:'50%',backgroundColor:'#E46A6A'}}></Box>}
          <Typography style={{color:'black', padding:'10px 0px', fontSize:'20px'}}>@{activeUser.username}</Typography>
          <Typography style={{color:'black', padding:'10px 0px', fontSize:'16px'}}><span style={{fontWeight:'bold', fontStyle:'italic'}}>{activeUser.following?activeUser.following.length : 0}</span> Following <span style={{fontWeight:'bold', fontStyle:'italic'}}>{activeUser.followers?activeUser.followers.length:0}</span> Followers</Typography>
          <Box component="div" style={{display:'flex', width:'80%', alignItems:'center', justifyContent:'center', margin:'5px'}} onClick={()=>{
            if(activeUser.twitter){
              window.open(user.twitter,'_blank')
            }
            else{
              window.open("https://twitter.com",'_blank')
            }
          }}>
            <SocialIcon style={{width:'50px'}} target={"_blank"} url={`${activeUser.twitter ? activeUser.twitter:"https://twitter.com"}`} />
            <Typography style={{color:'black', fontSize:'16px'}}>{`${activeUser.twitter ? activeUser.twitter.split('/')[3]:""}`}</Typography>
          </Box>
          <Box component="div" style={{display:'flex', width:'80%', alignItems:'center', justifyContent:'center', margin:'5px'}}
          onClick={()=>{
            if(activeUser.instagram){
              window.open(activeUser.instagram,'_blank')
            }
            else{
              window.open("https://instagram.com",'_blank')
            }
          }}>
            <SocialIcon style={{width:'50px'}} target={"_blank"} url={`${activeUser.instagram ? activeUser.instagram:"https://instagram.com"}`} />
            <Typography style={{color:'black', fontSize:'16px'}}>{`${activeUser.instagram ? activeUser.instagram.split('/')[3]:""}`}</Typography>
          </Box>
          {activeUser.id === user.id? <Link to='/settings' style={{padding:'20px', borderRadius:'30px', margin:'20px 10px', backgroundColor:'black', width:'60%', display:'flex', justifyContent:'center',textDecoration:'none', color:'#02F9A7', fontFamily:'sans-serif'}}>
                  Settings
          </Link>: null }
          {activeUser.id !== user.id ? (isFollowing ? <Button style={{backgroundColor:'darkGreen', color:'white', borderRadius:'30px', padding:'20px', width:'60%', margin:'10px'}} onClick={()=>{
                setIsFollowing(!isFollowing);
                dispatch(followUser(user.id,activeUser.id));
              }}>Unfollow</Button>:
              <Button style={{backgroundColor:'darkGreen', color:'white', borderRadius:'30px', padding:'20px', width:'60%', margin:'10px'}} onClick={()=>{
                setIsFollowing(!isFollowing);
                dispatch(followUser(user.id,activeUser.id));
              }}>Follow</Button>) : null }
        </Box>
          <Box component="div" style={{width:'100%', padding:'20px', alignItems:'center', display:'flex', flexDirection:'column', overflow:'auto', height:'83vh', overflowY:'auto'}}>
            <Box component="div" style={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-around', padding:'10px 0px'}}>
              <Button style={view==0?{ backgroundColor:'darkGreen',textTransform:'none', flex:1, color:'white', borderRadius:0, padding:'20px 0px'}:{backgroundColor:'white', textTransform:'none', flex:1, color:'darkGreen', borderRadius:0, padding:'20px 0px'}} onClick={()=>{setView(0)}}>{activeUser.id===user.id?'My':`${activeUser.username}'s`} NFTs</Button>
              {activeUser.id === user.id?<Button style={view==1?{backgroundColor:'darkGreen',flex:1, color:'white', borderRadius:0, padding:'20px 0px'}:{backgroundColor:'white',flex:1, color:'darkGreen', borderRadius:0, padding:'20px 0px'}} onClick={()=>{setView(1)}}>Favorites</Button> : null}
            </Box>
            <Grid container columns={3} style={{justifyContent:'center'}}>
              {loading? <CircularProgress/>:
                renderView(view)
              }
            </Grid>
            </Box>
          </Box>:
          <Box component="div" style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <CircularProgress/>
          </Box>}
      </Box>
    );
};



export default Home;
