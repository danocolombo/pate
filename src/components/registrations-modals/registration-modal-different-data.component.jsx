import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import './registration-modals.scss';

const DifferentProfileInfo = ({ handleClick }) => {
    return (
        <Card className='card'>
            <CardContent>
                <Typography variant='h5' component='h2'>
                    WARNING
                </Typography>
                <p className='formatted-paragraph'>
                    The information on your registration from does not match
                    your profile. How do you want to proceed?
                </p>
            </CardContent>
            <div className='root'>
                <Button
                    variant='contained'
                    className='yes-button'
                    style={{ backgroundColor: 'red', color: 'white' }}
                    onClick={() => handleClick('update_register')}
                >
                    Update Profile & Register
                </Button>
                <Button
                    variant='contained'
                    style={{ backgroundColor: 'yellow', color: 'black' }}
                    className='no-button'
                    onClick={() => handleClick('register_new')}
                >
                    Register New Attendee
                </Button>
                <Button
                    variant='contained'
                    className='no-button'
                    onClick={() => handleClick('done')}
                >
                    Cancel
                </Button>
            </div>
        </Card>
    );
};

export default DifferentProfileInfo;
