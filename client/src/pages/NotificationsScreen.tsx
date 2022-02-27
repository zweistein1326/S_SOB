import { Box,  Grid, Button, TextField, Typography, Input, Select, MenuItem, CircularProgress } from '@mui/material';
import { useEffect, useState, Suspense } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import Card from '../components/Card';
import CredentialTile from '../components/CredentialTile';
import Header from '../components/Header';
import NFTCard from '../components/NFTCard';
import { getCredentialById, getNFT, getUserById, followUser, createPost, updateCredential, getNotificationById} from '../functions/axios';
import { User } from '../models/User';
// import '../styles/NotificationsScreen.css'
import {searchByText} from '../redux/actions/filters';
import usersSelector from '../redux/selectors/users';
import { ThreeDots } from 'react-loader-spinner';
import {ethers} from 'ethers';
import Web3Modal from 'web3modal';
import {nftAddress, NFTMarketAddress} from '../../config';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../artifacts/contracts/Market.sol/NFTMarket.json'
import axios from 'axios';
import NotificationTile from '../components/NotificationTile';

declare var window:any;

const NotificationsScreen = (props:any) => {
    const navigate = useNavigate();
    const [loading,setLoading]= useState(true);
    const [notifications, setNotifications] = useState([]);
  
    const user = useSelector((state:any)=>state.auth.user);
    const dispatch = useDispatch();  

    const {address} = useParams();


    const loadNotifications = async(notificationIds:any) => {
        let activeNotifications:any = [];
        if(notificationIds){
          if(notifications.length < user.notifications.length){
            await Promise.all(notificationIds).then(async(notificationIds:any)=>{
              await notificationIds.forEach(async(notificationId:string)=>{
              const notification:any = await dispatch(getNotificationById(notificationId));
              activeNotifications.push(notification);
              if(activeNotifications.length===notificationIds.length){
                setNotifications(activeNotifications);
                Promise.resolve();
              }
              })
            });
          }
        else{
            setNotifications([]);
        }
      }
    }

    useEffect(()=>{
      if(user){
        (async ()=>{
          setNotifications([]);
          await loadNotifications(user.notifications);
          setLoading(false);
      })();
      setNotifications(user.notifications?user.notifications:[]);
      setLoading(false);
      }
    },[address, user])

  return (
    <Box component="div" style={{backgroundColor:'#FFFFFF', color:'white', padding:'0px 0px', display:'flex', flexDirection:'column', maxHeight:'100vh'}}>
        <Header/>
        {!loading ? <Box component="div" style={{display:'flex', flexDirection:'row', width:'100%'}}>
            <Box component="div" style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', padding:'20px 0px'}}>
                {notifications.length>0 ? notifications.map((notification:any)=>{
                    return <NotificationTile notification={notification} creator={notification.from}/>
                    }):<Typography style={{color:'black', fontSize:'18px'}}>You don't have any notifications yet</Typography>}
            </Box>
        </Box>:
          <Box component="div" style={{width:'100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <CircularProgress/>
          </Box>}
      </Box>
    );
};



export default NotificationsScreen;
