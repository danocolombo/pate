import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './event.styles.scss';
import EventDetails from '../../components/event-details/event-component';
import Header from '../../components/header/header.component';

class Events extends React.Component {
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
                <div className='eventwrapper'>
                    <EventDetails theEvent={this.state.plan} />
                    <div>
                        <Link
                            to={`/registration/${this.state?.plan?.body?.Items[0]?.uid}`}
                        >
                            <button className='registerbutton'>
                                REGISTER NOW
                            </button>
                        </Link>
                    </div>
                </div>
                ;
            </>
        );
    }
}

export default withRouter(Events);
