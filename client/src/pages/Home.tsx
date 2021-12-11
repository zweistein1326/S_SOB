import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { connect } from 'react-redux';

const Home = (props:any) => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('token') !== null,
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <>
      <Typography variant="h2">Home Page</Typography>
      <Typography>
        You are currently {loggedIn ? '' : 'NOT'} logged-in
      </Typography>
      <Typography>
        Welcome {props.auth.user? props.auth.user.username:''}
      </Typography>
      <Typography>
        You are currently {loggedIn ? '' : 'NOT'} logged-in
      </Typography>

      <Button href="/login">Login</Button>

      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

const mapStateToProps = (state:any) => ({
  auth:state.auth
})

export default connect(mapStateToProps)(Home);
