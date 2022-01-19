import { Navigation } from '@mui/icons-material';
import {Button, Input, Typography} from '@mui/material'
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import playgroundLogo from '../assets/playground_logo.png'
import { searchByText } from '../redux/actions/filters';

const Header = (props:any) => {

    const navigate = useNavigate();
    const filters = useSelector((state:any)=>state.filters)
    const allUsers = useSelector((state:any)=>state.auth.allUsers)
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        props.setLoggedIn(!props.loggedIn);
    };

    const handleLogin = ()=>{

    }

    return(
        <Box style={{backgroundColor:'transparent', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            {/* <img src={playgroundLogo} style={{height:'10vh', width:'20vw'}}/> */}
            <Typography style={{color:'black'}}>P</Typography>
            {filters.text ==='' ? null :
                    <Box style={{ width:'100%', height:'10%'}}>
                        {allUsers.map((user:any)=>{return(<Link to={`/${user.id}`} onClick={()=>{dispatch(searchByText(''))}}><Typography style={{color:'black'}}>{user.username}</Typography></Link>)})}
                    </Box>
                }
                <Box style={{width:'100%', backgroundColor:'transparent', display:'flex', justifyContent:'center', alignItems:'center', zIndex:9999}}>
                    <Input name="search_text" placeholder="Search by Username, Address" value={filters.text} onChange={(event)=>{dispatch(searchByText(event.target.value))}} disableUnderline={true} style={{ width:'80%',backgroundColor:'rgba(0,0,0,1)', color:'white', margin:'10px 0px', padding:'15px 20px', borderRadius:'5px'}}/>
                </Box>
        </Box>
        )
}

export default Header;


