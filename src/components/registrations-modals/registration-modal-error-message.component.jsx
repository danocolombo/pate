import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import './registration-modals.scss';

const ErrorMessage = ({ message, handleClick }) => {
    return (
        <Card className='card-warning'>
            <CardContent className='card-content'>
                <Typography variant='h5' component='h2'>
                    ERROR
                </Typography>
                <p className='formatted-paragraph'>{message}</p>
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

export default ErrorMessage;
