import { Box,  Grid, Button, TextField, Typography, Input } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import Card from '../components/Card';
import CredentialTile from '../components/CredentialTile';
import Header from '../components/Header';
import NFTCard from '../components/NFTCard';
import Sidebar from '../components/Sidebar';
import { getCredentialById, getNFT, getUserById, followUser} from '../functions/axios';
import { User } from '../models/User';
import '../styles/Home.css'
import {searchByText} from '../redux/actions/filters';
import usersSelector from '../redux/selectors/users';
import { ThreeDots } from 'react-loader-spinner';

declare var window:any;

const Home = (props:any) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(
    props.account !==null ,
  );
  const [activeUser,setActiveUser] = useState<any>({});
  const [activeCredentials,setActiveCredentials] = useState<any>([]);
  const [account, setAccount] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [isUserProfile, setIsUserProfile] = useState<boolean>(false);
  const [loading,setLoading]= useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const followingIds = useSelector((state:any)=>state.auth.following);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  const {address} = useParams();

  useEffect(()=>{
    console.log('changing');
    setLoading(true);
    (async ()=>{
      setActiveCredentials([]);
      const {user} = await props.getUserById(address);
      setIsUserProfile(address?.toLowerCase()===props.user.id.toLowerCase());
      console.log(followingIds);
      if(followingIds){
        const resAddress= followingIds.find((id:any)=>id===address);
        setIsFollowing(!!resAddress);
      }else{
        setIsFollowing(false);
      }
      console.log(address?.toLowerCase(),props.user.id.toLowerCase());
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
    followingIds
  ])
  
  const {ethereum} = window;
  return (
    <Box style={{backgroundColor:'#EEEEEE', color:'white', padding:'20px', display:'flex', flexDirection:'row'}}>
      {/* <Header/> */}
     {/* <Box component="form" onSubmit={addNFT} noValidate sx={{ mt: 1 }}> */}
     <Sidebar user={props.user}/>
     <Box style={{flex:1, padding:'20px', alignItems:'center', display:'flex', flexDirection:'column', height:'90vh',overflowY:'auto', width:0}}>
        {props.filters.text ==='' ? null :
          <Box style={{ width:'100%', height:'20%'}}>
            {props.allUsers.map((user:any)=>{
              return(<Link to={`/${user.id}`} onClick={()=>{props.searchByText('')}}><Typography style={{color:'black'}}>{user.username}</Typography></Link>)})
            }
          </Box>
        }
        <Box style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-end', width:'80%',padding: '1rem'}}>
          <Box style={{flex:1}}>
            <Input name="search_text" placeholder="Search by Username, Address" value={props.filters.text} onChange={(event)=>{props.searchByText(event.target.value)}} disableUnderline={true} style={{ width:'80%',backgroundColor:'#02F9A7', color:'black', margin:'20px 0px', padding:'10px 20px', borderRadius:'20px'}}/>
            {/* <Typography style={{backgroundColor:'#02F9A7', color:'black', margin:'20px 0px', padding:'10px 20px', width:'50%', borderRadius:'20px'}}>Username, Address</Typography> */}
          </Box>
          {isUserProfile ?  null: <Button onClick = {()=>{
            setIsFollowing(!isFollowing);
            props.followUser(props.user.id, activeUser.id)
            }} style={{backgroundColor:'#02F9A7', margin:20, padding:10, color:'black', borderRadius:'20px', width:'15%'}}>{isFollowing?'Unfollow':'Follow'}</Button>}
          <Button onClick = {()=>{navigate('/addCredential')}} style={{backgroundColor:'#02F9A7', margin:'20px 0px 20px 20px', padding:10, color:'black', borderRadius:'20px',  width:'15%'}}>+ Add NFT</Button>
        </Box>
        {loading?<ThreeDots height="100" width="100" color="grey"/>: ( activeUser.credentials ? <Grid container columns={3} style={{justifyContent:'center'}}>
          {activeUser.credentials.map((credentialId:string,index:number)=>(
            <NFTCard credentialId={credentialId} key={index}/>))
          }
        </Grid> : <Typography style={{color:'black'}}>No NFTs yet Redirect to buying site</Typography>
        )}
        </Box>
        {/* <Sidebar user={props.user}/> */}

        {/* </Box> */}
    </Box>
  );
};

const mapStateToProps = (state:any) => ({
  credentials: state.credentials,
  user: state.auth.user,
  filters:state.filters,
  allUsers: usersSelector(state.auth.allUsers , state.filters)
})

const mapDispatchToProps = (dispatch:any) => ({
    searchByText:(text:string) => dispatch(searchByText(text)),
    getUserById: (userId:string) => dispatch(getUserById(userId)),
    followUser: (userId:string, followingId:string) => dispatch(followUser(userId,followingId))
})


export default connect(mapStateToProps,mapDispatchToProps)(Home);
