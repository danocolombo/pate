import React from 'react';
import { withRouter } from 'react-router';
import Header from '../../components/header/header.component';
import RegistrationOptions from '../../components/registration/registration-options.component';
import { MainFooter } from '../../components/footers/main-footer';
// import './admin-page.styles.scss';
const RegistrationControllerPage = ({ match }) => {
    const eventId = match.params.id;
    return (
        <>
            <Header />
            <div style={{ marginTop: '10px' }}>
                <RegistrationOptions eventId={eventId} />
            </div>
            <MainFooter />
        </>
    );
};

export default RegistrationControllerPage;
