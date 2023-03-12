import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './registration-modals.scss';

const Splash = ({ message, handleClick }) => {
    return (
        <Card className='card-warning'>
            <CardContent className='card-content'>
                <Typography variant='h5' component='h2'>
                    Processing
                </Typography>
                <p className='formatted-paragraph'>{message}</p>
            </CardContent>
        </Card>
    );
};

export default Splash;
