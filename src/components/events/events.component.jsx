import React from 'react';
import axios from 'axios';
import ReactDom from 'react-dom';

import {
    api_get_header_config,
    api_header_config,
} from '../../include/api_headers';

import './events.styles.scss';
const util = require('util');
// ---- notes on doing async await in componentDidMount
// https://www.valentinog.com/blog/await-react/
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
                console.log(data);
                console.log('one more line');
                this.setState({ plans: data });
            });
    }

    render() {
        return (
            <div className='events'>
                <h2 className='title'>Principle 8 Rally Events</h2>
                <span>Below you will find the current events</span>
                {console.log(
                    'state.plans: ' +
                        util.inspect(this.state.plans, {
                            showHidden: false,
                            depth: null,
                        })
                )}
                {console.log('##' + this.state.plans.body?.Items[0].eventDate)}
                {this.state.plans.body?.Items.map((plan) => (
                    <h3>{plan.eventDate}</h3>
                ))}
                {console.log('DONE')}
            </div>
        );
    }
}

export default Events;
