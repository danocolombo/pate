import React from 'react';
import Header from '../../components/header/header.component';
import {Link} from 'react-router-dom';
import { MainFooter } from '../../components/footers/main-footer';
import './admin-page.styles.scss';
const AdminPage = () => {
    return (
        <>
            <Header />

            <div className='admin-page__page-wrapper'>
                
                <div className='admin-page__admin-wrapper'>
                    <div className='admin-page__admin-option'>
                    <Link to='/administer/registeredusers' className='admin-page__option-link'>
                        Registered Users
                    </Link>    
                    
                    </div>
                    <div className='admin-page__admin-option'>State Reps</div>
                    <div className='admin-page__admin-option'>State Leads</div>
                    <div className='admin-page__admin-option'>Events</div>
                </div>
                
            </div>
            <MainFooter />
        </>
    );
};

export default AdminPage;
