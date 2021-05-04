import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
import Header from '../../components/header/header.component';
import { Link } from 'react-router-dom';
import {
    setSpinner,
    clearSpinner,
    clearTmpUser,
    loadTmpUser,
} from '../../redux/pate/pate.actions';
import UserDetails from '../../components/admin/admin-user-details.component';
import { MainFooter } from '../../components/footers/main-footer';
import './admin-page.styles.scss';
const AdminUserDetails = ({
    match,
    pate,
    currentUser,
    tmpUser,
    setSpinner,
    clearSpinner,
    clearTmpUser,
    loadTmpUser,
}) => {
    const [registeredUndefined, setRegisteredUndefined] = useState(true);
    let userId = match?.params?.id;
    useEffect(() => {
        //the page will have id in url and now
        //load it into redux for future use
        console.log('page start');
        getTmpUser();
        console.log('page done');
        setRegisteredUndefined(false);
    }, []);

    const getTmpUser = () => {
        //clear any data we might have
        async function clearData() {
            clearTmpUser();
        }
        clearData();
        //search pate.users for this user
        async function loadData() {
            pate.users.forEach((user) => {
                if (user.uid === userId) {
                    console.log('FOUND IT');

                    loadTmpUser(user);
                }
            });
        }
        loadData();
    };
    return registeredUndefined ? (
        <Spinner />
    ) : (
        <>
            <Header />
            <UserDetails />
            <MainFooter />
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
    loadTmpUser: (user) => dispatch(loadTmpUser(user)),
    clearTmpUser: () => dispatch(clearTmpUser()),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    tmpUser: state.pate.tmpUser,
    pate: state.pate,
});
export default compose(
    withRouter,
    connect(mapStateToProps, {
        setSpinner,
        clearSpinner,
        clearTmpUser,
        loadTmpUser,
        mapDispatchToProps,
    })
)(AdminUserDetails);
