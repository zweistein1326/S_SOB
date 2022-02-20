import { useMutation } from "@apollo/client";
import { Box, Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/actions/credentials";
import { createPost, getNFT } from "../functions/axios";
import '../styles/index.css'
import Header from "../components/Header";
import {ethers} from 'ethers';
import Web3Modal from 'web3modal';
import {nftAddress, NFTMarketAddress} from '../../config';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../artifacts/contracts/Market.sol/NFTMarket.json'
import {create as ipfsHttpClient } from 'ipfs-http-client'

const AddCredential = (props:any) => {

    const navigate = useNavigate();
    const [tokenData, setTokenData] = useState<any>(null);
    const [imageUrl, setImageUrl] = useState<any>(null);
    const [privacy, setPrivacy] = useState(0);
    const [caption, setCaption] = useState<string>('');
    const [createType, setCreateType] = useState<number>(0);
    const user = useSelector((state:any)=>state.auth.user);
    const dispatch = useDispatch();
    const [fileUrl, setFileUrl] = useState<string|null>(null)
    const [formInput, updateFormInput] = useState({price:'', name:'', description:''})
    const client = ipfsHttpClient({
        url:'https://ipfs.infura.io:5001/api/v0',port:5001
})

    async function onChange(e:any){
        const file = e.target.files[0];
        try{
            const added = await client.add(
                file,
                {
                    progress:(prog)=>console.log(`received: ${prog}`)
                }
            )
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url)
        }
        catch(e){
            console.log(e)
        }
    }

    async function createMarket(){
        const {name, description, price} = formInput
        if(!name || !description || !price || !fileUrl)return
        const data = JSON.stringify({
            name, description, image:fileUrl
        });
        try{
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            createSale(url)
        }
        catch(error){
            console.log('error uploading file',error);
        }
    }

    async function createSale(url:string){
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(nftAddress, NFT.abi, signer);
        let transaction = await contract.createToken(url)
        let tx = await transaction.wait();

        let event = tx.events[0];
        let value = event.args[2];
        let tokenId = value.toNumber()

        const price = ethers.utils.parseUnits(formInput.price,"ether");

        contract = new ethers.Contract(NFTMarketAddress, Market.abi, signer)
        let listingPrice = await contract.getListingPrice();
        listingPrice = listingPrice.toString()

        transaction = await contract.createMarketItem(
            nftAddress, tokenId, price, {value:listingPrice}
        )
        await transaction.wait();
        navigate('/feed');
    }

   const addNFT = async(event:React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      if(data.get('contract_address')!=='' && data.get('token_id')!==''){
        const credential = {
            contract_address: data.get('contract_address'),
            token_id: data.get('token_id'),
      }
        try{
            const tokenData = await getNFT(credential, user.id);
            console.log(tokenData);
            if(tokenData){
                if(tokenData.collection_name){
                    if(tokenData.collection_name==="CRYPTOPUNKS"){
                        setTokenData(tokenData);
                        setImageUrl(tokenData.image);
                    }
                    else{
                        setTokenData(tokenData);
                        console.log(tokenData);
                        if(tokenData.image.split('://')[0]=="ipfs"){
                            if (tokenData.image.split('://')[1].split('/')[0] === "ipfs") {
                                setImageUrl(`https://gateway.ipfs.io/${tokenData.image.split('://')[1]}`);
                            }
                            else {
                                setImageUrl(`https://gateway.ipfs.io/ipfs/${tokenData.image.split('://')[1]}`);
                            }
                        
                        }
                        else{
                        setImageUrl(tokenData.image);
                        }
                        // navigate('/feed');
                    }
                    }
            }
        }catch(e){
            console.log(e);
        }
      }
  }

    const createNewPost = async(event:any) => {
        event.preventDefault();
        await dispatch(createPost(tokenData, user.id, privacy));
        navigate('/feed');
    }

    const handleChange = (event:any) => {
        setPrivacy(event.target.value);
    }

    // const handleCaptionChange = (event:any) => {
    //     setCaption(event.target.value)
    // }

    return (
        <Box component="div" className="Container" style={{backgroundColor:'#FFFFFF', color:'white', padding:'0px 0px', minHeight:'100vh', display:'flex', flexDirection:'column'}}>
            <Header/>
            <Box component="div" style={{display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#02F9A7', margin:'20px'}}>
                <Button sx={createType==1?{flex:1,backgroundColor:'#02F9A7', color:'black', p:2}:{flex:1, backgroundColor:'black', color:'white',p:2}} onClick={()=>{setCreateType(0)}}>Upload NFT</Button>
                {/* <Button sx={createType==0?{flex:1, backgroundColor:'#02F9A7', color:'black',p:2}:{flex:1, backgroundColor:'black', color:'white',p:2}} onClick={()=>{setCreateType(1)}}>Create new</Button> */}
            </Box>
{createType===0?
            <Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center', padding:'0px 20px'}}>
                <Box component="form" style={{width:'70%', display:'flex', flexDirection:'column', alignItems:'center'}} noValidate sx={{ mt: 1 }} onChange={addNFT} onSubmit={createNewPost}>
                    <TextField
                    style={{backgroundColor:'#EEEEEE', margin:10, width:'80%'}}
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
                        style={{backgroundColor:'#EEEEEE', margin:10, width:'80%'}}
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
                        style={{backgroundColor:'#EEEEEE', margin:10, width:'80%'}}
                        required
                        fullWidth
                        value={privacy}
                        name="chain"
                        labelId="Chain"
                        type="text"
                        id="chain"
                    >
                        <MenuItem value={0}>Ethereum</MenuItem>
                    </Select>
                    <Select
                        style={{backgroundColor:'#EEEEEE', margin:10, width:'80%'}}
                        required
                        fullWidth
                        value={privacy}
                        name="token_id"
                        labelId="Token Id"
                        type="text"
                        id="token_id"
                    >
                        <MenuItem value={0}>Public</MenuItem>
                        <MenuItem value={1}>Private</MenuItem>
                    </Select>
                    {/* <TextField
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
                    /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, p:2, width:'80%', backgroundColor:'#02F9A7', color:'black' }}
                        // disabled={loading}
                    >
                        Add to collection
                    </Button>
                </Box>
                <Box component="div" style={{backgroundColor:'#FFFFFF',border:'1px solid black', borderRadius:'20px', height:'450px', width:'400px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', textAlign:'center'}}>
                    {tokenData ? <img style={{height:'400px',borderTopRightRadius:'20px',borderTopLeftRadius:'20px', width:'400px'}} src={`${imageUrl}`} alt="token"/> : null}
                    <Typography style={{padding:'10px', color:'#000000', fontWeight:'bold', fontSize:'16px'}}>{tokenData ? `${tokenData.collection_name} #${tokenData.token_id}` :'Enter Contract Address and Token Id to import NFT'}</Typography>
                </Box>
            </Box>:
            <Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center', padding:'0px 20px'}}>
            <Box component="div" style={{width:'70%', display:'flex', flexDirection:'column', alignItems:'center'}} sx={{ mt: 1 }}>
                <TextField
                style={{backgroundColor:'#EEEEEE', margin:10, width:'80%'}}
                margin="normal"
                required
                fullWidth
                name="file"
                type="file"
                id="file"
                autoComplete="file"
                onChange={onChange}
                />
                <TextField
                    style={{backgroundColor:'#EEEEEE', margin:10, width:'80%'}}
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="Name"
                    type="text"
                    id="name"
                    helperText="eg: Redeemable T-shirt with logo"
                    autoComplete="name"
                    onChange={e=>updateFormInput({...formInput, name:e.target.value})}
                />
                <TextField
                    style={{backgroundColor:'#EEEEEE', margin:10, width:'80%'}}
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    type="text"
                    helperText="eg: After purchasing a real t-shirt will be sent to you"
                    id="description"
                    autoComplete="description"
                    onChange={e=>updateFormInput({...formInput, description:e.target.value})}
                />
                <TextField
                    style={{backgroundColor:'#EEEEEE', margin:10, width:'80%'}}
                    margin="normal"
                    required
                    fullWidth
                    name="price"
                    label="Price (MATIC)"
                    type="text"
                    helperText="eg: 10"
                    id="price"
                    autoComplete="price"
                    onChange={e=>updateFormInput({...formInput, price:e.target.value})}
                />
                <Select
                    style={{backgroundColor:'#EEEEEE', margin:10, width:'80%'}}
                    required
                    fullWidth
                    value={privacy}
                    name="chain"
                    labelId="Chain"
                    type="text"
                    id="chain"
                    >
                        <MenuItem value={0}>Polygon</MenuItem>
                    </Select>
                <Select
                    style={{backgroundColor:'#EEEEEE', margin:10, width:'80%'}}
                    required
                    fullWidth
                    value={privacy}
                    name="token_id"
                    labelId="Token Id"
                    type="text"
                    id="token_id"
                >
                    <MenuItem value={0}>Public</MenuItem>
                    <MenuItem value={1}>Private</MenuItem>
                </Select>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, p:2, width:'80%', backgroundColor:'#02F9A7', color:'black' }}
                    // disabled={loading}
                    onClick = {createMarket}
                >
                    Generate
                </Button>
                </Box>
                <Box component="div" style={{backgroundColor:'#02F9A7', height:'400px', width:'400px', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center'}}>
                    <Typography style={{padding:'0px', color:'#000000'}}>{fileUrl ? null:'Upload file to see preview'}</Typography>
                    {fileUrl ? <img style={{height:'400px', width:'400px'}} src={`${fileUrl}`} alt="token"/> : null}
                </Box>
            </Box>}
        </Box>
    )
    // return(
    //     <Box component="div">
    //         <Box component="div">
    //             <Input placeholder = "asset name" onChange={e=>updateFormInput({...formInput, name:e.target.value})}></Input>
    //             <TextField placeholder = "description" onChange={e=>updateFormInput({...formInput, description:e.target.value})}></TextField>
    //             <Input placeholder = "Asset price in Matic" onChange={e=>updateFormInput({...formInput, price:e.target.value})}></Input>
    //             {
    //                 fileUrl && (
    //                     <img width="350" src={fileUrl}/>
    //                 )
    //             }
    //             <Button onClick={createMarket}>Create Digital Asset</Button>

    //         </Box>
    //     </Box>
    // )
}

const mapStateToProps = (state:any)=>({
    user: state.auth.user
})

const mapDispatchToProps = (dispatch:any) => ({
    setCredentials: (credentials:any[]) => dispatch(setCredentials(credentials))
})

export default connect(mapStateToProps,mapDispatchToProps)(AddCredential);