import { useMutation } from '@apollo/client';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import CredentialTile from '../components/CredentialTile';
import { GETUSERBYID } from '../graphql';
import { User } from '../models/User';

const Home = (props:any) => {
  const [loggedIn, setLoggedIn] = useState(
    props.auth.user !==null ,
  );
  const [activeUser,setActiveUser] = useState<any>({});
  const [fetchInfo,{loading,error}] = useMutation(GETUSERBYID);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };
  
  const {id} = useParams();

  const getUserInfo = () =>{
    fetchInfo({
      variables: {
        id
    },
  })
    .then((res)=>{
      let user:User = res.data.getUserById.user;
      setActiveUser(user);
    })
  }

  useEffect(getUserInfo,[])

  return (
    <Box>
    <Box >
    User information
    </Box>
    <>
    {/* <Typography variant="h2">Home Page</Typography> */}
      <Typography>
        {loggedIn && props.auth.user ? '' : 'NOT'} logged-in
      </Typography>
      {loggedIn ?
      <>
        <Typography>
          ID: {activeUser.id} (@{activeUser.username})
        </Typography>
        <Typography>
          Name: {activeUser.firstname} {activeUser.lastname}
        </Typography>
        <Typography>
          Email: {activeUser.email}
        </Typography>
        
        {activeUser.id == props.auth.user.id?
        <>
        <Typography>
          Your saved credentials
        </Typography>
        <Typography>
          Update user information
        </Typography>
        </>:
        null}
        {activeUser.credentials ?
        Object.values(activeUser.credentials).map((credential:any,index:number)=><CredentialTile key={credential.id} credential={credential} title={Object.keys(activeUser.credentials)[index]} />)
          // <Link to={`${activeUser.degreeCertificate.digest}`}><Typography>Degree Certificate</Typography></Link>
        :''}
        <Button onClick={handleLogout}>Logout</Button>
      </>: 
      <Button href="/login">Login</Button>}
    </>
    </Box>
  );
};

const mapStateToProps = (state:any) => ({
  auth:state.auth
})

export default connect(mapStateToProps)(Home);
