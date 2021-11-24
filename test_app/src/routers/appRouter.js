import React from 'react';
import {
    Router,
    Switch,
    Route,
    Link,
    BrowserRouter
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import Dashboard from '../components/dashboard'
import AddExpenditure from '../components/AddExpenditure/AddExpenditure';
// import InputBudget from '../components/inputBudget';
import NotFoundPage from '../components/404';
import Header from '../components/Header/Header';
import EditExpensePage from '../components/EditExpensePage/EditExpensePage';
import LoginPage from '../components/LoginPage/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import HomePage from '../components/HomePage/HomePage';
export const history = createBrowserHistory();

const AppRouter = () => {
    return (
        <Router history={history}>
            <BrowserRouter>
                <Switch>
                    <PublicRoute exact={true} path='/' component={LoginPage} />
                    <PrivateRoute path='/dashboard' component={Dashboard} />
                    <PrivateRoute path='/home' component={HomePage} />
                    <PrivateRoute path='/addExpense' component={AddExpenditure} />
                    <PrivateRoute path='/editExpense/:id' component={EditExpensePage} />
                    <PublicRoute component={NotFoundPage} />
                </Switch>
            </BrowserRouter>
        </Router>

    );
}

export default AppRouter;