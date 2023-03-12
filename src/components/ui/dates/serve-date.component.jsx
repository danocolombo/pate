import React from 'react';
import { MONTHS } from '../../../constants/pate';
import './serve-date.styles.scss';
const EventListDate = ({ date }) => {
    const [year, month, day] = date.split('-');

    return (
        <div className='date-box'>
            <div className='date-box__month'>{MONTHS[month - 1]}</div>
            <div className='date-box__day'>{day}</div>
            <div className='date-box__year'>{year}</div>
        </div>
    );
};

export default EventListDate;
