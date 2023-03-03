import React, { useEffect, useState } from 'react';
import { Card, Stack, Box, Typography, CardContent } from '@mui/material';
import { alpha } from '@mui/system';
import { connect } from 'react-redux';
import StyledLink from '../../components/custom-link/custom-link-yellow.component';
import './events-marquee.styles.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import { printObject, prettyDate } from '../../utils/helpers';
const EventMarquee3 = ({
    event,
    index,
    eventId,
    currentUser,
    setSpinner,
    updateCurrentUser,
    clearSpinner,
    pateSystem,
}) => {
    const [eventHit, setEventHit] = useState(false);
    useEffect(() => {
        //see if the current user is already registred.
        if (currentUser?.registrations?.items.length > 0) {
            const hit = currentUser.registrations.items.find(
                (r) => r.event.id === event.id
            );
            if (hit) {
                setEventHit(true);
            }
        } else {
            console.log('no registrations');
        }
    }, []);
    return (
        <Card
            key={event.eventDate}
            sx={{
                borderRadius: 2,
                boxShadow: 8,
                margin: '15px',
                minWidth: '300px',
            }}
        >
            <Box
                sx={{
                    background: `linear-gradient(to bottom, 
              ${alpha('#f00', 0.5 + 0.9 * index)} 0%, 
              ${alpha('#f00', 0.9 + 0.9 * index)} 100%)`,
                    p: 1,
                }}
            >
                <Typography
                    variant='h6'
                    color='white'
                    component='h2'
                    align='center'
                >
                    {event?.eventDate === '1900-01-01'
                        ? 'TBD'
                        : event.eventDate}
                </Typography>
            </Box>
            <CardContent sx={{ padding: '16px' }}>
                <Stack align='center' direction='column'>
                    <Typography variant='h5' component='p' gutterBottom>
                        {event.name}
                    </Typography>
                    <Typography variant='body1' component='p'>
                        {event.location.street}
                    </Typography>

                    <Typography
                        variant='body1'
                        component='p'
                        gutterBottom
                        align='center'
                    >
                        {event.location.city}, {event.location.stateProv}{' '}
                        {event.location.postalCode}
                    </Typography>
                </Stack>
                {eventHit && (
                    <Stack
                        direction='column'
                        alignItems='flex-end'
                        justifyContent='flex-end'
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: 'green',
                            }}
                        >
                            REGISTERED
                            <i
                                className='fas fa-check-circle'
                                style={{
                                    fontSize: '24px',
                                    color: 'green',
                                    marginLeft: '6px',
                                }}
                            ></i>
                        </div>
                    </Stack>
                )}
            </CardContent>
            <Stack
                direction='row'
                sx={{
                    background: `linear-gradient(to bottom, 
                ${alpha('#f00', 0.9 + 0.9 * index)} 0%, 
                ${alpha('#f00', 0.6 + 0.9 * index)} 100%)`,
                    p: 1,
                }}
                spacing={2}
                justifyContent='center'
            >
                <Typography variant='body1' color='white' component='span'>
                    <StyledLink to={`/event/${event.id}`}>
                        View Details
                    </StyledLink>
                </Typography>
            </Stack>
        </Card>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    pateSystem: state.pate,
});
export default connect(mapStateToProps)(EventMarquee3);
