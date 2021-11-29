import { Button, Typography } from '@mui/material';
import { useState } from 'react';

const Home = () => {
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

      <Button href="/login">Login</Button>

      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default Home;
