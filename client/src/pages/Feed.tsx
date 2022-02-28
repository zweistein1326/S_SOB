import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Input, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeedCard from '../components/FeedCard';
import sortCredentials from '../redux/selectors/credentials';
import { searchByText } from '../redux/actions/filters';
import Header from '../components/Header';
import { followUser, getAllUsers, getCredentials } from '../functions/axios';
import {ethers} from 'ethers';
import Web3Modal from 'web3modal';
import {nftAddress, NFTMarketAddress} from '../../config';
import Market from '../../artifacts/contracts/Market.sol/NFTMarket.json'


const Feed = () => {

    const credentials = useSelector((state:any)=> sortCredentials(state.credentials));
    const user:any = useSelector((state:any)=>state.auth.user);
    console.log(user);
    const allUsers = useSelector((state:any)=>state.auth.allUsers);
    console.log(allUsers);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loadingState,setLoadingState] = useState('not-loaded');

    useEffect(()=>{
        // loadNFTs()
        getAllUploadedNFTs();
    },[user])

    // const loadNFTs = async() => {
    //     const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/12bd70f594644e4ea699b452fd7e7d44')
    //     const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
    //     const marketContract = new ethers.Contract(NFTMarketAddress, Market.abi, provider);
    //     try{
    //         const data = await marketContract.fetchMarketItems();
    //         const items:any = await Promise.all(data.map(async (i:any) => {
    //         const tokenUri = await tokenContract.tokenURI(i.tokenId)
    //         const meta = await axios.get(tokenUri);
    //         let price = ethers.utils.formatUnits(i.price.toString(),"ether");
    //         let item ={
    //             price,
    //             tokenId: i.tokenId.toNumber(),
    //             seller: i.seller,
    //             owner: i.owner,
    //             image: meta.data.image,
    //             name: meta.data.name,
    //             description: meta.data.description,
    //             nftContract: i.nftContract
    //         }
    //         return item;
    //         }));
    //         setNfts(items);
    //         dispatch(setCredentials(items))
    //         setLoadingState('loaded')
    //     }
    //     catch(e){
    //         console.log(e);
    //         setLoadingState('loaded')
    //     }
    // }

    const getAllUploadedNFTs = async() => {
        await dispatch(getCredentials());
        setLoadingState('loaded');
    }
    

    const buyNft = async(nft:any) => {
        try{
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(NFTMarketAddress, Market.abi, signer)

            console.log(nft);
            const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
            console.log(nft);
            const transaction = await contract.createMarketSale(nftAddress, nft.tokenId, {
            value: price
            })
            await transaction.wait();
            // loadNFTs();
        }catch(e){
            console.log(e);
        }
        
    }

    // useEffect(()=>{
    //     dispatch(getCredentials());
    //     dispatch(getAllUsers());
    // },[])
    
    // if(loadingState == 'loaded' && !credentials.length) return (
    //     <Typography>No items in marketplace</Typography>
    // )
    return(
        allUsers && user && loadingState=="loaded" ? <Box component="div" style={{backgroundColor:'#FFFFFF', color:'white',padding:'0px 0px', maxHeight:'100vh', display:'flex', flexDirection:'column', overflowY:'scroll'}}>
            <Header/>
            <Box component="div" style={{backgroundColor:'#FFFFFF', color:'white', margin:'auto', minHeight:'90vh', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', width:'100%' }}>
                {/* <Box style={{width:'80%'}}>
                <Typography style={{backgroundColor:'#02F9A7', color:'black', margin:20, padding:'10px 30px', borderRadius:'20px'}}>Username, Address</Typography>
                </Box> */}
                {/* <Box component="div" style={{zIndex:'1', height:'90vh', backgroundColor:'#333333', maxWidth:'20vw', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', padding:'0px 10px', overflowY:'scroll'}}>
                    <Typography style={{color:'white', fontSize:'20px', fontWeight:'bold', padding:'20px'}}>Trending</Typography>
                    <Typography style={{color:'white', fontSize:'14px', fontWeight:'bold',textAlign:'right', width:'100%', padding:'0px 20px'}}>View more</Typography>
                    { allUsers.map((recommendUser:any)=>{
                        return(
                        recommendUser.id!==user.id?<Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:'100%', margin:'10px',}}>
                            <Box component="div" style={{display:'flex', flexDirection:'row', flex:1, alignItems:'center'}} onClick ={()=>{navigate(`/${recommendUser.id}`)}}>
                                {recommendUser.profileImageUrl? <img src={recommendUser.profileImageUrl} style={{width:'50px', height:'50px',backgroundColor:'pink', borderRadius:'50%'}}/>:<Box component="div" style={{width:'50px', height:'50px', backgroundColor:'pink', borderRadius:'50%'}}></Box>}
                                <Typography style={{flex:1, paddingLeft:'10px'}}>{recommendUser.username}</Typography>
                                <Button onClick={()=>{dispatch(followUser(user.id,recommendUser.id))}}>+ Follow</Button>
                            </Box>
                        </Box>:null
                        )})
                        }
                </Box> */}
                <Box component="div" style={{display:'flex', flexDirection:'column', alignItems:'center', width:'70%'}}>
                    <Box component="div" style={{width:'100%', display:'flex', alignItems:'center', flexDirection:'column', height:'90vh', overflowY:'scroll'}}>
                        {/* {<Grid container columns={3} style={{backgroundColor:'#FFFFFF', color:'white', padding:'0px 20px', maxHeight:'100vh', overflowY:'scroll', width:'100%'}}> */}
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mb: 2, width:'90%', backgroundColor:'#02F9A7', color:'black', borderRadius:'50px', p:1 }}
                        // disabled={loading}
                        onClick={()=>{navigate('/addCredential')}}
                    >
                        Upload 
                    </Button>
                    {credentials.map((nft:any,i:number)=>{
                    return(
                        <FeedCard nft={nft} buyNft={buyNft}/>
                    )}
                    )}
                    {/* {nfts.map((nft:any,i:number)=>{
                    return(
                        <FeedCard nft={nft} buyNft={buyNft}/>
                    )}
                    )} */}
                    </Box>
                </Box>
                <Box component="div" style={{zIndex:'999999', height:'90vh', backgroundColor:'#333333', maxWidth:'20vw', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', padding:'0px 10px', overflowY:'scroll'}}>
                    <Typography style={{color:'white', fontSize:'20px', fontWeight:'bold', padding:'20px'}}>Recommended for you</Typography>
                    {/* <Typography style={{color:'white', fontSize:'14px', fontWeight:'bold',textAlign:'right', width:'100%', padding:'0px 20px'}}>View more</Typography> */}
                    { allUsers.map((recommendUser:any)=>{
                        return(
                        recommendUser.id!==user.id?<Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:'100%', margin:'10px',}}>
                            <Box component="div" style={{display:'flex', flexDirection:'row', flex:1, alignItems:'center'}} onClick ={()=>{navigate(`/${recommendUser.id}`)}}>
                                {recommendUser.profileImageUrl? <img src={recommendUser.profileImageUrl} style={{width:'50px', height:'50px',backgroundColor:'#E46A6A', borderRadius:'50%'}}/>:<Box component="div" style={{width:'50px', height:'50px', backgroundColor:'#E46A6A', borderRadius:'50%'}}></Box>}
                                <Typography style={{flex:1, paddingLeft:'10px'}}>{Array.from(recommendUser.username).map((letter:any, index:number)=>index<12 ? letter: (index<15?'.':null))}</Typography>
                                <Button onClick={()=>{dispatch(followUser(user.id,recommendUser.id))}}>+ Follow</Button>
                            </Box>
                        </Box>:null
                        )})
                        }
                </Box>
            {/* <Sidebar user={user}/> */}
            </Box>
        </Box> : null
    )
}

export default Feed