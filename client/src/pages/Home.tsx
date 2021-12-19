import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const Home = (props:any) => {
  const [loggedIn, setLoggedIn] = useState(
    props.auth.user !==null ,
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };
  
  const {id} = useParams();

  console.log('currentUser: ',id);
  console.log('loggedIn user: ',props.auth.user.id);

  // const currentUserData;

  const getUserInfo =() =>{
    //
  }

  // useEffect(getUserInfo,[]);

  return (
    <>
      <Typography variant="h2">Home Page</Typography>
      <Typography>
        You are currently {loggedIn && props.auth.user ? '' : 'NOT'} logged-in
      </Typography>
      {loggedIn && props.auth.user?
      <>
        <Typography>
        Welcome {props.auth.user.username}
        </Typography>
        <Typography>
          Your saved credentials
        </Typography>
        {props.auth.user.degreeCertificate ?
          <Link to={`${props.auth.user.degreeCertificate.digest}`}><Typography>Degree Certificate</Typography></Link>
        :''}
        <Button onClick={handleLogout}>Logout</Button>
      </>: 
      <Button href="/login">Login</Button>}
    </>
  );
};

const mapStateToProps = (state:any) => ({
  auth:state.auth
})

export default connect(mapStateToProps)(Home);
