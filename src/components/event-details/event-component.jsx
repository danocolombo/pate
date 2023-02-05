import React, { Fragment, useEffect, useState } from 'react';
import { AmplifyS3Image } from '@aws-amplify/ui-react';
import { AWS, Storage } from 'aws-amplify';
import { Link } from 'react-router-dom';
import './event.styles.scss';
import { printObject } from '../../utils/helpers';
//event: { uid, eventDate, startTime, endTime, location },
const EventDetails = ({ theEvent }) => {
    // const util = require('util');
    const [eventGraphicFile, setEventGraphicFile] = useState();
    //get data ready to display
    const displayThis = theEvent;

    //-------------------------------------------------------
    // if the graphic file name is available and not tbd.png
    // add the correct path to display from s3
    //-------------------------------------------------------
    useEffect(() => {
        if (displayThis?.graphic) {
            printObject('EC:17-->graphic:\n', displayThis.graphic);
            async function getS3File() {
                const eventGraphic = await Storage.get(
                    `events/${displayThis.id}/${displayThis.graphic}`,
                    {
                        level: 'public',
                    }
                );
                setEventGraphicFile(
                    'https://eor-images-202214132-staging.s3.amazonaws.com/public/events/b70c0a49-dfa0-4671-b48d-38d3dcb1de9c/NorthwayChurch.png'
                );
                setEventGraphicFile(eventGraphic);
                // const tmp = `s3://eor-images-202214132-staging/public/events/b70c0a49-dfa0-4671-b48d-38d3dcb1de9c/${displayThis.graphic}`;
                // setEventGraphicFile(tmp);
            }
            getS3File();
        }
    }, []);
    useEffect(() => {}, []);
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
                                <div>
                                    <img
                                        src='https://eor-images-202214132-staging.s3.amazonaws.com/public/events/b70c0a49-dfa0-4671-b48d-38d3dcb1de9c/NorthwayChurch.png'
                                        alt='Event '
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                        }}
                                    />
                                </div>
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
                <div className='event-details__event-date'>
                    {displayThis.eventDate}
                </div>
                <div className='event-details__event-time'>
                    {displayThis.startTime}
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
