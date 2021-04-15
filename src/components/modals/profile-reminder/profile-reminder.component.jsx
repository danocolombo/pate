import React from 'react';
import './profile-reminder.styles.scss';
const ProfileNotification = ({ isOpened = true, children, onClose }) => {
    return (
        <div>
            <div className='success-message__wrapper'>
                <div className='success-message__header'>
                    PROFILE INCOMPLETE
                </div>
                <div className='success-message__message'>
                    Welcome, please complete your registration profile...
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
