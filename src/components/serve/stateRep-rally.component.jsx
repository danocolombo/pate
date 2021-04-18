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
        <div className='serve-component__rally-list-item'>
            <Link to={`/serveevent/${rally.uid}`} className='serve-component__rally-link'>
                <div className='serve-component__rally-date'>{dateToDisplay()}</div>
                <div className='serve-component__rally-location'>{rally.name}</div>
            </Link>
        </div>
    );
};

export default StateRepRally;
