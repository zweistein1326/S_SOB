import { Navigation } from '@mui/icons-material';
import {Button, Input, Typography} from '@mui/material'
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import playgroundLogo from '../assets/playground_logo.png'
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
        <Box component="div" style={{backgroundColor:'transparent', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            {/* <img src={playgroundLogo} style={{height:'10vh', width:'20vw'}}/> */}
            <Typography onClick={()=>{navigate('/feed')}} style={{color:'#02F9A7', fontSize:'22px', fontWeight:'bold'}}>Playground</Typography>
            <Box component="div" style={{width:'100%', position:'relative', padding:'0px 20px', display:'flex', flexDirection:'row'}}>
                <Box component="div" style={{width:'100%', backgroundColor:'transparent', display:'flex', justifyContent:'center', alignItems:'center', zIndex:9999}}>
                    <Input name="search_text" placeholder="Search by Username, Address" value={filters.text} onChange={(event)=>{dispatch(searchByText(event.target.value))}} disableUnderline={true} style={{ width:'100%',backgroundColor:'rgba(0,0,0,1)', color:'white', margin:'10px 0px', padding:'15px 20px', borderRadius:'5px'}}/>
                </Box>
                {filters.text ==='' ? null :
                    <Box component="div" style={{ width:'10%', height:'100%', overflowY:'scroll'}}>
                        {allUsers.map((user:any)=><Link to={`/${user.id}`} onClick={()=>{dispatch(searchByText(''))}}><Typography style={{color:'white'}}>{user.username}</Typography></Link>)}
                    </Box>
                }
            </Box>
            <Link to='/feed' style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 0px', backgroundColor:'#000000', width:'20%', display:'flex', justifyContent:'center',textDecoration:'none', color:'#02F9A7'}}>
                <Box component="div">
                    Home
                </Box>
            </Link>
            {/* <Box style={{padding:'25px 10px', margin:'10px 0px',backgroundColor:'#777777', width:'90%', display:'flex', justifyContent:'center'}}>
                <Link to='/addCredential' style={{textDecoration:'none', color:'white'}}>Add NFT</Link>
            </Box> */}
            <Link to={`/${user.id}`} style={{padding:'20px 10px',borderRadius:'30px', margin:'20px 0px', backgroundColor:'#000000', width:'20%', display:'flex', justifyContent:'center',textDecoration:'none', color:'#02F9A7'}}>
                <Box component="div">
                    Profile
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


