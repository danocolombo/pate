import React from 'react';
import { Link } from 'react-router-dom';
import './registrationServeListItem.styles.scss';
import { printObject } from '../../utils/helpers';
const RegistrationItem = ({ regItem, eventID }) => {
    return (
        <>
            <Link to={`/editregistration/${regItem.eid}/${regItem.uid}`}>
                <div className='registration-list-item__data-wrapper'>
                    <div className='registration-list-item__registrar'>
                        {regItem.attendeeFirstName} {regItem.attendeeLastName}
                    </div>
                    <div className='registration-list-item__numbers'>
                        {regItem.attendanceCount} /{regItem?.mealCount}
                    </div>
                </div>
            </Link>
        </>
    );
};

export default RegistrationItem;

// <a href={`/editregistration/${regItem.eid}/${regItem.uid}`}>
