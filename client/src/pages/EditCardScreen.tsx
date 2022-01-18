import { Label } from '@mui/icons-material';
import { Input } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Card from '../components/Card';

const EditCardScreen = (props:any) => {

    const [linkedin, setLinkedin] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [bio, setBio] = useState('');

    return(
        <Box>
            <Card user={props.user}/>
            <Box>
                <Label>Bio</Label>
                <Input name='bio' placeholder='A little about you' value={bio} onChange={(event)=>{setBio(event.target.value)}}/>
            </Box>
            <Box>
                <Label>Twitter</Label>
                <Input name='twitter' placeholder='www.twitter.com/' value={twitter} onChange={(event)=>{setTwitter(event.target.value)}}/>
            </Box>
            <Box>
                <Label>Facebook</Label>
                <Input name='facebook' placeholder='www.facebook.com/' value={facebook} onChange={(event)=>{setFacebook(event.target.value)}}/>
            </Box>
            <Box>
                <Label>Instagram</Label>
                <Input name='instagram' placeholder = 'www.instagram.com/' value={instagram} onChange={(event)=>{setInstagram(event.target.value)}}/>
            </Box>
            <Box>
                <Label>Linkedin</Label>
                <Input name='linkedIn' placeholder = 'www.linkedin.com/' value={linkedin} onChange={(event)=>{setLinkedin(event.target.value)}}/>
            </Box>
        </Box>
    );
}

const mapStateToProps = (state:any) => ({
    user: state.auth.user
})

export default connect(mapStateToProps,null)(EditCardScreen);