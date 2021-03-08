import React, {useState, useEffect} from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Header from './components/header/header.component';
import Lobby from './pages/lobby/lobby.component';
import Profile from './pages/profile/profile.component';
import SignIn from './pages/signin/signin.component';
//----------------------
//AMPLIFY INTEGRATION
//----------------------
// import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth, authSignInButton } from 'aws-amplify';


function App()  {
    
    const [isLoggedIn, setLoggedIn] = useState(false);
    const checkLoggedInState = () => {
        Auth.currentAuthenticatedUser()
        .then(sess  => {
            console.log('logged in');
            setLoggedIn(true);
        })
        .catch(() => {
            console.log('not logged in');
            setLoggedIn(false);
        });
    };
    useEffect(() => {
        checkLoggedInState();
    }, []);
    const signOut = async () => {
        try {
            await Auth.signOut();
            setLoggedIn(false);
        } catch (error) {
            console.log('Error logging out:\n:' + error);
        }
    }
    
    // render() {
        return (
            
            <Router>
                <Header loggedIn={isLoggedIn} onClick={signOut}/>
                <Route exact path='/' component={Lobby} />
                    {/*  <Route path='/shop' component={ShopPage} />
                      // <Route exact path='/checkout' component={CheckoutPage} /> */}
                <Route exact path='/profile' component={Profile}/>
                <Route path='/signin' 
                      render={() => (
                        <SignIn onLoadEvent={checkLoggedInState}/>
                      )}/>
            </Router>
        );
    // }
}

export default App;
