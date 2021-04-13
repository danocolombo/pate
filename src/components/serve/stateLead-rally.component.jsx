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
    }
    return (
        // <a href={`/serveevent/${rally.uid}`} className='state-lead-item-component__date-link'>
        <Link to={`/serveevent/${rally.uid}`} className='state-lead-item-component__date-link'>
        <div className='state-lead-item-component__line-item'>
        <div className='state-lead-item-component__date'>{dateToDisplay()}</div>
            <div className='state-lead-item-component__church-name'>{rally.name} -</div>
            <div className='state-lead-item-component__rep-name'>({coordinatorFirstName()})</div>
            {/* <Link to={`/serveevent/${rally.uid}`} className='state-lead-item-component__date-link'>
            //     <div className='state-lead-item-component__date'>{dateToDisplay()}</div>
            //     <div className='state-lead-item-component__church-name'>{rally.name}</div>
            //     <div className='state-lead-item-component__rep-name'>{rally?.coordinator?.name}</div>
            // </Link> 
            */}
        </div>
        </Link>
    );
};

export default StateRallyList;
