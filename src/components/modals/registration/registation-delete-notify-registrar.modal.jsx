import React from 'react';
import './registration-input-error.styles.scss';
import { Typography, Button } from '@mui/material';
const NotifyRegistrar = ({
    isOpened = true,
    children,
    onConfirm,
    onCancel,
}) => {
    return (
        <div>
            <div className='success-message__wrapper'>
                <div className='modal__danger__banner'>
                    <Typography variant='h5'>ATTENTION</Typography>
                </div>
                <div className='success-message__message'>
                    <Typography variant='h5'>
                        The registration will be deleted.
                    </Typography>
                    <Typography variant='h5'>
                        Please notify user of the change.
                    </Typography>
                </div>
                <div className='success-message__message'>
                    <Typography variant='h6'>{children}</Typography>
                </div>
                <div className='success-message__button-wrapper'>
                    <Button
                        variant='contained'
                        onClick={onConfirm}
                        sx={{
                            backgroundColor: 'red',
                            margin: 2,
                            minWidth: '150px',
                        }}
                    >
                        Yes, Delete
                    </Button>
                    <Button
                        variant='contained'
                        onClick={onCancel}
                        sx={{
                            backgroundColor: 'secondary',
                            margin: 2,
                            minWidth: '150px',
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotifyRegistrar;
