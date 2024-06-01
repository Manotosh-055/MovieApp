import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Watchlist } from "./components/Watchlist";
import { Watched } from "./components/Watched";
import { Add } from "./components/Add";
import "./App.css";
import "./lib/font-awesome/css/all.min.css";

import { GlobalProvider } from "./context/GlobalState";
import Login from "./components/login";
import Signup from "./components/signup";
import { Home } from "./components/Home";



function App() {
   const user = localStorage.getItem('userInfo');
    
    return (
        <GlobalProvider>
            <Router>
            {user && <Header />}
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/watchlist">
                        <Watchlist />
                    </Route>

                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/add">
                        <Add />
                    </Route>
                    <Route path="/watched">
                        <Watched />
                    </Route>
                </Switch>
            </Router>
        </GlobalProvider>
    );
}

export default App;
