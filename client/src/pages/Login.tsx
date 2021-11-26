import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { gql, useMutation } from "@apollo/client";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LOGIN = gql`
	fragment Payload on REST {
    email: String
		password: String
  }
	mutation Login ($input: Payload!) {
    login (input: $input) @rest(type: "Post", method: "Post" path: "/login") {
      status
			token
			message
    }
  }
`

const Login = () => {
	const navigate = useNavigate();
	const [message, setMessage] = useState(null);
	const [submitLogin, { loading, error }] = useMutation(LOGIN);

  if (error) return  <>`Submission error! ${error.message}`</>;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
		const payload = {
      email: data.get('email'),
      password: data.get('password'),
    }

    // eslint-disable-next-line no-console 
    console.log(payload);

		submitLogin({
			variables: {
				input: payload,
			}
		}).then(res => { 
			const { status, token, message } = res.data.login;
			if (status === 'success') {
				localStorage.setItem('token', token);
				navigate('/');
			} else {
				setMessage(message);
			}
		});
  };
	
  return (
    <Container component="main" maxWidth="xs">
    <Box
			sx={{
			marginTop: 8,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			}}
    >
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
			<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign in
			</Typography>
			{message && (
				<Typography variant="body1" color="red" sx={{ mt: 2 }}>
					{message}
				</Typography>
			)}
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
			<TextField
				margin="normal"
				required
				fullWidth
				id="email"
				label="Email Address"
				name="email"
				autoComplete="email"
				autoFocus
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				name="password"
				label="Password"
				type="password"
				id="password"
				autoComplete="current-password"
			/>
			<FormControlLabel
				control={<Checkbox value="remember" color="primary" />}
				label="Remember me"
			/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
				disabled={loading}
			>
				Sign In
			</Button>
			<Grid container>
				<Grid item xs>
				<Link href="#" variant="body2">
					Forgot password?
				</Link>
				</Grid>
				<Grid item>
				<Link href="#" variant="body2">
					{"Don't have an account? Sign Up"}
				</Link>
				</Grid>
			</Grid>
			</Box>
    </Box>
    </Container>
  );
}

export default Login;
