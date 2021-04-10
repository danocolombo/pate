import React from 'react';
import { Link } from 'react-router-dom';
import './registrationServeListItem.styles.scss';
const RegistrationItem = ({ regItem, eventID }) => {
    return (
        <>
            
                <Link to={`/editregistration/${regItem.eid}/${regItem.uid}`}>
                <div className='registration-list-item__data-wrapper'>
                    <div className='registration-list-item__registrar'>
                        {regItem.registrar.firstName}{' '}
                        {regItem.registrar.lastName}
                    </div>
                    <div className='registration-list-item__numbers'>
                        {regItem.attendeeCount}
                        {regItem?.mealCount ? <>/{regItem.mealCount}</> : null}
                    </div>
                    </div>
                </Link>
            
        </>
    );
};

export default RegistrationItem;

// <a href={`/editregistration/${regItem.eid}/${regItem.uid}`}>