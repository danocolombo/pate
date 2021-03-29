import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './event.styles.scss';
//event: { uid, eventDate, startTime, endTime, location },
const EventDetails = ({ theEvent }) => {
    const util = require('util');

    //get data ready to display
    const displayThis = theEvent?.body?.Items[0];
    // console.log(
    //     'component.dislayThis: \n' +
    //         util.inspect(displayThis, { showHidden: false, depth: null })
    // );
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

            let startTime = '';
            let endTime = '';
            if (parseInt(sTime[0]) < 13) {
                startTime = displayThis?.startTime;
            } else {
                let newHour = parseInt(sTime[0]) - 12;

                startTime = newHour.toString() + ':' + sTime[1];
            }
            if (parseInt(eTime[0]) < 13) {
                endTime = displayThis.endTime;
            } else {
                let newHour = parseInt(eTime[0]) - 12;
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
            <div className='eventdetailswrapper'>
                <div className='event_graphics'>
                    <img
                        className='event_image'
                        src={displayThis?.graphic}
                        alt='CR P8 Rally'
                    ></img>
                </div>
                <div className='church_info'>
                    <div className='church_name'>{displayThis?.name}</div>
                    <div>{displayThis?.street}</div>
                    <div>
                        {displayThis?.city},{displayThis?.stateProv}&nbsp;
                        {displayThis?.postalCode}
                    </div>
                </div>
                <div className='event_date'>{displayDate()}</div>
                <div className='event_date_time'>
                    <div className='event_date'>{displayTimes()}</div>
                </div>
                <div className='eventmessage'>
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
