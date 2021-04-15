import React from 'react';
import './registration-input-error.styles.scss';
const ProfileNotification = ({ isOpened = true, children, onClose }) => {
    return (
        <div>
            <div className='success-message__wrapper'>
                <div className='success-message__header'>
                    ATTENTION REQUIRED
                </div>
                <div className='success-message__message'>
                    All the fields on the registration are required.
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

export default ProfileNotification;
