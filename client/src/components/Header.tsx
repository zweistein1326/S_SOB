import { Navigation } from '@mui/icons-material';
import {Button} from '@mui/material'
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const Header = (props:any) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        props.setLoggedIn(!props.loggedIn);
    };

    const handleLogin = ()=>{

    }

    return(
        <Box>
            {props.loggedIn? <Button onClick={handleLogout}>Logout</Button>: <Button href="/register">Login</Button>}
            <Button onClick={()=>{navigate('/')}}>Home</Button>
            <Button onClick={()=>{navigate('/addCredential')}}>Add</Button>
        </Box>
        )
}

export default Header;


