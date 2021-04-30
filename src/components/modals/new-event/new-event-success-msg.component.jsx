import React from 'react';
import './new-event-success-msg.styles.scss';
const SuccessMessage = ({ onClose }) => {
    return (
        <div>
            <div className='new-event-success-message__wrapper'>
                <div className='new-event-success-message__header'>
                    REGISTRATION SUCCESSFUL
                </div>
                <div className='new-event-success-message__message'>
                    Congrats! Your event has been loaded.
                </div>
                <div className='new-event-success-message__button-wrapper'>
                    <button
                        className='new-event-success-message__ok-button'
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
