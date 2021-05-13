import React from 'react';
import './registration-success-msg.styles.scss';
const SuccessMessage = ({ onClose }) => {
    return (
        <div>
            <div className='success-message__wrapper'>
                <div className='success-message__header'>
                    CANCELLATION CONFIRMED
                </div>
                <div className='success-message__message'>
                    Thank you. We hope to connect with you again soon.
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
