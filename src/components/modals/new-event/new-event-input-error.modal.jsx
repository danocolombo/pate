import React from 'react';
import './new-event-input-error.styles.scss';
const ProfileNotification = ({ isOpened = true, children, onClose }) => {
    return (
        <div>
            <div className='new-event-input-error__modal-wrapper'>
                <div className='new-event-input-error__message__header'>
                    ATTENTION REQUIRED
                </div>
                <div className='new-event-input-error__modal-content'>
                    Church and Contact information is required.
                </div>
                <div className='new-event-input-error__success-message__button-wrapper'>
                    <button
                        className='new-event-input-error__close-button'
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileNotification;
