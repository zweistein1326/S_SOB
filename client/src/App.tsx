import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/UserProfile';
import Register from './pages/Register';
import { useEffect } from 'react';
import AddCredential from './pages/AddCredential';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import Header from './components/Header';
import './styles/index.css';
import Feed from './pages/Feed';
import NFTScreen from './pages/CredentialScreen';
import { getAllUsers, getCredentials } from './functions/axios';
import SettingsScreen from './pages/SettingsScreen';
import {uploadBytes} from 'firebase/storage';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { connector } from './functions/walletConnector';

declare var window: any;

const {ethereum} = window;

const connectWalletHandler = async () => {
  try{
    const accounts = await ethereum.request({method: 'eth_requestAccounts'});
    console.log('account', accounts[0]);
    console.log("Wallet exists! We're ready to go!");
  } catch(err){
    console.log(err);
  }
}

export const store = configureStore();
  
function App() {  

  useEffect(()=>{
    // connectWalletHandler();
    store.dispatch(getCredentials());
    store.dispatch(getAllUsers());
  },[])

  return (
      <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/:address" element={<Home />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/credential/:credentialId" element={<NFTScreen />} />
          <Route path="/addCredential" element={<AddCredential />} />
        </Routes>
      </Router>
      </Provider>
  );
}

export default App;
