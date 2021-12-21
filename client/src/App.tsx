import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import CredentialPage from './pages/CredentialPage';
import { useEffect } from 'react';

declare var window: any;

const restLink = new RestLink({ uri: '/api' });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink,
});

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

function App() {

  useEffect(()=>{
    connectWalletHandler();
  },[])

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:id" element={<Home />} />
          <Route path="/user/:id/:credentialId" element={<CredentialPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
