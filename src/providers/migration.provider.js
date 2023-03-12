import { printObject } from '../utils/helpers';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../pateGraphql/queries';
import * as coreQueries from '../graphql/queries';
export const getEventRegistrationsFromDDB = async () => {
    let returnValue = {};
    try {
        await fetch(
            'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
            {
                method: 'POST',
                body: JSON.stringify({
                    operation: 'getEventRegistrations',
                    payload: {
                        eid: '65ff55fb33fe4c0447b086188f2e9b1f',
                    },
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                // will ave array in data.body.Items
                const returnedEvents = data.body;

                if (returnedEvents.length > 0) {
                    returnValue = { statusCode: 200, data: returnedEvents };
                } else {
                    returnValue = { status: 404, data: [] };
                }
                // return returnValue;
            });
    } catch (error) {
        console.log('Error fetching users \n' + error);
        console.err(error);
    }
    return returnValue;
};
