import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import './registration-modals.scss';

const NewAttendeeComplete = ({ handleClick }) => {
    return (
        <Card className='card'>
            <CardContent>
                <Typography variant='h5' component='h2'>
                    SUCCESS
                </Typography>
                <p className='formatted-paragraph'>
                    The registration was successful. Do you want to register
                    more? Or are you done?
                </p>
            </CardContent>
            <div className='root'>
                <Button
                    variant='contained'
                    className='done-button'
                    onClick={() => handleClick('done')}
                >
                    I'm Done
                </Button>
                <Button
                    variant='contained'
                    className='more-button'
                    onClick={() => handleClick('register_more')}
                >
                    Return to Registration Page
                </Button>
            </div>
        </Card>
    );
};

export default NewAttendeeComplete;
