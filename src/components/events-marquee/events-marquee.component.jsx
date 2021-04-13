import React from 'react';
import './events-marquee.styles.scss';
const EventMarquee = () => {
    return (
        <div className='events-marquee-compoment__events-wrapper'>
            <div className='events-marquee-component__events-box'>
                <div className='events-marquee-component__page-title'>
                    Upcoming P8 Rallies
                </div>
                <div className='events-marquee-component__event-box'>
                    <div className='events-marquee-component__event-date'>
                        APR 24
                    </div>
                    <div className='events-marquee-component__event-church-name'>
                        Viola Church
                    </div>
                    <div className='events-marquee-component__event-church-data'>
                        365 International Park
                        <br /> Newnan, GA
                        <br /> 30265
                    </div>
                    <div className='events-marquee-component__view-details'>
                        <a
                            className='events-marquee-component__view-details-link'
                            href='/'
                        >
                            VIEW DETAILS
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventMarquee;
