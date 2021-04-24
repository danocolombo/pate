import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header.component';
import RegisteredUsers from '../../components/admin/registered-users.component';
import { MainFooter } from '../../components/footers/main-footer';
import './admin-page.styles.scss';
const Administer = () => {
    let {option} = useParams();
    return (
        <>
            <Header />

            <div className='admin-page__page-wrapper'>
                <div></div>
                <div className='admin-page__admin-wrapper'>
                    {option==='registeredusers'?(
                        <RegisteredUsers/>
                    ):null}
                    <div className='admin-page__admin-option'>Profiles</div>
                </div>
                <div></div>
            </div>
            <MainFooter />
        </>
    );
};

export default Administer;
