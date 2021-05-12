import React from 'react'
import Amplify from "aws-amplify";
import {AmplifyS3Image} from "@aws-amplify/ui-react";
import awsconfig from "../../aws-exports";
// Amplify.configure(awsconfig);
const ShowImage = () => {
    return (
        <div>
            Show Rob from S3 bucket
            <AmplifyS3Image imgKey="events/rob8.gif" />;
        </div>
    )
}

export default ShowImage
