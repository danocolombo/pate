import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StyledLink from '../../components/custom-link/custom-link-white.component';
import './userregistrationsoverview.styles.scss';
const UserRegistrationOverview = ({ currentUser, registrationInfo }) => {
    const util = require('util');
    console.log(
        '&%&%&%&%&%___registrations___&%&%&%&%&%\n' +
            util.inspect(registrationInfo, { showHidden: false, depth: null })
    );
    const registrations = registrationInfo?.Items;

    if (registrations) {
        registrations.forEach((r) => {
            
        });
    }
    const dateToDisplay = (dt) => {
        const y = dt.substring(0, 4);
        const m = parseInt(dt.substring(4, 6));
        const d = dt.substring(6, 8);
        
        let smDate = m.toString() + '/' + d.toString();
        return smDate;
    };
    return (
        <>
            <div className='userregistrationswrapper'>
                <div className='tablewrapper'>
                    <table className='registrationtable'>
                        {registrations.map((r) => (
                            <tr>
                                <td className='eventdate'>
                                    <StyledLink
                                        style={{ textDecoration: 'none' }}
                                        to={`/registration/REG${r.eid}`}
                                    >
                                        {dateToDisplay(r.eventDate)}
                                    </StyledLink>
                                </td>
                                <td className='eventname'>
                                    {r?.location?.name}
                                </td>
                                <td className='eventlocation'>
                                    {r?.location?.city}
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </>
    );
};
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    registrationInfo: state.registrations.currentRegistrations,
});
export default connect(mapStateToProps)(UserRegistrationOverview);
