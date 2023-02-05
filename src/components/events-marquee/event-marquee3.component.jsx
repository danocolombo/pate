import React from 'react';
import StyledLink from '../../components/custom-link/custom-link-yellow.component';
import './events-marquee.styles.scss';
import { printObject, prettyDate } from '../../utils/helpers';
const EventMarquee3 = ({ event }) => {
    printObject('EM3C:8-->event:\n', event);
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
                        <h3>{prettyDate(event.eventDate)}</h3>
                    </div>
                    <div className='events-marquee-component__event-church-name'>
                        {event.name}
                    </div>
                    <div className='events-marquee-component__event-church-data'>
                        {event.location.street}
                        <br /> {event.location.city}, {event.location.stateProv}
                        <br /> {event.location.postalCode}
                    </div>
                    <div className='events-marquee-component__view-details'>
                        <StyledLink to={`/event/${event.id}`}>
                            VIEW DETAILS
                        </StyledLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventMarquee3;
