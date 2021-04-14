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
            <div className='event-details__wrapper'>
                <div className='event-details__graphic-wrapper'>
                    {displayThis?.graphic !== 'tbd'?(
                    <img
                        className='event-details__graphic-image'
                        src={displayThis?.graphic}
                        alt='CR P8 Rally'
                    ></img>):null}
                </div>
                <div className='event-details__church-info'>
                    <div className='event-details__church-name'>{displayThis?.name}</div>
                    <div className='event-details__church-street'>{displayThis?.street}</div>
                    <div className='event-details__city-state-postal'>
                        {displayThis?.city},{displayThis?.stateProv}&nbsp;
                        {displayThis?.postalCode}
                    </div>
                </div>
                <div className='event-details__event-date'>{displayDate()}</div>
                <div className='event-details__event-time'>{displayTimes()}</div>
                <div className='event-details__event-message'>
                {displayThis?.message}
                </div>
            </div>
        </>
    );
};
export default EventDetails;
//this was working..
// <span>{displayThis.location.name}</span>;

//
