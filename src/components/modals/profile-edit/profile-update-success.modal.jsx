import { createPortal } from 'react-dom';
import './profile-edit.styles.css';
const ProfileUpdateNotification = ({ isOpened = true, children, onClose }) => {
    return (
        <div>
            <div className='success-message__wrapper'>
                <div className='success-message__header'>SUCCESS</div>
                <div className='success-message__message'>
                    Profile has been updated.
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

export default ProfileUpdateNotification;
