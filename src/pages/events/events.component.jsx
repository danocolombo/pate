import React from 'react';
import axios from 'axios';
import ReactDom from 'react-dom';
import {
    api_get_header_config,
    api_header_config,
} from '../../include/api_headers';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../pateGraphql/queries';
import './events.styles.scss';
// import RallyList from '../../components/rally-list';
import { Box, Typography } from '@mui/material';
import Header from '../../components/header/header.component';
import EventsMarquee from '../../components/events-marquee/events-marquee.component';
// import EventsMarquee2 from '../../components/events-marquee/events-marquee2.component';
import { MainFooter } from '../../components/footers/main-footer';
import Spinner from '../../components/spinner/Spinner';
// import EventMarquee2 from '../../components/events-marquee/event-marquee2.component';
import EventMarquee3 from '../../components/events-marquee/event-marquee3.component';
import EventMarquee4 from '../../components/events-marquee/event-marquee4.component';
import { getToday, printObject } from '../../utils/helpers';
class Events extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            plans: [],
            cnt: 0,
            loading: true,
            noPlans: true,
            multiplier: 1,
        };
    }

    async componentDidMount() {
        const tday = await getToday();
        const variables = {
            id: 'fffedde6-5d5a-46f0-a3ac-882a350edc64',
            eq: 'approved',
            ge: tday,
        };
        API.graphql(
            graphqlOperation(queries.getDivisionEventsByDateStatus, variables)
        )
            .then((divisionEvents) => {
                if (
                    divisionEvents?.data?.getDivision?.events.items.length > 0
                ) {
                    // setAvailableRallies(
                    //     divisionEvents.data.getDivision.events.items
                    // );
                    this.setState({
                        plans: divisionEvents.data.getDivision.events.items,
                    });
                } else {
                    console.log('L:64--> NO EVENTS TO DISPLAY');
                }
            })
            .catch((error) => {
                printObject(
                    'L--> error getting division events from graphql',
                    error
                );
            });
    }

    render() {
        return this.loading ? (
            <Spinner />
        ) : (
            <>
                <Header />
                <Box
                    className='MyBox-root'
                    sx={{
                        position: 'relative',
                        background:
                            'linear-gradient(to bottom, #384ea3, #ced8e8)',
                        borderRadius: 2,
                        minHeight: `${20 * this.state.multiplier}px`,
                        marginTop: 2,
                        marginBottom: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'top',
                        alignContent: 'center',
                        maxWidth: 400,
                        width: '100%',
                        margin: '0 auto',
                    }}
                >
                    <Typography
                        variant='h5'
                        align='center'
                        marginTop='10px'
                        color='white'
                    >
                        Upcoming Events
                    </Typography>
                    {this.state.plans.length > 0 ? (
                        this.state.plans.map((plan, index) => (
                            <>
                                <EventMarquee4
                                    event={plan}
                                    index={index}
                                    key={plan.id}
                                />
                            </>
                        ))
                    ) : (
                        <img
                            className='events-page__no-events-image'
                            src='https://pate-images.s3.amazonaws.com/NoEvents.png'
                            alt='No Scheduled Events. Come Back Soon for more info'
                        />
                    )}
                </Box>
                <MainFooter />
            </>
        );
    }
}

export default Events;
