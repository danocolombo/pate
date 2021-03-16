import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import './event.styles.scss';
//event: { uid, eventDate, startTime, endTime, location },
const EventDetails = ({ theEvent }) => {
    //-------------------------------
    // prep data
    //-------------------------------
    // const mo = {
    //     '01': 'JAN',
    //     '02': 'FEB',
    //     '03': 'MAR',
    //     '04': 'APR',
    //     '05': 'MAY',
    //     '06': 'JUN',
    //     '07': 'JUL',
    //     '08': 'AUG',
    //     '09': 'SEP',
    //     10: 'OCT',
    //     11: 'NOV',
    //     12: 'DEC',
    // };

    // const month2Display = (d) => {
    //     //get the month, the return String
    //     let m = d.substring(4, 6);
    //     let alpha = mo[m];
    //     return alpha;
    // };
    // const day2Display = (d) => {
    //     let dom = d.substring(6, 8);
    //     return dom;
    // };
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
    const displayDate = () => {
        // format the date and return it
        let y = parseInt(displayThis?.eventDate.substring(0, 4));
        let m = parseInt(displayThis?.eventDate.substring(4, 6)) - 1;
        let d = parseInt(displayThis?.eventDate.substring(6, 8));
        let eventDate = new Date(y, m, d);
        let theDate = eventDate.toDateString();

        return theDate;
    };
    const displayTimes = () => {
        if (displayThis?.startTime) {
            let sTime = displayThis?.startTime.split(':');
            let eTime = displayThis?.endTime.split(':');
            console.log(sTime[0]);
            console.log(sTime[1]);
            let startTime = '';
            let endTime = '';
            if (parseInt(sTime[0]) < 13) {
                console.log('less than 13');
                startTime = displayThis?.startTime;
            } else {
                let newHour = parseInt(sTime[0]) - 12;
                console.log('newHour:' + newHour);
                startTime = newHour.toString() + ':' + sTime[1];
                console.log('startTime:' + startTime);
            }
            if (parseInt(eTime[0]) < 13) {
                console.log('less than 13');
                endTime = displayThis.endTime;
            } else {
                let newHour = parseInt(eTime[0]) - 12;
                console.log('newHour:' + newHour);
                endTime = newHour.toString() + ':' + eTime[1];
            }
            let returnValue = startTime + ' - ' + endTime;
            return returnValue;
        } else {
            return null;
        }
    };
    return (
        <>
            <div className='event_wrapper'>
                <div className='event_graphics'>
                    <img
                        className='event_image'
                        src={displayThis?.graphic}
                        alt='CR P8 Rally'
                    ></img>
                </div>
                <div className='church_info'>
                    <div className='church_name'>
                        {displayThis?.location?.name}
                    </div>
                    <div>{displayThis?.location?.street}</div>
                    <div>
                        {displayThis?.location?.city},
                        {displayThis?.location?.state}&nbsp;
                        {displayThis?.location?.postalCode}
                    </div>
                </div>
                <div className='event_date'>{displayDate()}</div>
                <div className='event_date_time'>
                    <div className='event_date'>{displayTimes()}</div>
                </div>
                <div className='event-message'>
                    <div>{displayThis?.message}</div>
                </div>
                
            </div>
        </>
    );
};
export default EventDetails;
//this was working..
// <span>{displayThis.location.name}</span>;

//
