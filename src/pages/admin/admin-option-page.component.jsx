import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import RegisteredUsers from '../../components/admin/registered-users-component';
import './admin-page.styles.scss';
const AdminOption = () => {
    let { option } = useParams();
    return (
        <>
            <Header />

            <div className='admin-page__page-wrapper'>
                <div></div>
                {option === 'registeredUsers' ? <RegisteredUsers /> : null}
                <div></div>
            </div>
            <MainFooter />
        </>
    );
};

export default AdminOption;
