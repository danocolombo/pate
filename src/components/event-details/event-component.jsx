import React, { Fragment } from 'react';
import './event.styles.scss';
//event: { uid, eventDate, startTime, endTime, location },
const EventDetails = ({ theEvent }) => {
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
    const util = require('util');
    // console.log(
    //     'component.theEvent: \n' +
    //         util.inspect(theEvent, { showHidden: false, depth: null })
    // );
    //get data ready to display
    const displayThis = theEvent?.body?.Items[0];
    console.log(
        'component.dislayThis: \n' +
            util.inspect(displayThis, { showHidden: false, depth: null })
    );
    return (
        <>
            <div className='event-graphics'>
                <div>
                    <img
                        className='event-image'
                        src={displayThis?.graphic}
                        alt='CR P8 Rally'
                    ></img>
                </div>
            </div>
            <div className='church-wrapper'>
                <div className='church-name'>{displayThis?.location?.name}</div>
                <div className='church-address-wrapper'>
                    <div className='church-street'>
                        {displayThis?.location?.street}
                    </div>
                    <div className='church-city-state'>
                        <span>
                            {displayThis?.location?.city},{' '}
                            {displayThis?.location?.state}
                        </span>
                    </div>
                    <div className='church-postal-code'>
                        {displayThis?.location?.postalCode}
                    </div>
                </div>
            </div>
            <div className='event-date-time'>
                <div className='event-date'>{displayThis?.eventDate}</div>
                <div className='event-times'>
                    <span>{displayThis?.startTime}</span> -{' '}
                    <span>{displayThis?.endTime}</span>
                </div>
            </div>
            <div className='event-message'>
                <div>{displayThis?.message}</div>
            </div>
        </>
    );
};
export default EventDetails;
//this was working..
// <span>{displayThis.location.name}</span>;
