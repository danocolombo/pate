import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import './registration-modals.scss';

const InvalidEmail = ({ handleClick }) => {
    return (
        <Card className='card-warning'>
            <CardContent>
                <Typography variant='h5' component='h2'>
                    FAILURE
                </Typography>
                <p className='formatted-paragraph'>
                    The email entereed was invalid. Please try again.
                </p>
            </CardContent>
            <div className='root'>
                <Button
                    variant='contained'
                    className='done-button'
                    onClick={() => handleClick('retry')}
                >
                    Ok
                </Button>
            </div>
        </Card>
    );
};

export default InvalidEmail;
