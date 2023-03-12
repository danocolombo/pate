import React from 'react';
import './new-event.styles.scss';
import { Typography, Button, Stack } from '@mui/material';
const EventAddedModal = ({ isOpened = true, children, onClose, onConfirm }) => {
    if (!isOpened) {
        return null;
    }
    return (
        <div>
            <div className='modal-wrapper'>
                <div className='modal__success__banner'>
                    <Typography variant='h5'>SUCCESS</Typography>
                </div>
                <Stack
                    direction='row'
                    justifyContent='center'
                    sx={{ paddingTop: '20px', paddingBottom: '10px' }}
                >
                    <Typography variant='body1' style={{ margin: '10px' }}>
                        The event has been sussessfully added.
                    </Typography>
                </Stack>
                <Stack>
                    <Typography variant='h6'>{children}</Typography>
                </Stack>
                <Stack direction='row' justifyContent='center'>
                    <Button
                        variant='contained'
                        onClick={onClose}
                        sx={{
                            // backgroundColor: 'grey',
                            margin: 2,
                            minWidth: '150px',
                        }}
                    >
                        OK
                    </Button>
                </Stack>
            </div>
        </div>
    );
};

export default EventAddedModal;
