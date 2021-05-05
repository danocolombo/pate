import React from 'react';
import { Link } from 'react-router-dom';
import './serve.styles.scss';
const StateRallyList = ({ rally }) => {
    const dateToDisplay = () => {
        let em = parseInt(rally.eventDate.substring(4, 6));
        let ed = parseInt(rally.eventDate.substring(6, 8));
        let eventDate = em + '/' + ed;
        return eventDate;
    };
    const coordinatorFirstName = () => {
        const arrayOfName = rally.coordinator.name.split(' ');
        return arrayOfName[0];
    };
    return (
        <div className='serve-component__link-wrapper'>
            <Link
                to={`/serveevent/${rally.uid}`}
                className='serve-component__rally-link'
            >
                <div className='serve-component-lead__rally-list-item'>
                    <div className='serve-component-lead__rally-date'>
                        {dateToDisplay()}
                    </div>
                    <div className='serve-component-lead__rally-location'>
                        {rally.name} -
                    </div>
                    <div className='serve-lead-component-lead__rep-name'>
                        ({coordinatorFirstName()})
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default StateRallyList;
