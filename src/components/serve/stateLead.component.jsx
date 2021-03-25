import React from 'react';
import './serve.styles.scss';
const StateLead = () => {
    return (
        <>
            <div className='event-list-header'>Your State Events</div>
            <div className='message-box'>
                This section displays your state events
            </div>
            <div className='event-list-wrapper'>
                <div className='event-list-item'>latest</div>
                <div className='event-list-item'>older</div>
                <div className='event-list-item'>oldest</div>
            </div>
        </>
    );
};

export default StateLead;
