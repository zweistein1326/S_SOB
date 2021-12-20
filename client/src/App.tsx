import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import CredentialPage from './pages/CredentialPage';

const restLink = new RestLink({ uri: '/api' });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
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
