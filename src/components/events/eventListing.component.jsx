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
        switch (m) {
            case '01':
                return 'JAN';
            case '02':
                return 'FEB';
            case '03':
                return 'MAR';
            case '04':
                return 'APR';
            case '05':
                return 'MAY';
            case '06':
                return 'JUN';
            case '07':
                return 'JUL';
            case '08':
                return 'AUG';
            case '09':
                return 'SEP';
            case '10':
                return 'OCT';
            case '11':
                return 'NOV';
            case '12':
                return 'DEC';
            default:
                return 'UNK';
        }
    };
    const day2Display = (d) => {
        let day = d.substring(6, 8);
        return day;
    };
    return (
        <Fragment>
            <div id='event-box'>
                <div className='date-box'>
                    <div className='event-month'>
                        {month2Display(eventDate)}
                    </div>
                    <div className='event-day'>{day2Display(eventDate)}</div>
                </div>
                <div className='location-box'>
                    <div className='event-name'>{location.name}</div>
                    <div className='event-street'>{location.street}</div>
                    <div className='event-city'>{location.city}</div>
                    <div className='postal-code'>{location.postalCode}</div>
                </div>
            </div>
        </Fragment>
    );
};
export default EventListing;
