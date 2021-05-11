import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header.component';
import RegisteredUsers from './registered-users.page';
import BasicStorage from './admin-basic-storage.page';
import SongExample from './song-example';
import { MainFooter } from '../../components/footers/main-footer';
import './admin-page.styles.scss';
const Administer = () => {
    let { option } = useParams();
    return (
        <>
            <Header />
            { option === 'storage2' ? <BasicStorage /> : null }
            { option === 'registeredusers' ? <RegisteredUsers /> : null }
            { option === 'storage' ? <SongExample /> : null}
            <MainFooter />
        </>
    );
};

export default Administer;
