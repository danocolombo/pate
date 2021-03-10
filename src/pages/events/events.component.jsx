import React from 'react';
import axios from 'axios';
import ReactDom from 'react-dom';
import {
    api_get_header_config,
    api_header_config,
} from '../../include/api_headers';

import './events.styles.scss';
import EventListing from '../../components/events/eventListing.component';
import Header from '../../components/header/header.component';

class Events extends React.Component {
    constructor() {
        super();
        this.state = { data: [], plans: [], cnt: 0 };
    }
    async componentDidMount() {
        await fetch(
            'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
            {
                method: 'POST',
                body: JSON.stringify({
                    operation: 'getActiveEvents',
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                this.setState({ plans: data.body });
            });
    }

    render() {
        return (
            <>
                <Header />
                <div className='events-wrapper'>
                    <div className='events'>
                        <h2 className='title'>Principle 8 Rally Events</h2>
                        <span>Below you will find the current events</span>
                        {this.state.plans.map((plan) => (
                            <EventListing event={plan} key={plan.uid} />
                        ))}
                    </div>
                </div>
            </>
        );
    }
}

export default Events;
