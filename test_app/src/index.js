import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { firebase } from './firebase/firebase'
import AppRouter, { history } from './routers/appRouter';
import { startSetExpenses } from './actions/expenses';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import './App.css';

export const store = configureStore();


let hasRendered = false;
console.log(process.env)

const jsx = (
  <div className="App">
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </div>
);

export const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(
      jsx,
      document.getElementById('root')
    );
    hasRendered = true;
  }
}

ReactDOM.render(
  <p>Loading...</p>,
  document.getElementById('root')
);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid))
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard')
      }
    })
  }
  else {
    store.dispatch(logout())
    renderApp();
    history.push('/');
  }
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
