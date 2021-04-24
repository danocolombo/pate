import React from 'react';
import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import './admin-page.styles.scss';
const AdminPage = (match) => {
    const id = match.params.id;
    return (
        <>
            <Header />

            <div className='admin-page__page-wrapper'>
                <div></div>
                <div className='admin-page__admin-wrapper'>
                    <div className='admin-page__admin-option'>
                        Registered Users
                    </div>
                    <div className='admin-page__admin-option'>State Reps</div>
                    <div className='admin-page__admin-option'>State Leads</div>
                    <div className='admin-page__admin-option'>Events</div>
                </div>
                <div></div>
            </div>
            <MainFooter />
        </>
    );
};

export default AdminPage;
