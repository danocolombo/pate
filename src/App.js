import React, { useState, useEffect } from 'react';
import {
    Switch,
    Route,
    Redirect,
    BrowserRouter as Router,
} from 'react-router-dom';

import './App.css';
//import Lobby from './pages/lobby/lobby.component';
import Events from './pages/events/events.component';
import Profile from './pages/profile/profile.component';
import SignIn from './pages/signin/signin.component';
import Register from './pages/registerUser/registerUser.component';
//----------------------
//AMPLIFY INTEGRATION
//----------------------
// import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    // const checkLoggedInState = () => {
    //     Auth.currentAuthenticatedUser()
    //         .then((sess) => {
    //             console.log('logged in');
    //             setLoggedIn(true);
    //         })
    //         .catch(() => {
    //             console.log('not logged in');
    //             setLoggedIn(false);
    //         });
    // };
    // useEffect(() => {
    //     checkLoggedInState();
    // }, []);
    // const signOut = async () => {
    //     try {
    //         await Auth.signOut();
    //         setLoggedIn(false);
    //     } catch (error) {
    //         console.log('Error logging out:\n:' + error);
    //     }
    // };

    // render() {
    return (
        <Router>
            <Route exact path='/' component={Events} />
            {/*  <Route path='/shop' component={ShopPage} />
                      // <Route exact path='/checkout' component={CheckoutPage} /> */}
            <Route exact path='/profile' component={Profile} />
            <Route path='/signin' render={() => <SignIn />} />
            <Route exact path='/register' component={Register} />
        </Router>
    );
    // }
}

export default App;
//<Header loggedIn={isLoggedIn} onClick={signOut} />
