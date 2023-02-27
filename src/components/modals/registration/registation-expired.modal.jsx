import React from 'react';
import './registration-input-error.styles.scss';
import { Typography, Button } from '@mui/material';
const RegistrationExpired = ({ isOpened = true, children, onClose }) => {
    return (
        <div>
            <div className='success-message__wrapper'>
                <div className='modal__warning__banner'>ATTENTION</div>
                <div className='success-message__message'>
                    <Typography variant='h5'>
                        This event registration is on a past event.
                    </Typography>
                </div>
                <div className='success-message__message'>
                    <Typography variant='h6'>{children}</Typography>
                </div>
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

export default RegistrationExpired;
