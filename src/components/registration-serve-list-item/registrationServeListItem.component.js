import React from 'react';
import { Link } from 'react-router-dom';
import './registrationServeListItem.styles.scss';
const RegistrationItem = ({ regItem, eventID }) => {
    return (
        <>
            <div className='serve-event-register-item-wrapper'>
                <Link to={`/editregistration/${regItem.eid}/${regItem.uid}`}>
               
                    <div className='serve-event-register-item-name'>
                        {regItem.registrar.firstName}{' '}
                        {regItem.registrar.lastName}
                    </div>
                    <div className='serve-event-register-item-numbers'>
                        {regItem.attendeeCount}
                        {regItem?.mealCount ? <>/{regItem.mealCount}</> : null}
                    </div>
                </Link>
            </div>
        </>
    );
};

export default RegistrationItem;

// <a href={`/editregistration/${regItem.eid}/${regItem.uid}`}>