import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { withAuthenticator } from '@aws-amplify/ui-react';
import './registration.styles.scss';
import RegistrationDetails from '../../components/registration-details/registration-details-component';
import Header from '../../components/header/header.component';

class EventRegistration extends React.Component {
    constructor() {
        super();
        this.state = { plan: [] };
    }
    async componentDidMount() {
        let id = this.props.match.params.id;
        //need to determine if the first 3 digits are REG, which
        //means that the request is to get a registration already
        //saved.
        let regCheck = "";
        
        if(id.length > 3){
            regCheck = id.substring(0,3);
            if(regCheck === "REG"){
                id=id.slice(3);
                
            }
        
            
            // const regCheck = id.subString(0,3);
            // console.log("check:" + regCheck);
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
    }

    render() {
        return (
            <>
                <Header />

                <div className='registrationpagewrapper'>
                    <div className='registration-pageheader'>REGISTRATION</div>
                    <RegistrationDetails theEvent={this.state.plan} uid={this.props.match.params.id}/>
                </div>
            </>
        );
    }
}
export default withRouter(EventRegistration);
