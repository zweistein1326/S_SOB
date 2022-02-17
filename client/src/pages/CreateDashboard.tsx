import {ethers} from 'ethers';
import Web3Modal from 'web3modal';
import {nftAddress, NFTMarketAddress} from '../../config';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../artifacts/contracts/Market.sol/NFTMarket.json'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box,  Grid, Button, TextField, Typography, Input, Select, MenuItem } from '@mui/material';

export default function CreatorDashboard(){
    const [nfts, setNfts] = useState<any>([]);
    const [sold, setSold] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
        loadNFTs()
    },[])

    const loadNFTs = async() => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        
        const marketContract = new ethers.Contract(NFTMarketAddress, Market.abi, signer)
        const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider)
        const data = await marketContract.fetchItemsCreated()
        
        const items = await Promise.all(data.map(async (i:any) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            sold: i.sold,
            image: meta.data.image,
        }
        return item
        }));
        /* create a filtered array of items that have been sold */
        const soldItems = items.filter((i:any) => i.sold)
        setSold(soldItems)
        setNfts(items)
        setLoading(false); 
    }

    return(
        <Box component="div" style={{display:'flex', justifyContent:'center'}}>
                <Box component="div" style={{padding:4, maxWidth:'1600px'}}>
                    <Box component="div" sx={{display:'grid', gridColumn:1, pt:4}} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4"> 
                        {
                        nfts.map((nft:any,i:number)=>{
                            console.log(nft);
                            return(
                                <Box component="div" key={i} style={{border:'1px solid black', boxShadow:'10px 10px', borderRadius:'10px', overflow:'hidden' }} >
                                    <img src={nft.image}/>
                                    <Box component="div" style={{padding:'20px'}} className="p-4">
                                        <Typography style={{fontSize:'2xl', height:'64px', fontWeight:'semi-bold'}} className="text-2xl font-semibold">{nft.name}</Typography>
                                        <Box component="div" style={{height:'70px', overflow:'hidden'}}>
                                            <Typography style={{color:'gray'}}>{nft.description}</Typography>
                                        </Box>
                                    </Box>
                                    {/* <Box component="div" style={{padding:'20px', backgroundColor:'black'}} className="p-4 bg-black">
                                        <Typography style={{fontSize:'2xl', marginBottom:'20px', fontWeight:'bold', color:'white'}} className="text-2xl mb-4 font-bold text-white">{nft.price} MATIC</Typography>
                                        <Button style={{width:'100%', backgroundColor:'pink', color:'white', fontWeight:'bold',padding:'10px 20px'}} className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={()=>buyNft(nft)}>
                                            Buy
                                        </Button>
                                    </Box>  */}
                                </Box>
                            )
                        })
                        }
                    </Box>
                </Box>
                <Box> 
                    {Boolean(sold.length) && (
                        <Box component="div" style={{padding:4, maxWidth:'1600px'}}>
                        <Box component="div" sx={{display:'grid', gridColumn:1, pt:4}} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4"> 
                            {
                            sold.map((nft:any,i:number)=>{
                                console.log(nft);
                                return(
                                    <Box component="div" key={i} style={{border:'1px solid black', boxShadow:'10px 10px', borderRadius:'10px', overflow:'hidden' }} >
                                        <img src={nft.image}/>
                                        <Box component="div" style={{padding:'20px'}} className="p-4">
                                            <Typography style={{fontSize:'2xl', height:'64px', fontWeight:'semi-bold'}} className="text-2xl font-semibold">{nft.name}</Typography>
                                            <Box component="div" style={{height:'70px', overflow:'hidden'}}>
                                                <Typography style={{color:'gray'}}>{nft.description}</Typography>
                                            </Box>
                                        </Box>
                                        {/* <Box component="div" style={{padding:'20px', backgroundColor:'black'}} className="p-4 bg-black">
                                            <Typography style={{fontSize:'2xl', marginBottom:'20px', fontWeight:'bold', color:'white'}} className="text-2xl mb-4 font-bold text-white">{nft.price} MATIC</Typography>
                                            <Button style={{width:'100%', backgroundColor:'pink', color:'white', fontWeight:'bold',padding:'10px 20px'}} className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={()=>buyNft(nft)}>
                                                Buy
                                            </Button>
                                        </Box>  */}
                                    </Box>
                                )
                            })
                            }
                        </Box>
                        </Box>
                    )}
                </Box>
            </Box>
    )

}