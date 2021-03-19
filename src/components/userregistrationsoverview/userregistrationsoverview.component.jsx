import React from 'react';
import { connect } from 'react-redux';
import './userregistrationsoverview.styles.scss';
const UserRegistrationOverview = ({ currentUser, registrationInfo }) => {
    const util = require('util');
    console.log(
        '&%&%&%&%&%___registrations___&%&%&%&%&%\n' +
            util.inspect(registrationInfo, { showHidden: false, depth: null })
    );
    const registrations = registrationInfo?.Items;

    registrations.forEach((r) => {
        console.log(r.eid);
    });
    return (
        <>
            <div className='personalprofilewrapper'></div>
            <div>
                {registrations.map((r) => (
                    <span>
                        {r.eid}
                        <br />
                    </span>
                ))}
            </div>
        </>
    );
};
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    registrationInfo: state.registrations.currentRegistrations,
});
export default connect(mapStateToProps)(UserRegistrationOverview);
