import React from 'react';
import axios from 'axios';
import ReactDom from 'react-dom';
import {
    api_get_header_config,
    api_header_config,
} from '../../include/api_headers';

import './events.styles.scss';
import EventListing from '../../components/event-listing/event-listing.component';
import Header from '../../components/header/header.component';
import EventsMarquee from '../../components/events-marquee/events-marquee.component';
// import EventsMarquee2 from '../../components/events-marquee/events-marquee2.component';
import { MainFooter } from '../../components/footers/main-footer';
import Spinner from '../../components/spinner/Spinner';
import EventMarquee2 from '../../components/events-marquee/event-marquee2.component';
class Events extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            plans: [],
            cnt: 0,
            loading: true,
            noPlans: true,
        };
    }
    async componentDidMount() {
        await fetch(
            'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
            {
                method: 'POST',
                body: JSON.stringify({
                    operation: 'getAllActiveApprovedEvents',
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
                <div className='events-marquee-compoment__events-wrapper'>
                    <div className='events-marquee-component__events-box'>
                        
                        <div className='events-page__events-box2'>
                            {this.state.plans.length > 0 ? (
                                this.state.plans.map((plan) =>
                                    plan.approved ? (
                                        <>
                                            {(this.noPlans = false)}
                                            <div className='events-marquee-component__page-title'>
                                                Upcoming P8 Rallies
                                            </div>
                                            <EventMarquee2
                                                event={plan}
                                                key={plan.uid}
                                            />
                                            {this.noPlans ? (
                                                <>
                                                    <img
                                                        className='events-marquee-component__graphic-image'
                                                        src='https://pate-images.s3.amazonaws.com/NoEvents.png'
                                                        alt='No Scheduled Events. Come Back Soon for more info'
                                                    />
                                                </>
                                            ) : null}
                                        </>
                                    ) : null
                                )
                            ) : (
                                <>
                                    <img
                                        className='events-page__no-events-image'
                                        src='https://pate-images.s3.amazonaws.com/NoEvents.png'
                                        alt='No Scheduled Events. Come Back Soon for more info'
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <MainFooter />
            </>
        );
    }
}

export default Events;
