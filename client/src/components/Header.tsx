import { Navigation } from '@mui/icons-material';
import {Button, Input, Typography} from '@mui/material'
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import playgroundLogo from '../assets/logos/playground_logo.png'
import { searchByText } from '../redux/actions/filters';
import selectUsers from '../redux/selectors/users'; 


const Header = (props:any) => {

    const navigate = useNavigate();
    const filters = useSelector((state:any)=> state.filters)
    console.log(filters);
    const allUsers = useSelector((state:any)=> selectUsers(state.auth.allUsers,{text:filters.text}));
    console.log(allUsers);
    const user = useSelector((state:any)=>state.auth.user)
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        props.setLoggedIn(!props.loggedIn);
    };

    return(
        <Box component="div" style={{backgroundColor:'transparent', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', height:'8vh', padding:'10px'}}>
            {/* <img src={playgroundLogo} style={{height:'10vh', width:'20vw'}}/> */}
            <Typography onClick={()=>{navigate('/feed')}} style={{color:'#02F9A7', fontSize:'22px', fontWeight:'bold', cursor:'pointer'}}>Playground</Typography>
            <Box component="div" style={{width:'100%', position:'relative', padding:'0px 20px', display:'flex', flexDirection:'row'}}>
                <Box component="div" style={{width:'100%', backgroundColor:'transparent', display:'flex', justifyContent:'center', alignItems:'center', zIndex:10, flexDirection:'column', position:'relative'}}>
                    <Input name="search_text" placeholder="Search" value={filters.text} onChange={(event)=>{dispatch(searchByText(event.target.value))}} disableUnderline={true} style={{ width:'100%',backgroundColor:'rgba(2, 249, 167,1)', color:'black', margin:'10px 0px', padding:'10px 20px', borderRadius:'520px', fontSize:'14px', fontStyle:'italic'}}/>
                    {filters.text ==='' ? null :
                    <Box component="div" style={{ width:'100%', height:'20vh', overflowY:'scroll', backgroundColor:'rgba(2, 249, 167,1)', position:'absolute', bottom:'-18vh',borderRadius:'20px'}}>
                        {allUsers.map((user:any)=>
                        <Box component="div" style={{display:'flex', flexDirection:'row', alignItems:'center', padding:'0px 20px' }}>
                            {user.profileImageUrl ? <img src={`${user.profileImageUrl}`} style={{ width:'40px', height:'40px', borderRadius:'50%'}}/>:<Box component="div" style={{width:'40px', height:'40px', borderRadius:'50%',backgroundColor:'pink'}}></Box>}
                            <Link to={`/${user.id}`} onClick={()=>{dispatch(searchByText(''))}}><Typography style={{color:'black', padding:'20px'}}>{user.username}</Typography></Link>
                        </Box>)}
                    </Box>
                }
                </Box>
            </Box>
            <Link to='/feed' style={{padding:'10px',borderRadius:'30px', margin:'20px 10px', backgroundColor:'transparent', width:'10%', display:'flex', justifyContent:'center',textDecoration:'none', color:'#000000', fontFamily:'sans-serif'}}>
                Home
            </Link>
            <Link to={`/${user.id}`} style={{padding:'10px',borderRadius:'30px', margin:'20px 10px', backgroundColor:'transparent', width:'10%', display:'flex', justifyContent:'center',textDecoration:'none', color:'#000000', fontFamily:'sans-serif'}}>
                Profile
            </Link>
            <Link to='/settings' style={{padding:'10px',borderRadius:'30px', margin:'20px 10px', backgroundColor:'transparent', width:'10%', display:'flex', justifyContent:'center',textDecoration:'none', color:'#000000', fontFamily:'sans-serif'}}>
                Settings
            </Link>
            {/* <Link to='/settings' style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 10px', backgroundColor:'#000000', width:'10%', display:'flex', justifyContent:'center',textDecoration:'none', color:'#02F9A7', fontFamily:'sans-serif'}}>
                20JUMP
            </Link> */}
        </Box>
        )
}

export default Header;


