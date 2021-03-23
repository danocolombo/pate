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
import Spinner from '../../components/spinner/Spinner';
class Events extends React.Component {
    constructor() {
        super();
        this.state = { data: [], plans: [], cnt: 0, loading: true };
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
        return this.loading ? (
            <Spinner />
        ) : (
            <>
                <Header />
                <div className='events-wrapper'>
                    <div>
                        <h2>Upcoming Principle 8 Rallies</h2>
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
