import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { printObject, prettyDate, prettyTime } from '../../utils/helpers';
import './event.styles.scss';
//event: { uid, eventDate, startTime, endTime, location },
const EventDetails = ({ theRally }) => {
    // printObject('EC:7-->theRally:\n', theRally);
    //get data ready to display
    const displayThis = theRally;
    console.log('EC2:10-->displayThis:\n', displayThis);
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

    return (
        <>
            <div className='event-details-component__wrapper'>
                <div className='event-details-component__form-box'>
                    <div className='event-details-component__header'>
                        THE EVENT
                    </div>
                    <div className='event-details-component__section-header'>
                        {displayThis?.event?.name}
                    </div>
                    <div className='event-details-component__church-address-line'>
                        {displayThis?.event?.location?.street}
                    </div>
                    <div className='event-details-component__church-address-line'>
                        {displayThis?.event?.location?.city},
                        {displayThis?.event?.location?.stateProv}&nbsp;
                        {displayThis?.event?.location?.postalCode}
                    </div>
                    <div className='event-details__event-date'>
                        {prettyDate(displayThis?.eventDate)}
                    </div>
                    <div className='event-details__event-time'>
                        {prettyTime(displayThis?.event?.startTime)} -{' '}
                        {prettyTime(displayThis?.event?.endTime)}
                    </div>
                    <div className='event-details__event-message'>
                        {displayThis?.message}
                    </div>
                </div>
            </div>
        </>
    );
};
export default EventDetails;
//this was working..
// <span>{displayThis.location.name}</span>;

//
