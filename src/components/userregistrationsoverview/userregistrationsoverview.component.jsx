import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StyledLink from '../../components/custom-link/custom-link-white.component';
import './userregistrationsoverview.styles.scss';
import { removeRegistration } from '../../redux/registrations/registrations.actions';
const UserRegistrationOverview = ({
    currentUser,
    registrationInfo,
    removeRegistration,
}) => {
    // const util = require('util');
    // console.log(
    //     '&%&%&%&%&%___registrations___&%&%&%&%&%\n' +
    //         util.inspect(registrationInfo, { showHidden: false, depth: null })
    // );
    const registrations = registrationInfo;

    if (registrations) {
        registrations.forEach((r) => {});
    }
    const dateToDisplay = (dt) => {
        const y = dt.substring(0, 4);
        const m = parseInt(dt.substring(4, 6));
        const d = dt.substring(6, 8);

        let smDate = m.toString() + '/' + d.toString();
        return smDate;
    };
    const handleCancellation = async (id) => {
        //delete from database
        await fetch(
            'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
            {
                method: 'POST',
                body: JSON.stringify({
                    operation: 'deleteRegistration',
                    payload: {
                        Key: { uid: id },
                    },
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                const util = require('util');
                console.log(
                    'db data returned: \n' +
                        util.inspect(data, {
                            showHidden: false,
                            depth: null,
                        })
                );
            });
        await removeRegistration(id);
    };
    return (
        <>
            <div className='userregistrationswrapper'>
                <div className='tablewrapper'>
                    { registrations ? (
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
                                <td className='eventname'>{r?.locationName}</td>
                                <td className='eventlocation'>{r?.locationCity}</td>
                                <td className='cancelButton'>
                                    <Link
                                        onClick={() => {
                                            handleCancellation(r.uid);
                                        }}
                                    >
                                        X
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </table>):null};
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    removeRegistration: (registration) =>
        dispatch(removeRegistration(registration)),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    registrationInfo: state.registrations.confirmed,
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserRegistrationOverview);
