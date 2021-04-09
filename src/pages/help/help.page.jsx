import React from 'react';
import { connect } from 'react-redux';
import { MainFooter } from '../../components/footers/main-footer';
import Header from '../../components/header/header.component';
import { BasicHelp } from '../../components/help/basic-help.component';
import { RegisteredHelp } from '../../components/help/registered-help.component';
import { StateRepHelp } from '../../components/help/state-rep-help.component';
import { StateLeadHelp } from '../../components/help/state-lead-help.component';
import './help.styles.scss';
const HelpPage = ({ currentUser }) => {
    return (
        <>
            <Header />
            {currentUser?.stateLead ? (
                <>
                    <StateLeadHelp />
                </>
            ) : null}
            {currentUser?.stateRep || currentUser?.stateLead ? (
                <StateRepHelp />
            ) : null}
            {currentUser?.isLoggedId ? (
                <>
                    <RegisteredHelp />
                </>
            ) : null}
            {console.log(JSON.stringify(currentUser))}
            <BasicHelp />
            <MainFooter />
        </>
    );
};
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});
export default connect(mapStateToProps)(HelpPage);
