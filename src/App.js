import React from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Header from './components/header/header.component';
import Lobby from './pages/lobby/lobby.component';
import Profile from './pages/profile/profile.component';
// import ShopPage from './pages/shop/shop.component';
// import SignInAndSignUpPage from './pages/signin-and-signup/signin-and-signup.component';
// import CheckoutPage from './pages/checkout/checkout.component';



// import { auth, createUserProfileDocument } from './firebase/firebase.utils';
//----------------------
//AMPLIFY INTEGRATION
//----------------------
import { withAuthenticator } from '@aws-amplify/ui-react';


// import CurrentUserContext from './contexts/current-user/current-user.context';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            currentUser: null,
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
        };
    }

    // unsubscribeFromAuth = null;

    componentDidMount() {
        // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        //     if (userAuth) {
        //         const userRef = await createUserProfileDocument(userAuth);
        //         userRef.onSnapshot((snapShot) => {
        //             this.setState({
        //                 currentUser: {
        //                     id: snapShot.id,
        //                     ...snapShot.data(),
        //                 },
        //             });
        //         });
        //     }
        //     this.setState({ currentUser: userAuth });
        // });
    }

    componentWillUnmount() {
        // this.unsubscribeFromAuth();
    }

    render() {
        return (
            
            <Router>
                <Header/>
                <Route exact path='/' component={Lobby} />
                    {/*  <Route path='/shop' component={ShopPage} />
                      // <Route exact path='/checkout' component={CheckoutPage} /> */}
                <Route exact path='/profile' component={Profile}/>
            </Router>
        );
    }
}

export default withAuthenticator(App);
