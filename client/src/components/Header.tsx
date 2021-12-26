import {Button} from '@mui/material'

const Header = (props:any) => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        props.setLoggedIn(!props.loggedIn);
    };

    const handleLogin = ()=>{

    }

    return(
        props.loggedIn? <Button onClick={handleLogout}>Logout</Button>: <Button href="/login">Login</Button>
        )
}

export default Header;


