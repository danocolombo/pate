import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import Lobby from './pages/lobby/lobby.component';
// import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/signin-and-signup/signin-and-signup.component';
// import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

// import { auth, createUserProfileDocument } from './firebase/firebase.utils';
//----------------------
//AMPLIFY INTEGRATION
//----------------------
import { withAuthenticator } from '@aws-amplify/ui-react';


import CurrentUserContext from './contexts/current-user/current-user.context';

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
            <div>
                <CurrentUserContext.Provider value={this.state.currentUser}>
                    <Header />
                </CurrentUserContext.Provider>
                <Switch>
                    <Route exact path='/' component={Lobby} />
                    {/*  <Route path='/shop' component={ShopPage} />
                      // <Route exact path='/checkout' component={CheckoutPage} /> */}
                    <Route
                        exact
                        path='/signin'
                        render={() =>
                            this.state.currentUser ? (
                                <Redirect to='/' />
                            ) : (
                                <SignInAndSignUpPage />
                            )
                        }
                    />
                </Switch>
            </div>
        );
    }
}

export default withAuthenticator(App);
