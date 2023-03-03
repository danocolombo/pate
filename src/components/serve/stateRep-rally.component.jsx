import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Stack, Box, Typography, CardContent } from '@mui/material';
import { alpha } from '@mui/system';
import { prettyDate } from '../../utils/helpers';
import './serve.styles.scss';
const StateRepRally = ({ rally }) => {
    const dateToDisplay = () => {
        return rally.eventDate;
        //return eventDate;
    };
    return (
        <>
            <Stack direction='row' justifyContent='center'>
                <div className='serve-component__rally-list-item'>
                    <div className='serve-component__link-wrapper'>
                        <Link
                            to={`/serveevent/${rally.id}`}
                            className='serve-component__rally-link'
                        >
                            <Card
                                key={rally.eventDate}
                                sx={{
                                    borderRadius: 2,
                                    boxShadow: 8,
                                    margin: '15px',
                                    minWidth: '300px',
                                    maxWidth: '300px',
                                }}
                            >
                                <Box
                                    sx={{
                                        background: `linear-gradient(to bottom, 
              ${alpha('#f00', 0.5 + 0.9 * 1)} 0%, 
              ${alpha('#f00', 0.9 + 0.9 * 1)} 100%)`,
                                        p: 1,
                                    }}
                                    style={{ alignItems: 'center' }}
                                >
                                    <Typography
                                        variant='h6'
                                        color='white'
                                        component='h2'
                                        align='center'
                                    >
                                        {rally.eventDate === '1900-01-01'
                                            ? 'TBD'
                                            : prettyDate(rally.eventDate)}
                                    </Typography>
                                </Box>
                                <CardContent sx={{ padding: '16px' }}>
                                    <Stack align='center' direction='column'>
                                        <Typography
                                            variant='h5'
                                            component='p'
                                            gutterBottom
                                        >
                                            {rally.name}
                                        </Typography>
                                        <Typography
                                            variant='body1'
                                            component='p'
                                        >
                                            {rally.location.street}
                                        </Typography>

                                        <Typography
                                            variant='body1'
                                            component='p'
                                            gutterBottom
                                            align='center'
                                        >
                                            {rally.location.city},{' '}
                                            {rally.location.stateProv}{' '}
                                            {rally.location.postalCode}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
            </Stack>
        </>
    );
};

export default StateRepRally;
