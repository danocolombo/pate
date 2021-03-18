import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { withAuthenticator } from '@aws-amplify/ui-react';
import './profile.styles.scss';

import Header from '../../components/header/header.component';
import PersonalProfile from '../../components/profile/profile.component';
class UserProfile extends React.Component {
    constructor() {
        super();
        this.state = { plan: [] };
    }
    async componentDidMount() {
        // const id = this.props.match.params.id;
        // await fetch(
        //     'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
        //     {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             operation: 'getEvent',
        //             payload: {
        //                 uid: id,
        //             },
        //         }),
        //         headers: {
        //             'Content-type': 'application/json; charset=UTF-8',
        //         },
        //     }
        // )
        //     .then((response) => response.json())
        //     .then((data) => {
        //         this.setState({ plan: data });
        //     });
    }

    render() {
        return (
            <>
                <Header />

                <div className='profilepagewrapper'>
                    <div className='pageheader'>PERSONAL PROFILE</div>
                    <PersonalProfile />
                </div>
            </>
        );
    }
}
export default compose(withAuthenticator, withRouter)(UserProfile);
