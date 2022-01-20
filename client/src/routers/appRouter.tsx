import { BrowserRouter, Router, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import {createBrowserHistory} from 'history';
import Home from "../pages/UserProfile";
import Register from "../pages/Register";
import AddCredential from "../pages/AddCredential";

export const history = createBrowserHistory();

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <PublicRoute path="/" component={AddCredential} />
                <PublicRoute path="/register" component={Register} />
                <PrivateRoute path="/user/:id" component={Home} />
                <PrivateRoute path="/addCredential" component={AddCredential} />
                {/* <PublicRoute component={NotFoundPage} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;