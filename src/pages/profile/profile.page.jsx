import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { withAuthenticator } from '@aws-amplify/ui-react';

import './profile.styles.scss';

import Header from '../../components/header/header.component';
import PersonalProfile from '../../components/profile/profile.component';

import { setCurrentUser } from '../../redux/user/user.actions';

const UserProfile = () => {
    
    
    

    // render() {
        return (
            <>
                <Header />

                <div className='profilepagewrapper'>
                    <div className='pageheader'>PERSONAL PROFILE</div>
                    <PersonalProfile />
                </div>
            </>
        );
    // }
}
export default compose(withAuthenticator, withRouter)(UserProfile);
