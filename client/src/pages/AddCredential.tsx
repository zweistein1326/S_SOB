import { useMutation } from "@apollo/client";
import { Box, Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/actions/credentials";
import { createPost, getNFT } from "../functions/axios";
import '../styles/index.css'
import Header from "../components/Header";

var CryptoJS = require('crypto-js');
var SHA256 = require('crypto-js/sha256');

const privateKey = 'MIICXAIBAAKBgQDLyT/Ah5gtJu74KRpNatZgFzdePXdRYLvknjBCqanlhzkfE4NwUIVGK1/lumyZVuA1zBXvDrXXRm4tuDod8ROQYEPOw25A+9Eq6UGBRUOO1/zWkpumPiJtIgLFDbto98VfD0ooISc0GLHm5dBidxri5IHUT8Wl+gTeIqRJDYI9nwIDAQABAoGAQshH6StGdn2M0Kx/nyFE8aaKEYspH/UIfipM/HunXr3KvWFisJriohUyzxEh57ptrZOdGIOEmfDNyJPYD9niI9d8ETiC0qHfMUblxNG5McC8ATLARp0bKXJ7XT4dJJQ15/yltrH+KxIVZ7fEoMHXHxXYp3AYVrjaaupZzXK1WBkCQQDpLGSK+624L0DPhyuTNLfWMHCaOGEaVDGGese+fhZ3KKNk3HhaWyqX2t3EALFqp3R2pCnyjT8I7sNYiAct/XZbAkEA37xgJDUUZO0mZr2dtWtOtK5BDsqM2Cpp1iSL5kggDcuuuepvNfxh/goEyo4FAXBC+GBQcdgXx9GOmrV/7tyhDQJBAMspoNjv/Sb0FRY9Ahya3GrFffcBlKmqHhS8OfmiRtTAFc21wy+HK49wZbV3nR3+lZ0h4GKz6u5PiulCbG8H3u0CQGDMHURM+q/Xsl+M9eiBrqGZKmh91YXIg9W0JhrRZZzSXJvvA4J12OeR6hTAcQX4TeErumImvdMjpPDmSZ1MMxkCQGMB7L+HemusnZP6JvBYyUwlkvSDoqkRUABW74cCu5dsHDBOVnAtBbyXGH1JgCSkqLtk+1ZKgH7I8M9VL7zs66s='
// import private key from local storage

const AddCredential = (props:any) => {

    const navigate = useNavigate();
    const [tokenData, setTokenData] = useState<any>(null);
    const [imageUrl, setImageUrl] = useState<any>(null);
    const [privacy, setPrivacy] = useState(0);
    const [caption, setCaption] = useState<string>('');
    const [createType, setCreateType] = useState<number>(0);
    const user = useSelector((state:any)=>state.auth.user);
    const dispatch = useDispatch();

   const addNFT = async(event:React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      if(data.get('contract_address')!=='' && data.get('token_id')!==''){
        const credential = {
            contract_address: data.get('contract_address'),
            token_id: data.get('token_id'),
      }
        const tokenData = await getNFT(credential, user.id);
        console.log(tokenData);
        if(tokenData.name){
          if(tokenData.name==="CRYPTOPUNKS"){
            setTokenData(tokenData);
            setImageUrl(tokenData.image);
          }
          else{
            setTokenData(tokenData);
            if(tokenData.image.split('://')[0]=="ipfs"){
              setImageUrl(`https://gateway.ipfs.io/ipfs/${tokenData.image.split('://')[1]}`);
            }
            else{
              setImageUrl(tokenData.image);
            }
            // navigate('/feed');
          }
        }else{
          alert(tokenData.message);
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

    const handleCaptionChange = (event:any) => {
        setCaption(event.target.value)
    }

    return (
        <Box component="div" className="Container" style={{backgroundColor:'#FFFFFF', color:'white', padding:'0px 20px', minHeight:'100vh', display:'flex', flexDirection:'column'}}>
            <Header/>
            <Box component="div" style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Button onClick={()=>{setCreateType(0)}}>Upload Existing</Button>
                <Button onClick={()=>{setCreateType(1)}}>Create new</Button>
            </Box>
{createType===0?
            <Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <Box component="form" style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}} noValidate sx={{ mt: 1 }} onChange={addNFT} onSubmit={createNewPost}>
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
                        sx={{ mt: 3, mb: 2, width:'20%', backgroundColor:'#02F9A7', color:'black' }}
                        // disabled={loading}
                    >
                        Import NFT
                    </Button>
                </Box>
                <Box component="div" style={{backgroundColor:'#02F9A7', height:'400px', width:'400px', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center'}}>
                    <Typography style={{padding:'0px', color:'#000000'}}>{tokenData ? null:'Enter Contract Address and Token Id to import NFT'}</Typography>
                    {tokenData ? <img style={{height:'400px', width:'400px'}} src={`${imageUrl}`} alt="token"/> : null}
                </Box>
            </Box>:
            <Box component="form" style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}} noValidate sx={{ mt: 1 }} onSubmit={addNFT}>
                <TextField
                style={{backgroundColor:'#EEEEEE', margin:10, width:'90%'}}
                margin="normal"
                required
                fullWidth
                name="file"
                type="file"
                id="file"
                autoComplete="file"
                />
                <TextField
                    style={{backgroundColor:'#EEEEEE', margin:10, width:'90%'}}
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="Name"
                    type="text"
                    id="name"
                    helperText="eg: Redeemable T-shirt with logo"
                    autoComplete="name"
                />
                <TextField
                    style={{backgroundColor:'#EEEEEE', margin:10, width:'90%'}}
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    type="text"
                    helperText="eg: After purchasing a real t-shirt will be sent to you"
                    id="description"
                    autoComplete="description"
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width:'20%', backgroundColor:'#02F9A7', color:'black' }}
                    // disabled={loading}
                >
                    Generate
                </Button>
            </Box>}
        </Box>
    )
}

const mapStateToProps = (state:any)=>({
    user: state.auth.user
})

const mapDispatchToProps = (dispatch:any) => ({
    setCredentials: (credentials:any[]) => dispatch(setCredentials(credentials))
})

export default connect(mapStateToProps,mapDispatchToProps)(AddCredential);