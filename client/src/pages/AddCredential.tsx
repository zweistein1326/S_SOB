import { useMutation } from "@apollo/client";
import { Box, Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/actions/credentials";
import { getNFT } from "../functions/axios";
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

    const addNFT = async(event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const credential = {
        contract_address: data.get('contract_address'),
        token_id: data.get('token_id'),
        caption: data.get('caption'),
        private: privacy === 1
        }
        const tokenData = await getNFT(credential, props.user.id); 
        if(tokenData.id){
            props.setCredentials(tokenData);
            setTokenData(tokenData);
            if(tokenData.image.split('://')[0]=="ipfs"){
                console.log(tokenData.image.split('://')[1]);
                setImageUrl(`https://gateway.ipfs.io/ipfs/${tokenData.image.split('://')[1]}`);
            }
            else{
                setImageUrl(tokenData.image);
            }
        }else{
            alert(tokenData.message);
        }
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
                    Import NFT
                </Button>
                {/* <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width:'20%', backgroundColor:'#02F9A7', color:'black' }}
                    // disabled={loading}
                >
                    Generate NFT
                </Button> */}
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