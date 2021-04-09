import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import Header from '../../components/header/header.component';
import './support.styles.scss';
const Support = () => {
    return (
        <>
            <Header />
            <div className='support-box'>
                <div className='support-flex-box__container'>
                    <div className='support-flex-box__body'>
                        <h2>Support</h2>
                        <p>
                            If you unfortunately run into issues using the
                            system, please drop an email and describe your
                            situation.
                            <br />
                            <a href='mailto:fortsonguru@gmail.com'>
                                pate.support@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    pateSystem: state.pate,
    currentUser: state.user.currentUser,
    registrations: state.registrations,
});
export default compose(withRouter, connect(mapStateToProps))(Support);
