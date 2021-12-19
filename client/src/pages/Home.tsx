import { useMutation } from '@apollo/client';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import CredentialTile from '../components/CredentialTile';
import { GETUSERBYID } from '../graphql';

const Home = (props:any) => {
  const [loggedIn, setLoggedIn] = useState(
    props.auth.user !==null ,
  );
  const [fetchInfo,{loading,error}] = useMutation(GETUSERBYID);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };
  
  const {id} = useParams();

  console.log(props.auth.user.credentials);

  const getUserInfo =() =>{
    fetchInfo({variables:{id:id}}).then((res)=>{console.log(res)})
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
      {loggedIn && props.auth.user?
      <>
        <Typography>
          ID: {props.auth.user.id} (@zweistein1326)
        </Typography>
        <Typography>
          Username: {props.auth.user.username}
        </Typography>
        <Typography>
          Name: {props.auth.user.firstname} {props.auth.user.lastname}
        </Typography>
        <Typography>
          Email: {props.auth.user.email}
        </Typography>
        <Typography>
          Username: {props.auth.user.username}
        </Typography>
        <Typography>
          Update user information
        </Typography>
        <Typography>
          Your saved credentials
        </Typography>
        {props.auth.user.credentials ?
        Object.values(props.auth.user.credentials).map((credential:any,index:number)=><CredentialTile key={credential.id} credential={credential} title={Object.keys(props.auth.user.credentials)[index]} />)
          // <Link to={`${props.auth.user.degreeCertificate.digest}`}><Typography>Degree Certificate</Typography></Link>
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
