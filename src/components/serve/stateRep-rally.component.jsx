import React from 'react';
import { Link } from 'react-router-dom';
import './serve.styles.scss';
const StateRepRally = ({ rally }) => {
    const dateToDisplay = () => {
        let em = parseInt(rally.eventDate.substring(4, 6));
        let ed = parseInt(rally.eventDate.substring(6, 8));
        let eventDate = em + '/' + ed;
        return eventDate;
    };
    return (
        <div className='sr-rally-list-item'>
            <Link to={`/serveevent/${rally.uid}`} className='sr-rally-link'>
                <div className='sr-rally-date'>{dateToDisplay()}</div>
                <div className='sr-rally-location'>{rally.location.name}</div>
            </Link>
        </div>
    );
};

export default StateRepRally;
