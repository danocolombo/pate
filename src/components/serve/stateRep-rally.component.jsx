import React from 'react';
import { Link } from 'react-router-dom';
import { prettyDate } from '../../utils/helpers';
import './serve.styles.scss';
const StateRepRally = ({ rally }) => {
    const dateToDisplay = () => {
        return rally.eventDate;
        //return eventDate;
    };
    return (
        <div className='serve-component__rally-list-item'>
            <div className='serve-component__link-wrapper'>
                <Link
                    to={`/serveevent/${rally.id}`}
                    className='serve-component__rally-link'
                >
                    <div className='serve-component__rally-date'>
                        {prettyDate(rally.eventDate)}
                    </div>
                    <div className='serve-component__rally-name'>
                        {rally.name}
                    </div>
                    <div className='serve-component__rally-location'>
                        {rally.location.city}, {rally.location.stateProv}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default StateRepRally;
