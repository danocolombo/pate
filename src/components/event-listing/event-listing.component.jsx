import React, { Fragment } from 'react';
import StyledLink from '../../components/custom-link/custom-link-yellow.component';
import './event-listing.styles.scss';
const EventListing = ({
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
    //-------------------------------
    // prep data
    //-------------------------------
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
        <Fragment>
            <div className='event-box'>
                <div className='date-box'>
                    <div className='event-month'>
                        <h3>
                            {month2Display(eventDate)}&nbsp;
                            {day2Display(eventDate)}
                        </h3>
                    </div>
                </div>
                <div className='address'>
                    <div className='event-location'>{name}</div>
                    <div className='event-street'>{street}</div>
                    <div className='event-city-state'>
                        <span>{city}</span>,&nbsp;
                        <span>{stateProv}</span>
                    </div>
                    <div className='event-postalcode'>{postalCode}</div>
                </div>
                <div className='linkbutton'>
                    <StyledLink to={`/event/${uid}`}>VIEW DETAILS</StyledLink>
                </div>
            </div>
        </Fragment>
    );
};
export default EventListing;
