import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header.component';
import RegisteredUsers from './registered-users.page';
import { MainFooter } from '../../components/footers/main-footer';
import './admin-page.styles.scss';
const Administer = () => {
    let { option } = useParams();
    return (
        <>
            <Header />
            {option === 'registeredusers' ? <RegisteredUsers /> : null}
            <MainFooter />
        </>
    );
};

export default Administer;
