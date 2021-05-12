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
                
                    <div className='admin-component__row-center'>
                        <div className='admin-component__link-wrapper'>
                        <Link
                            to='/administer/registeredusers'
                            className='admin-component__option-link'
                        >
                            Users
                        </Link>
                        </div>
                    </div>
                    <div className='admin-component__row-center'>
                        State Reps
                    </div>
                    <div className='admin-component__row-center'>
                        State Leads
                    </div>
                    <div className='admin-component__row-center'>Events</div>
                    <div className='admin-component__row-center'>
                        <div className='admin-component__link-wrapper'>
                        <Link
                            to='/administer/showImage'
                            className='admin-component__option-link'
                        >
                            Show S3 Image
                        </Link>
                        </div>
                    </div>
                    <div className='admin-component__row-center'>
                        <div className='admin-component__link-wrapper'>
                        <Link
                            to='/administer/storage'
                            className='admin-component__option-link'
                        >
                            Storage
                        </Link>
                        </div>
                    </div>
                
            </div>
        </div>
    );
};

export default AdminMenu;
