import React, { Fragment } from 'react';
import './eventListing.styles.scss';
const EventListing = ({
    event: { uid, eventDate, startTime, endTime, location },
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
    return (
        <Fragment>
            <div className='event-box'>
                <div className='date-box'>
                    <h3 className='event-month'>{month2Display(eventDate)}</h3>
                </div>
                <div className='event-location'>{location.name}</div>
                <div className='event-street'>{location.street}</div>
                <div className='event-city'>{location.city}</div>
                <div className='postal-code'>{location.postalCode}</div>
            </div>
        </Fragment>
    );
};
export default EventListing;
