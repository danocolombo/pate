import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './event.styles.scss';
//event: { uid, eventDate, startTime, endTime, location },
const EventDetails = ({ theEvent }) => {
    const util = require('util');

    //get data ready to display
    const displayThis = theEvent;
    // console.log(
    //     'component.dislayThis: \n' +
    //         util.inspect(displayThis, { showHidden: false, depth: null })
    // );
    const displayDate = () => {
        // format the date and return it
        //the new formatted date coming in will look like this...
        //            2021-04-21
        let dateParts = displayThis?.eventDate.split('-');
        let y = parseInt(dateParts[0]);
        let m = parseInt(dateParts[1]) - 1;
        let d = parseInt(dateParts[2]);
        let eventDate = new Date(y, m, d);
        return eventDate.toDateString();
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
            <div className='event-details-component__wrapper'>
                <div className='event-details-component__form-box'>
                    <div className='event-details-component__header'>THE EVENT</div>
                    <div className='event-details-component__section-header'>
                        {displayThis?.name}
                    </div>
                    <div className='event-details-component__church-address-line'>{displayThis?.street}</div>
                    <div className='event-details-component__church-address-line'>
                        {displayThis?.city},{displayThis?.stateProv}&nbsp;
                        {displayThis?.postalCode}
                    </div>
                    <div className='event-details__event-date'>{displayDate()}</div>
                    <div className='event-details__event-time'>{displayTimes()}</div>
                    <div className='event-details__event-message'>{displayThis?.message}</div>
                </div>
            </div>
        </>
    );
};
export default EventDetails;
//this was working..
// <span>{displayThis.location.name}</span>;

//
