import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import './registration-modals.scss';

const Registered = ({ handleClick }) => {
    return (
        <Card className='card'>
            <CardContent>
                <Typography variant='h5' component='h2'>
                    SUCCESS
                </Typography>
                <p className='formatted-paragraph'>
                    Your registration for the event is complete. Enjoy!
                </p>
            </CardContent>
            <div className='root'>
                <Button
                    variant='contained'
                    className='done-button'
                    onClick={() => handleClick('done')}
                >
                    Ok
                </Button>
            </div>
        </Card>
    );
};

export default Registered;
