import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import './register.styles.scss';

import Header from '../../components/header/header.component';
import RegisterUserDetails from '../../components/registerUser/registerUser.component';

const RegisterUser = ({ pateSystem }) => {
    useEffect(() => {}, []);

    return (
        <>
            <Header />

            <div className='pagewrapper'>
                <div className='pageheader'>CREATE AN ACCOUNT</div>
                <RegisterUserDetails />
            </div>
        </>
    );
    // }
};
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
});
export default compose(withRouter, connect(mapStateToProps))(RegisterUser);
