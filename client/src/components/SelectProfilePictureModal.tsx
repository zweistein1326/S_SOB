import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { getCredentialById, updateUser } from '../functions/axios';
import PPTile from './ProfilePictureTile';


export default function SelectProfilePictureModal(props:any){
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const [activeCredentials,setActiveCredentials] = useState<any>([]);
    const dispatch = useDispatch(); 
    const modalIsOpen = true;

    const afterOpenModal = (event:any) => {

    }

    const loadNFTs = async(user:any) => {
    let activeCreds:any = [];
    if(user && user.credentials){
      console.log(user.credentials);
      if(activeCreds.length < user.credentials.length){
        await Promise.all(user.credentials).then(async(credentialIds:any)=>{
          await credentialIds.forEach(async(credentialId:string)=>{
          const credential:any = await dispatch(getCredentialById(credentialId));
          activeCreds.push(credential.credential);
          if(activeCreds.length===user.credentials.length){
            setActiveCredentials(activeCreds);
            Promise.resolve();
          }
          })
        });
      }
    else{
        setActiveCredentials([]);
        }
      }
    }   

    useEffect(()=>{
        loadNFTs(props.user);
        if(props.user.credentials){
            props.user.credentials.forEach(async(credentialId:string,index:number)=>{
            setActiveCredentials([...activeCredentials,credentialId].sort((a:any,b:any)=>b.iat-a.iat))
    });
      }
    },[])

    const changeProfilePicture = (imageUrl:any) => {
        dispatch(updateUser({...props.user, profileImageUrl:imageUrl}));
        props.closeModal();
    }

    return(
        <Box component="div">
            <Modal
            isOpen = {props.isModalActive}
            onAfterOpen = {afterOpenModal}
            onRequestClose = {props.closeModal}
            contentLabel = "Example Modal"
            style={{
                overlay:{
                    zIndex:12
                }
            }}
            >
                <Box component="div" style={{display:'flex', justifyContent:'space-between'}}>
                    <Typography style={{textAlign:'center', flex:1, fontSize:'24px', fontWeight:'bold'}}>Select Profile Picture</Typography>
                    <Button onClick={props.closeModal}>X</Button>
                </Box>
                <Grid container columns={3} style={{justifyContent:'center'}}>
                    {
                        activeCredentials?
                        (activeCredentials.map((nft:any,index:number)=>(
                            // <Box component="div" key={index} style={{border:'1px solid black', margin:'10px', boxShadow:'10px 10px', borderRadius:'20px', overflow:'hidden' }} onClick={()=>{navigate(`/credential/${nft.id}`)}}>
                            //     <img width="400px" src={nft.image}/>
                            //     <Box component="div" style={{padding:'20px'}}>
                            //         <Typography style={{fontSize:'20px',fontWeight:'semi-bold', color:'black'}}>{nft.name} #{nft.token_id}</Typography>
                            //         <Box component="div" style={{overflow:'hidden'}}>
                            //             <Typography style={{color:'gray'}}>{nft.description}</Typography>
                            //         </Box>
                            //     </Box>
                            // </Box>       
                            <PPTile changeProfilePicture={changeProfilePicture} credentialId={nft.id} key={index}/>
                            )).reverse()
                        )
                        :
                        null
                    }
                </Grid>
            </Modal>
        </Box>
    )
}