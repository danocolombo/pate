import React from 'react';
import { Card, Stack, Box, Typography, CardContent } from '@mui/material';
import { alpha } from '@mui/system';
import StyledLink from '../../components/custom-link/custom-link-yellow.component';
import './events-marquee.styles.scss';
import { printObject, prettyDate } from '../../utils/helpers';
const EventMarquee3 = ({ event, index }) => {
    const mo = {
        '01': 'JAN',
        '02': 'FEB',
        '03': 'MAR',
        '04': 'APR',
        '05': 'MAY',
        '06': 'JUN',
        '07': 'JUL',
        '08': 'AUG',
        '09': 'SEP',
        10: 'OCT',
        11: 'NOV',
        12: 'DEC',
    };

    const month2Display = (d) => {
        //get the month, the return String
        let m = d.substring(4, 6);
        let alpha = mo[m];
        return alpha;
    };
    const day2Display = (d) => {
        let dom = d.substring(6, 8);
        return dom;
    };
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
                    {prettyDate(event.eventDate)}
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

export default EventMarquee3;
