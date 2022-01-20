import { Box,  Grid, Button, TextField, Typography, Input, Select, MenuItem } from '@mui/material';
import { useEffect, useState, Suspense } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import Card from '../components/Card';
import CredentialTile from '../components/CredentialTile';
import Header from '../components/Header';
import NFTCard from '../components/NFTCard';
import { getCredentialById, getNFT, getUserById, followUser, createPost} from '../functions/axios';
import { User } from '../models/User';
import '../styles/Home.css'
import {searchByText} from '../redux/actions/filters';
import usersSelector from '../redux/selectors/users';
import { ThreeDots } from 'react-loader-spinner';
import { useGLTF } from '@react-three/drei';
import {Canvas} from '@react-three/fiber';

declare var window:any;

const Home = (props:any) => {
  const navigate = useNavigate();
  const [activeUser,setActiveUser] = useState<any>({});
  const [activeCredentials,setActiveCredentials] = useState<any>([]);
  const [account, setAccount] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [isUserProfile, setIsUserProfile] = useState<boolean>(false);
  const [loading,setLoading]= useState(false);
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
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  const addNFT = async(event:React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const credential = {
      contract_address: data.get('contract_address'),
      token_id: data.get('token_id'),
      caption: data.get('caption'),
      private: privacy === 1
      }
      const tokenData = await getNFT(credential, user.id); 
      if(tokenData.name){
          // props.setCredentials(tokenData);
          setTokenData(tokenData);
          if(tokenData.image.split('://')[0]=="ipfs"){
              console.log(tokenData.image.split('://')[1]);
              setImageUrl(`https://gateway.ipfs.io/ipfs/${tokenData.image.split('://')[1]}`);
          }
          else{
              setImageUrl(tokenData.image);
          }
      // navigate('/feed');
      }
      else{
            alert(tokenData.message);
      }
  }

  const createNewPost = () => {
    dispatch(createPost(tokenData, user.id, caption, privacy))
  }

  const handleChange = (event:any) => {
      setPrivacy(event.target.value);
  }

  const handleCaptionChange = (event:any) => {
      setCaption(event.target.value)
  }

  const {address} = useParams();

  const Model = () => {
    const {scene} = useGLTF('3Davatar.glb');
    return(<primitive style={{height:'20vh', width:'20vw'}} object={scene}/>)
  }

  useEffect(()=>{
    console.log('changing');
    setLoading(true);
    (async ()=>{
      setActiveCredentials([]);
      const {user}:any = await dispatch(getUserById(address));
      setIsUserProfile(address?.toLowerCase()===user.id.toLowerCase());
      console.log(followingIds);
      if(followingIds){
        const resAddress= followingIds.find((id:any)=>id===address);
        setIsFollowing(!!resAddress);
      }else{
        setIsFollowing(false);
      }
      console.log(address?.toLowerCase(),user.id.toLowerCase());
      setActiveUser(user);
      if(user.credentials){
         user.credentials.forEach(async(credentialId:string,index:number)=>{
          setActiveCredentials([...activeCredentials,credentialId].sort((a:any,b:any)=>b.iat-a.iat))
    });
      }
  })();
  setLoading(false);
  },[
    address,
  ])

  const renderView=(view:number)=>{
    if(view==0){
      return(
        activeUser.credentials ? 
          (activeUser.credentials.map((credentialId:string,index:number)=>(
            <NFTCard credentialId={credentialId} key={index}/>)).reverse()
          )
          : <Typography style={{color:'white'}}>You haven't added any NFTs yet</Typography>)
    }
    else if(view===1){
      return (
        activeUser.favorite ? 
          (activeUser.favorite.map((favoriteId:string,index:number)=>(
            <NFTCard credentialId={favoriteId} key={index}/>))
          )
          : <Typography style={{color:'white'}}>No favorites added</Typography>)
    }
    else{
      return (
        <Box component="form" style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}} noValidate sx={{ mt: 1 }} onSubmit={addNFT}>
                <TextField
                style={{backgroundColor:'#EEEEEE', margin:10, width:'90%'}}
                margin="normal"
                required
                fullWidth
                name="contract_address"
                label="Contract Address"
                type="text"
                id="contract_address"
                autoComplete="contract_address"
                />
                <TextField
                    style={{backgroundColor:'#EEEEEE', margin:10, width:'90%'}}
                    margin="normal"
                    required
                    fullWidth
                    name="token_id"
                    label="Token Id"
                    type="text"
                    id="token_id"
                    autoComplete="token_id"
                />
                <Select
                    style={{backgroundColor:'#EEEEEE', margin:10, width:'90%'}}
                    required
                    fullWidth
                    value={privacy}
                    name="token_id"
                    labelId="Token Id"
                    type="text"
                    id="token_id"
                    onChange = {handleChange}
                >
                    <MenuItem value={0}>Public</MenuItem>
                    <MenuItem value={1}>Private</MenuItem>
                </Select>
                <Box component="div" style={{backgroundColor:'pink'}}>
                    <Typography>{tokenData ? tokenData.name:''}</Typography>
                    {tokenData ? <img style={{height:'400px', width:'400px'}} src={`${imageUrl}`} alt="token"/> : null}
                </Box>
                <TextField
                    style={{backgroundColor:'#EEEEEE', margin:10, width:'90%'}}
                    margin="normal"
                    fullWidth
                    value={caption}
                    name="caption"
                    label="Caption"
                    type="text"
                    id="caption"
                    autoComplete="caption"
                    onChange={handleCaptionChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width:'20%', backgroundColor:'#02F9A7', color:'black' }}
                    // disabled={loading}
                >
                    Import
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width:'20%', backgroundColor:'#02F9A7', color:'black' }}
                    // disabled={loading}
                    onClick={createNewPost}
                >
                    Create new Post
                </Button>
                {/* <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width:'20%', backgroundColor:'#02F9A7', color:'black' }}
                    // disabled={loading}
                >
                    +Add
                </Button> */}
            </Box>
      );
    }
  }
  
  const {ethereum} = window;

  return (
    <Box component="div" style={{backgroundColor:'#332E2E', color:'white', padding:'0px 20px', display:'flex', flexDirection:'column', height:'100vh'}}>
      <Header/>
      <Box component="div" style={{display:'flex', flexDirection:'row'}}>
        {/* <Box component="div" style={{height:'80vh', width:'20vw', backgroundColor:'red'}}>
          <Canvas camera={{position:[0,0,0],fov:0.5}}>
            <pointLight position={[10,10,10]} intensity={1.3}/>
            <Suspense fallback={null}>
              <Model/>
            </Suspense>
            </Canvas>
        </Box> */}
      {/* <Box component="form" onSubmit={addNFT} noValidate sx={{ mt: 1 }}> */}
        <Box component="div" style={{width:'100%', padding:'20px', alignItems:'center', display:'flex', flexDirection:'column', overflow:'auto', height:'83vh', overflowY:'auto'}}>
          {activeUser.id===user.id?<Box component="div" style={{width:'100%', backgroundColor:'#02F9A7', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-around', padding:'10px 0px'}}>
            <Button style={view==0?{backgroundColor:'darkGreen', color:'white'}:{}} onClick={()=>{setView(0)}}>All</Button>
            <Button style={view==1?{backgroundColor:'darkGreen', color:'white'}:{}} onClick={()=>{setView(1)}}>Favorited</Button>
            <Button style={view==2?{backgroundColor:'darkGreen', color:'white'}:{}} onClick={()=>{setView(2)}}>+Add new</Button>
          </Box>:null}
          <Grid container columns={3} style={{justifyContent:'center'}}>
            {loading? <ThreeDots height="100" width="100" color="grey"/>:
              renderView(view)
            }
          </Grid>
          </Box>
        </Box>
    </Box>
  );
};



export default Home;
