import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { match } from 'react-router-dom';
import { withRouter } from 'react-router';

import './register.styles.scss';

import Header from '../../components/header/header.component';
import ConfirmUserDetails from '../../components/confirmUser/confirmUser.component';

const ConfirmUser = ({ pateSystem, match }) => {
    useEffect(() => {}, []);
    console.log('match:' + match.params.id);
    return (
        <>
            <Header />

            <div className='pagewrapper'>
                <div className='pageheader'>CONFIRM REGISTRATION</div>
                <ConfirmUserDetails id={match.params.id} />
            </div>
        </>
    );
    // }
};
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
});
export default compose(withRouter, connect(mapStateToProps))(ConfirmUser);
//
