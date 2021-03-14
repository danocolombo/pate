import React from 'react';

import { withAuthenticator } from 'aws-amplify';

import Header from '../../components/header/header.component';
import Profile from './profile.component';
import './profile.styles.scss';

const ProfilePage = () => {
    return (
        <>
            <Header />
            <Profile />
        </>
    );
};

export default withAuthenticator(ProfilePage, { includeGreetings: true });
