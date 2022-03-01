import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import Home from './pages/UserProfile';
import Register from './pages/Register';
import { useEffect, useState } from 'react';
import AddCredential from './pages/AddCredential';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import Header from './components/Header';
import './styles/index.css';
import Feed from './pages/Feed';
import NFTScreen from './pages/CredentialScreen';
import {
  getAllUsers,
  getCredentials,
  getUserById,
  register,
} from './functions/axios';
import SettingsScreen from './pages/SettingsScreen';
import { uploadBytes } from 'firebase/storage';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { connector } from './functions/walletConnector';
import { setFollowing, setUser } from './redux/actions/user';
import NotificationsScreen from './pages/NotificationsScreen';
// import './assets/main.css';

// import * as firebase from 'firebase/app';
// import { firebaseConfig } from './firebase/firebase';

declare var window: any;

const { ethereum } = window;

const connectWalletHandler = async () => {
  try {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log('account', accounts[0]);
    console.log("Wallet exists! We're ready to go!");
  } catch (err) {
    console.log(err);
  }
};

export const store = configureStore();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // connectWalletHandler();
    var userId: any;
    try {
      userId = window.localStorage.getItem('userId');
      if(!userId){
        setIsLoggedIn(false);
      }
    } catch (e) {
      console.log(e);
    }
    (async () => {
      store.dispatch(getAllUsers());
      store.dispatch(getCredentials());
      if (userId) {
        const user: any = await store.dispatch(getUserById(userId));
        console.log(user);
        if (!!user) {
          console.log(user.user.following);
          await store.dispatch(setFollowing(user.following));
          store.dispatch(setUser(user.user));
          setIsLoggedIn(true);
        }
      }
    })();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Feed /> : <Register />} />
          <Route path="/:address" element={<Home />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
          <Route path="/credential/:credentialId" element={<NFTScreen />} />
          <Route path="/addCredential" element={<AddCredential />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
