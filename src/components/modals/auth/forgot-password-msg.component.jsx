import React from 'react';
import './forgot-password-msg.styles.scss';
const SuccessMessage = ({ onClose }) => {
    return (
        <div>
            <div className='success-message__wrapper'>
                <div className='success-message__header'>
                    REGISTRATION SUCCESSFUL
                </div>
                <div className='success-message__message'>
                    Thank you for registering. We look forward to seeing you
                    soon!
                </div>
                <div className='success-message__button-wrapper'>
                    <button
                        className='success-message__ok-button'
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
