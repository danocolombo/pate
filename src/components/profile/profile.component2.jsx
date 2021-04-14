import React from 'react';
import './profile2.styles.scss';
const EventMarquee = () => {
    return (
        <>
            <div className='profile-component__wrapper'>
                <div className='profile-component__events-box'>
                    <div className='profile-component__page-title'>
                        Upcoming P8 Rallies
                    </div>
                    <div className='profile-component__event-box'>
                        <div className='profile-component__data-row'>
                            <div className='profile-component__data-label'>
                                First name
                            </div>
                            <input
                                className='profile-component__date-control'
                                type='text'
                                name='firstName'
                                id='firstName'
                                value=''
                                onChange=''
                                required
                            />
                        </div>
                        <div className='profile-component__data-row'>
                            <div className='profile-component__data-label'>
                                x
                            </div>
                            <input
                                className='profile-component__date-control'
                                type='text'
                                id='lastName'
                                name='lastName'
                                // onChange={handleChange}
                                // value={lastName}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventMarquee;
