import React, { useRef } from 'react';
import './registration.styles.scss';
import { Stack, Typography, Button } from '@mui/material';
const ContactChangedModal = ({ handleChange, handleCancel }) => {
    return (
        <div>
            <div className='success-message__wrapper'>
                <Typography variant='h5' className='modal__banner'>
                    ATTENTION
                </Typography>
                <Stack sx={{ margin: 5 }}>
                    <Typography
                        variant='h5'
                        align='center'
                        style={{
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingBottom: 10,
                        }}
                    >
                        Registering a guest?
                    </Typography>

                    <Typography variant='h5' align='center'>
                        If your contact information is inaccurate, please update
                        your profile before registering.
                    </Typography>
                </Stack>
                <Stack direction='row' justifyContent='center'>
                    <Button
                        variant='contained'
                        onClick={handleChange}
                        sx={{ backgroundColor: 'green', margin: 2 }}
                    >
                        Yes, Proceed
                    </Button>
                    <Button
                        variant='contained'
                        sx={{ backgroundColor: 'red', margin: 2 }}
                        onClick={handleCancel}
                    >
                        No, cancel
                    </Button>
                </Stack>
            </div>
        </div>
    );
};

export default ContactChangedModal;
