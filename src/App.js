import React, { useState, useEffect } from 'react';
import {
    Switch,
    Route,
    Redirect,
    BrowserRouter as Router,
} from 'react-router-dom';

import './App.css';
import AdminPage from './pages/admin/admin-page';
import Administer from './pages/admin/admin-feature-page';
import RegisteredUserDetails from './pages/admin/admin-registered-user-details.page';
import Events from './pages/events/events.component';
import Profile from './pages/profile/profile.page';
import SignIn from './pages/signin/signin.page';
import Register from './pages/registerUser/registerUser.page';
import ConfirmUser from './pages/registerUser/confirmUser.page';
import PrivatePage from './pages/privatePage/privatePage';
import EventDetails from './pages/event/event.page';
import EventRegistration from './pages/registration/registration.page';
import FAQ from './pages/faq/faq.page';
import Serve from './pages/serve/serve.page';
import ServeEvent from './pages/serveEvent/serveEvent.page';
import EditRegistration from './pages/edit-registration/edit-registration.page';
import Alert from './components/alert/alert.component';
import Support from './pages/support/support.page';
import Help from './pages/help/help.page';

import Leroy from './pages/junkyard/junkyard';
//----------------------
//AMPLIFY INTEGRATION
//----------------------
// import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';

function App() {
    return (
        <>
            <section className='landing'>
                <Alert />
                <Router>
                    <Route exact path='/admin' component={AdminPage} />
                    <Route path='/administer/:option' component={Administer} />
                    <Route path='/junkyard' component={Leroy} />
                    <Route exact path='/' component={Events} />
                    <Route path='/faq' component={FAQ} />
                    <Route path='/help' component={Help} />
                    {/*  <Route path='/shop' component={ShopPage} />
                      // <Route exact path='/checkout' component={CheckoutPage} /> */}
                    <Route exact path='/profile' component={Profile} />
                    <Route path='/signin' render={() => <SignIn />} />
                    <Route exact path='/register' component={Register} />
                    <Route
                        exact
                        path='/confirmUser/:id'
                        component={ConfirmUser}
                    />
                    <Route exact path='/privatepage' component={PrivatePage} />
                    <Route exact path='/serve' component={Serve} />
                    <Route exact path='/support' component={Support} />
                    <Route
                        exact
                        path='/serveevent/:id'
                        component={ServeEvent}
                    />
                    <Route
                        exact
                        path='/registereduserdetails/:id'
                        component={RegisteredUserDetails}
                    />
                    <Route
                        exact
                        path='/registration/:id'
                        component={EventRegistration}
                    />
                    <Route
                        exact
                        path='/editregistration/:eid/:rid'
                        component={EditRegistration}
                    />
                    <Route exact path='/event/:id' component={EventDetails} />
                </Router>
            </section>
        </>
    );
    // }
}

export default App;
//<Header loggedIn={isLoggedIn} onClick={signOut} />
