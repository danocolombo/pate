import React, { Component } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
export class PrivatePage extends Component {
    render() {
        return <div>PRIVATE</div>;
    }
}

export default withAuthenticator(PrivatePage);
