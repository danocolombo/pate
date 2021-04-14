import React from 'react';
import StyledLink from '../../components/custom-link/custom-link-yellow.component';
import './events-marquee.styles.scss';
const EventMarquee2 = ({
    event: {
        uid,
        eventDate,
        startTime,
        endTime,
        name,
        street,
        city,
        stateProv,
        postalCode,
    },
}) => {
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
        <div className='events-marquee-compoment__events-wrapper'>
            <div className='events-marquee-component__events-box'>
                <div className='events-marquee-component__event-box'>
                    <div className='events-marquee-component__event-date'>
                        <h3>
                            {month2Display(eventDate)}&nbsp;
                            {day2Display(eventDate)}
                        </h3>
                    </div>
                    <div className='events-marquee-component__event-church-name'>
                        {name}
                    </div>
                    <div className='events-marquee-component__event-church-data'>
                        {street}
                        <br /> {city}, {stateProv}
                        <br /> {postalCode}
                    </div>
                    <div className='events-marquee-component__view-details'>
                        <StyledLink to={`/event/${uid}`}>
                            VIEW DETAILS
                        </StyledLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventMarquee2;