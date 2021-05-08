import React from 'react';
import './reset-password.styles.scss';
const ResetPassword = ({ isOpened = true, children, resetDecline, resetAccept }) => {
    return (
        <div>
            <div className='success-message__wrapper'>
                <div className='success-message__header'>
                    Warning
                </div>
                <div className='success-message__message'>
                    If you need to reset your password or recover your account, click Yes to proceed
                </div>
                <div className='success-message__button-wrapper'>
                    <button
                        className='success-message__ok-button'
                        onClick={resetDecline}
                    >
                        OK
                    </button>
                    <button
                        className='success-message__ok-button'
                        onClick={resetDecline}
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
