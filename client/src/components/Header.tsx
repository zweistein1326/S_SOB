import { Navigation } from '@mui/icons-material';
import {Button} from '@mui/material'
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import playgroundLogo from '../assets/playground_logo.png'

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
        <Box style={{backgroundColor:'#EEEEEE'}}>
            <img src={playgroundLogo} style={{height:'10vh', width:'20vw'}}/>
        </Box>
        )
}

export default Header;


