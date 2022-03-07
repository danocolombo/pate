import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import './register.styles.scss';

import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import RegisterUserDetails from '../../components/registerUser/registerUser2.component';

const RegisterUser = ({ pateSystem }) => {
    useEffect(() => {}, []);

    return (
        <>
            <Header />

            <div className='register-user-page__wrapper'>
                {/* <div className='register-user-page__page-header'>
                    CREATE AN ACCOUNT
                </div> */}
                <RegisterUserDetails />
                {/* <div className='register-user-page__offer-confirm-box'>
                    Have you registered and need to confirm your account?
                    <Link
                        className='register-user-page__confirmation-link'
                        to='/confirmUser/0'
                    >
                        {' '}
                        Click here
                    </Link>
                </div> */}
            </div>
            <MainFooter />
        </>
    );
    // }
};
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
});
export default compose(withRouter, connect(mapStateToProps))(RegisterUser);
