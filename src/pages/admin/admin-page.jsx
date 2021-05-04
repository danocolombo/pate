import React from 'react';
import Header from '../../components/header/header.component';
import { Link } from 'react-router-dom';
import AdminOptions from '../../components/admin/admin-menu-items.component';
import { MainFooter } from '../../components/footers/main-footer';
import './admin-page.styles.scss';
const AdminPage = () => {
    return (
        <>
            <Header />
            <AdminOptions />
            <MainFooter />
        </>
    );
};

export default AdminPage;
