import { createPortal } from 'react-dom';
import './profile-edit.styles.css';
import { Typography, Button } from '@mui/material';
const ProfileUpdateNotification = ({ isOpened = true, children, onClose }) => {
    return (
        <div>
            <div className='success-message__wrapper'>
                <div className='modal__success__banner'>
                    <Typography varian='h4'>SUCCESS</Typography>
                </div>
                <Typography variant='h5' className='success-message__message'>
                    Profile has been updated.
                </Typography>

                <div className='success-message__button-wrapper'>
                    <Button
                        variant='contained'
                        onClick={onClose}
                        sx={{
                            backgroundColor: 'blue',
                            margin: 2,
                            minWidth: '150px',
                        }}
                    >
                        OK
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProfileUpdateNotification;
