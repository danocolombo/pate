import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import './registration-modals.scss';

const ConfirmEmailChange = ({ handleClick }) => {
    return (
        <Card className='card'>
            <CardContent>
                <Typography variant='h5' component='h2'>
                    WARNING
                </Typography>
                <p className='formatted-paragraph'>
                    You have changed your email, which impacts system
                    communications. Please confirm you want to change your
                    email.
                </p>
            </CardContent>
            <div className='root'>
                <Button
                    variant='contained'
                    className='done-button'
                    onClick={() => handleClick('confirm_email_change')}
                >
                    Yes, Update Email
                </Button>
                <Button
                    variant='contained'
                    className='more-button'
                    onClick={() => handleClick('update_email_cancel')}
                >
                    Cancel Update/Registration
                </Button>
            </div>
        </Card>
    );
};

export default ConfirmEmailChange;
