import React from 'react';
import { Link } from 'react-router-dom';
import './admin-component.styles.scss';
const AdminMenu = () => {
    return (
        <div className='admin-component__wrapper'>
            <div className='admin-component__options-box'>
                <div className='admin-component__page-title'>
                    ADMIN FEATURES
                </div>
                <div className='admin-component__option-box'>
                    <div className='admin-component__row-center'>
                        <Link
                            to='/administer/registeredusers'
                            className='admin-page__option-link'
                        >
                            Users
                        </Link>
                    </div>
                    <div className='admin-component__row-center'>
                        State Reps
                    </div>
                    <div className='admin-component__row-center'>
                        State Leads
                    </div>
                    <div className='admin-component__row-center'>Events</div>
                </div>
            </div>
        </div>
    );
};

export default AdminMenu;
