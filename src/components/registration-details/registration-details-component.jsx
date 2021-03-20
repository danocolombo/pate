import React, { Fragment, useState } from 'react';

import './registration-details.styles.scss';
const RegistrationDetails = ({ theEvent }) => {
    const [registrationCount, setRegistrationCount] = useState('0');
    const util = require('util');

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
    const handleChange = (e) => {
        const { value, name } = e.target;
        setRegistrationCount(value);
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
                <div className='eventdatewrapper'>
                    <div className='eventdate'>{displayDate()}</div>
                    <div className='eventdate'>{displayTimes()}</div>
                </div>
                <div className='eventmessage'>
                    <div>{displayThis?.message}</div>
                </div>
            </div>
            <div className='formwrapper'>
                <form>
                    <div className='eventmessage'>
                        <div>
                            Your profile will be used for contact reference.
                        </div>
                        <div>
                            <label htmlFor='firstName'>First name</label>
                            <input
                                type='number'
                                name='regCount'
                                id='regCount'
                                value={registrationCount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <button>OK</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default RegistrationDetails;
