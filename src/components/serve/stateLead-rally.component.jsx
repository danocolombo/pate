import React from 'react';
import { Link } from 'react-router-dom';
import EventListDate from '../ui/dates/serve-date.component';
import './serve.styles.scss';
const StateRallyList = ({ rally }) => {
    const dateToDisplay = () => {
        if (rally.eventDate === '30000101') {
            return 'TBD-';
        }
        let em = parseInt(rally.eventDate.substring(4, 6));
        let ed = parseInt(rally.eventDate.substring(6, 8));
        let eventDate = em + '/' + ed;
        return eventDate;
    };
    // const coordinatorFirstName = () => {
    //     const arrayOfName = rally.coordinator.name.split(' ');
    //     return arrayOfName[0];
    // };
    return (
        <div className='serve-component__link-wrapper'>
            <Link
                to={`/serveevent/${rally.uid}`}
                className='serve-component__rally-link'
            >
                <div className='serve-component-lead__rally-list-item'>
                    <EventListDate date={rally.eventDate} />
                    <div style={{ flexGrow: 1, backgroundColor: 'lightblue' }}>
                        <div className='serve-component-list__church-name'>
                            {rally.name}
                        </div>
                        <div className='serve-component-list__church-location'>
                            {rally?.location?.city},{' '}
                            {rally?.location?.stateProv}
                        </div>
                        <div className='serve-component-list__coordinator'>
                            ({rally?.coordinator?.firstName}{' '}
                            {rally?.coordinator?.lastName})
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default StateRallyList;
