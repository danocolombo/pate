import React from 'react';

const EventInfo = ({ eventInfo }) => {
    return (
        <div className='registrationpagewrapper'>
            <div className='registration-pageheader'>REGISTRATION</div>
            <>
                <div className='registrationdetailswrapper'>
                    <div className='event_graphics'>
                        {eventInfo?.graphic && eventInfo?.graphic !== 'tbd' ? (
                            <img
                                className='eventimage'
                                src={eventInfo?.graphic}
                                alt='CR P8 Rally'
                            ></img>
                        ) : null}
                    </div>

                    <div className='eventbox' id='eventbox-location'>
                        <div className='registrationchurchname'>
                            {eventInfo?.name}
                        </div>
                        <div>{eventInfo?.street}</div>
                        <div>
                            {eventInfo?.city},{eventInfo?.stateProv}&nbsp;
                            {eventInfo?.postalCode}
                        </div>
                    </div>
                    {/* Date/Time definition */}

                    {/* end border-box layout */}
                    <div className='eventboxclear'></div>
                    <div className='registrationmessage'>
                        <div>{eventInfo?.message}</div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default EventInfo;
// Date/Time definition
// <div className='eventbox' id='eventbox-datetime'>
//     <div className='eventdate'>{displayDate()}</div>
//     <div className='eventtime'>{displayTimes()}</div>
// </div>;
