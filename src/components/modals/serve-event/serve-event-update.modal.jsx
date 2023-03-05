import React from 'react';
import './serve.styles.scss';
import { Typography, Button } from '@mui/material';
import { ChildFriendly } from '@mui/icons-material';
const EventUpdateModal = ({ isOpened = true, children, onClose }) => {
    if (!isOpened) {
        return null;
    }
    return (
        <div>
            <div className='success-message__wrapper'>
                <div className='modal__success__banner'>
                    <Typography variant='h5'>SUCCESS</Typography>
                </div>
                <div
                    className='success-message__message'
                    style={{ marginTop: '20px' }}
                >
                    <Typography variant='h5'>
                        Event has been updated.
                    </Typography>
                </div>
                <div className='success-message__message'>
                    <Typography variant='h6'>{children}</Typography>
                </div>
                <div
                    className='success-message__button-wrapper'
                    style={{ marginBottom: '10px' }}
                >
                    <Button
                        variant='contained'
                        onClick={onClose}
                        sx={{
                            // backgroundColor: 'blue',
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

export default EventUpdateModal;
