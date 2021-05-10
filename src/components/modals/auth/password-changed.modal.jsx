import React from 'react';
import './check-email.styles.scss';
const CheckEmail = ({ isOpened = true, children, acknowledged }) => {
    return (
        <div>
            <div className='success-message__wrapper'>
                <div className='success-message__header'>
                    CHANGE PASSWORD SUCCESSFUL
                </div>
                <div className='success-message__message'>
                    Password change was successful, you can now login.
                </div>
                <div className='success-message__button-wrapper'>
                    <button
                        className='success-message__ok-button'
                        onClick={acknowledged}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckEmail;
