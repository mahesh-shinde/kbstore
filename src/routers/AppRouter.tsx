import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from '../Components/Header';
import Login from '../Pages/Login';
import User from '../Pages/User';
import Admin from '../Pages/Admin';
import AddEdit from '../Pages/AddEdit';

const AppRouter = () => {
    return(
    <BrowserRouter>
    <div>
        <Header/>
        <Switch>
            <Route path="/" component={Login} exact={true}></Route>
            <Route path="/User" component={User}></Route>
            <Route path="/Admin" component={Admin}></Route>
            <Route path="/AddEdit" component={AddEdit}></Route>
        </Switch>
    </div>
    </BrowserRouter>
    )
}

export default AppRouter;