import React, { Fragment } from 'react';
import { AmplifyS3Image } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import './event.styles.scss';
//event: { uid, eventDate, startTime, endTime, location },
const EventDetails = ({ theEvent }) => {
    const util = require('util');

    //get data ready to display
    const displayThis = theEvent?.body?.Items[0];
    //-------------------------------------------------------
    // if the graphic file name is available and not tbd.png
    // add the correct path to display from s3
    //-------------------------------------------------------
    if (displayThis?.graphic) {
        const testValue = displayThis?.graphic;
        if (testValue !== 'tbd.png') {
            if (testValue.length > 0) {
                //have a value that is not tbd.png
                //update path and inject eventID
                let newFileValue =
                    'events/' + displayThis.uid + displayThis.graphic;
                displayThis.graphic = newFileValue;
            }
        }
    }
    // console.log(
    //     'component.dislayThis: \n' +
    //         util.inspect(displayThis, { showHidden: false, depth: null })
    // );
    const displayDate = () => {
        // format the date and return it
        //the new formatted date coming in will look like this...
        //            2021-04-21
        let dateParts = displayThis?.eventDate.split('-');
        console.log(dateParts);
        // dateParts.forEach(element => {
        //     console.log(element);
        // });
        // let newEventDate = new Date(dateParts[0], dateParts[1], dateParts[2]);
        // let newTheDate = newEventDate.toDateString();
        // console.log('newTheDate:' + newTheDate);
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
                    {displayThis?.graphic !== 'tbd' ? (
                        <>
                            {displayThis?.graphic && (
                                <AmplifyS3Image
                                    style={{ '--width': '100%' }}
                                    imgKey={displayThis?.graphic}
                                />
                            )}
                        </>
                    ) : null}
                </div>
                <div className='event-details__church-info'>
                    <div className='event-details__church-name'>
                        {displayThis?.name}
                    </div>
                    <div className='event-details__church-street'>
                        {displayThis?.street}
                    </div>
                    <div className='event-details__city-state-postal'>
                        {displayThis?.city},{displayThis?.stateProv}&nbsp;
                        {displayThis?.postalCode}
                    </div>
                </div>
                <div className='event-details__event-date'>{displayDate()}</div>
                <div className='event-details__event-time'>
                    {displayTimes()}
                </div>
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
