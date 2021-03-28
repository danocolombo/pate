import React from 'react';
import './registrationServeListItem.styles.scss';
const RegistrationItem = ({ regItem }) => {
    return (
        <>
            <div className='serve-event-register-item-wrapper'>
                <a href={`/registration/REG${regItem.eid}`}>
                    <div className='serve-event-register-item-name'>
                        {regItem.registrar.firstName}{' '}
                        {regItem.registrar.lastName}
                    </div>
                    <div className='serve-event-register-item-numbers'>
                        {regItem.attendeeCount}
                        {regItem?.mealCount ? <>/{regItem.mealCount}</> : null}
                    </div>
                </a>
            </div>
        </>
    );
};

export default RegistrationItem;
