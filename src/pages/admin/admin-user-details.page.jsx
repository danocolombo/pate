import React from 'react';
import Header from '../../components/header/header.component';
import { Link } from 'react-router-dom';
import UserDetails from '../../components/admin/admin-user-details.component';
import { MainFooter } from '../../components/footers/main-footer';
import './admin-page.styles.scss';
const AdminUserDetails = () => {
    return (
        <>
            <Header />
            <UserDetails />
            <MainFooter />
        </>
    );
};

export default AdminUserDetails;
