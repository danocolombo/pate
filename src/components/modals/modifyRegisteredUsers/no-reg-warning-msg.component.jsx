import React from 'react';
import './modifyRegisteredUsers.styles.scss';
const SuccessMessage = ({ onClose }) => {
    return (
        <div>
            <div className='warning-message__wrapper'>
                <div className='warning-message__header'>
                    USER NOT REGISTERED
                </div>
                <div className='warning-message__message'>
                    You cannot update an account that has not completed the
                    registration. Please contact the individual to request them
                    to complete their registration.
                </div>
                <div className='warning-message__button-wrapper'>
                    <button
                        className='warning-message__ok-button'
                        onClick={onClose}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessMessage;
