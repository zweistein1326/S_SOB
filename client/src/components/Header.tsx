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
    const user = useSelector((state:any)=>state.auth.user)
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        props.setLoggedIn(!props.loggedIn);
    };

    const handleLogin = ()=>{

    }

    return(
        <Box component="div" style={{backgroundColor:'transparent', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            {/* <img src={playgroundLogo} style={{height:'10vh', width:'20vw'}}/> */}
            <Typography style={{color:'#02F9A7', fontSize:'22px', fontWeight:'bold'}}>Playground</Typography>
            {filters.text ==='' ? null :
                <Box component="div" style={{ width:'100%', height:'10%'}}>
                    {allUsers.map((user:any)=><Link to={`/${user.id}`} onClick={()=>{dispatch(searchByText(''))}}><Typography style={{color:'black'}}>{user.username}</Typography></Link>)}
                </Box>
            }
            <Box component="div" style={{width:'100%', backgroundColor:'transparent', display:'flex', justifyContent:'center', alignItems:'center', zIndex:9999}}>
                <Input name="search_text" placeholder="Search by Username, Address" value={filters.text} onChange={(event)=>{dispatch(searchByText(event.target.value))}} disableUnderline={true} style={{ width:'80%',backgroundColor:'rgba(0,0,0,1)', color:'white', margin:'10px 0px', padding:'15px 20px', borderRadius:'5px'}}/>
            </Box>
            <Link to='/feed' style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 0px', backgroundColor:'#000000', width:'20%', display:'flex', justifyContent:'center',textDecoration:'none', color:'#02F9A7'}}>
                <Box component="div">
                    Feed
                </Box>
            </Link>
            {/* <Box style={{padding:'25px 10px', margin:'10px 0px',backgroundColor:'#777777', width:'90%', display:'flex', justifyContent:'center'}}>
                <Link to='/addCredential' style={{textDecoration:'none', color:'white'}}>Add NFT</Link>
            </Box> */}
            <Link to={`/${user.id}`} style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 0px', backgroundColor:'#000000', width:'20%', display:'flex', justifyContent:'center',textDecoration:'none', color:'#02F9A7'}}>
                <Box component="div">
                    My Portfolio
                </Box>        
            </Link>
            <Link to='/settings' style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 0px', backgroundColor:'#000000', width:'20%', display:'flex', justifyContent:'center',textDecoration:'none', color:'#02F9A7'}}>
                <Box component="div">
                    Settings
                </Box>
            </Link>
            {/* <Link to='/addCredential' style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 0px', backgroundColor:'#02F9A7', width:'20%', display:'flex', justifyContent:'center', textDecoration:'none', color:'#000000'}} onClick={()=>{}}>
                <Box>
                    +Add NFT
                </Box>
            </Link> */}
        </Box>
        )
}

export default Header;


