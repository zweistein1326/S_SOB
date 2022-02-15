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
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../artifacts/contracts/Market.sol/NFTMarket.json'
import axios from 'axios';

const Feed = () => {

    const credentials = useSelector((state:any)=> sortCredentials(state.credentials));
    const user = useSelector((state:any)=>state.auth.user);
    const allUsers = useSelector((state:any)=>state.auth.allUsers);
    const filters = useSelector((state:any)=>state.filters);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [nfts, setNfts] = useState([]);
    const [loadingState,setLoadingState] = useState('not-loaded');

    useEffect(()=>{
        loadNFTs()
    },[])

    const loadNFTs = async() => {
        const provider = new ethers.providers.JsonRpcProvider()
        const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
        const marketContract = new ethers.Contract(NFTMarketAddress, Market.abi, provider);
        const data = await marketContract.fetchMarketItems();
        
        console.log(data);
        const items:any = await Promise.all(data.map(async (i:any) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(),"ether");
        let item ={
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description
        }
        return item;
        }));
        setNfts(items);
        setLoadingState('loaded')
    }

    const buyNft = async(nft:any) => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();
        const contract = new ethers.Contract(NFTMarketAddress, Market.abi, signer);

        const price = ethers.utils.parseUnits(nft.price.toString(),'ether')

        const transaction = await contract.createMarketSale(nftAddress, nft.tokenId,{value:price})

        await transaction.wait()

        loadNFTs();
    }

    useEffect(()=>{
        dispatch(getCredentials());
        dispatch(getAllUsers());
    },[])
    
    // return(
    //     allUsers && user ? <Box component="div" style={{backgroundColor:'#FFFFFF', color:'white',padding:'0px 0px', maxHeight:'100vh', display:'flex', flexDirection:'column', overflowY:'scroll'}}>
    //         <Header/>
    //         <Box component="div" style={{backgroundColor:'#FFFFFF', color:'white', padding:'10px 10px', minHeight:'80vh', display:'flex', flexDirection:'row'}}>
    //         <Box component="div" style={{backgroundColor:'#FFFFFF', color:'white', width:'100%', minHeight:'90vh', display:'flex', flexDirection:'row', alignItems:'center' }}>
    //             {/* <Box style={{width:'80%'}}>
    //             <Typography style={{backgroundColor:'#02F9A7', color:'black', margin:20, padding:'10px 30px', borderRadius:'20px'}}>Username, Address</Typography>
    //             </Box> */}
    //             <Box component="div" style={{zIndex:'999999', height:'90vh', backgroundColor:'#333333', maxWidth:'20vw', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', padding:'0px 10px', overflowY:'scroll'}}>
    //                 <Typography style={{color:'white', fontSize:'20px', fontWeight:'bold', padding:'20px'}}>Recommended for you</Typography>
    //                 {/* <Typography style={{color:'white', fontSize:'14px', fontWeight:'bold',textAlign:'right', width:'100%', padding:'0px 20px'}}>View more</Typography> */}
    //                 { allUsers.map((recommendUser:any)=>{
    //                     return(
    //                     recommendUser.id!==user.id?<Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:'100%', margin:'10px',}}>
    //                         <Box component="div" style={{display:'flex', flexDirection:'row', flex:1, alignItems:'center'}} onClick ={()=>{navigate(`/${recommendUser.id}`)}}>
    //                             {recommendUser.profileImageUrl? <img src={recommendUser.profileImageUrl} style={{width:'50px', height:'50px',backgroundColor:'pink', borderRadius:'50%'}}/>:<Box component="div" style={{width:'50px', height:'50px', backgroundColor:'pink', borderRadius:'50%'}}></Box>}
    //                             <Typography style={{flex:1, paddingLeft:'10px'}}>{recommendUser.username}</Typography>
    //                             <Button onClick={()=>{dispatch(followUser(user.id,recommendUser.id))}}>+ Follow</Button>
    //                         </Box>
    //                     </Box>:null
    //                     )})
    //                     }
    //             </Box>
    //             <Box component="div" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
    //                 <Box component="div" style={{width:'60vw', display:'flex', alignItems:'center', flexDirection:'column', height:'90vh', overflowY:'scroll'}}>
    //                     {/* {<Grid container columns={3} style={{backgroundColor:'#FFFFFF', color:'white', padding:'0px 20px', maxHeight:'100vh', overflowY:'scroll', width:'100%'}}> */}
    //                     <Button
    //                     type="submit"
    //                     fullWidth
    //                     variant="contained"
    //                     sx={{ mb: 2, width:'90%', backgroundColor:'#02F9A7', color:'black', borderRadius:'50px', p:1 }}
    //                     // disabled={loading}
    //                     onClick={()=>{navigate('/addCredential')}}
    //                 >
    //                     Create 
    //                 </Button>
    //                         {credentials.map((credential:any,index:number)=>(
    //                             <FeedCard credential={credential} key={index}/>)
    //                             )}
    //                     {/* </Grid>} */}
    //                 </Box>
    //             </Box>
    //             <Box component="div" style={{zIndex:'999999', height:'90vh', backgroundColor:'#333333', maxWidth:'20vw', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', padding:'0px 10px', overflowY:'scroll'}}>
    //                 <Typography style={{color:'white', fontSize:'20px', fontWeight:'bold', padding:'20px'}}>Recommended for you</Typography>
    //                 {/* <Typography style={{color:'white', fontSize:'14px', fontWeight:'bold',textAlign:'right', width:'100%', padding:'0px 20px'}}>View more</Typography> */}
    //                 { allUsers.map((recommendUser:any)=>{
    //                     return(
    //                     recommendUser.id!==user.id?<Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:'100%', margin:'10px',}}>
    //                         <Box component="div" style={{display:'flex', flexDirection:'row', flex:1, alignItems:'center'}} onClick ={()=>{navigate(`/${recommendUser.id}`)}}>
    //                             {recommendUser.profileImageUrl? <img src={recommendUser.profileImageUrl} style={{width:'50px', height:'50px',backgroundColor:'pink', borderRadius:'50%'}}/>:<Box component="div" style={{width:'50px', height:'50px', backgroundColor:'pink', borderRadius:'50%'}}></Box>}
    //                             <Typography style={{flex:1, paddingLeft:'10px'}}>{recommendUser.username}</Typography>
    //                             <Button onClick={()=>{dispatch(followUser(user.id,recommendUser.id))}}>+ Follow</Button>
    //                         </Box>
    //                     </Box>:null
    //                     )})
    //                     }
    //             </Box>
    //         </Box>
    //         {/* <Sidebar user={user}/> */}
    //         </Box>
    //     </Box> : null
    // )

    if(loadingState == 'loaded' && !nfts.length) return (
        <Typography>No items in marketplace</Typography>
    )
    else{
        return(
            <div className = "flex justify-center">
                <div className="px-4" style={{maxWidth:'1600px'}}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4"> 
                        {
                        nfts.map((nft:any,i:number)=>{
                            return(
                                <div key={i} className="border shadow rounded-xl overflow-hidden">
                                    <img src={nft.image}/>
                                    <div className="p-4">
                                        <p style={{height:'64px'}} className="text-2xl font-semibold">{nft.name}</p>
                                        <div style={{height:'70px', overflow:'hidden'}}>
                                            <p className="text-gray-400">{nft.description}</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-black">
                                        <p className="text-2xl mb-4 font-bold text-white">{nft.price}</p>
                                        <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={()=>buyNft(nft)}>
                                            Buy
                                        </button>
                                    </div> 
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Feed