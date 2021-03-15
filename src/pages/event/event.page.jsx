import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import EventDetails from '../../components/event-details/event-component';
import Header from '../../components/header/header.component';
import './event.styles.scss';
const EventDetail = ({match}) => {
    const [eventId, setEventId] = useState(null);
    useEffect(() => {
        setEventId(match.params.id);
        
    }, []);
    const theEvent = {
        uid: eventId,
        eventDate: '20210422',
        startTime: '13:00', 
        endTime: '16:00', 
        location: {
            street: '124 Main St.',
            city: 'Columbus',
            state: 'GA',
            postalcode: '31909'
        }
    }
    return (
        <>
            <Header />
            <div className='event-wrapper'>
                <div>
                    <h1>Details</h1>
                    <EventDetails event={theEvent}/>
                </div>
            </div>
        </> 
    )
};

EventDetail.propTypes = {

}

export default EventDetail
