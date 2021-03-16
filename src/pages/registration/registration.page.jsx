import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { withAuthenticator } from '@aws-amplify/ui-react';
import './registration.styles.scss';
import EventDetails from '../../components/event-details/event-component';
import Header from '../../components/header/header.component';

class EventRegistration extends React.Component {
    constructor() {
        super();
        this.state = { plan: [] };
    }
    async componentDidMount() {
        const id = this.props.match.params.id;
        await fetch(
            'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
            {
                method: 'POST',
                body: JSON.stringify({
                    operation: 'getEvent',
                    payload: {
                        uid: id,
                    },
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                this.setState({ plan: data });
            });
    }

    render() {
        return (
            <>
                <Header />

                <div className='registrationpagewrapper'>
                    <div className='pageheader'>REGISTRATION</div>
                    <EventDetails theEvent={this.state.plan} />
                </div>
            </>
        );
    }
}
export default compose(withAuthenticator, withRouter)(EventRegistration);
