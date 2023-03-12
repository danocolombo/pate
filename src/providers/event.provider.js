import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../pateGraphql/queries';
import { printObject } from '../utils/helpers';
export const updateLegacyEventAsMigrated = async (dynamoId, graphqlId) => {
    async function updateTheEventRecord() {
        try {
            fetch(
                'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        operation: 'setMigrated',
                        payload: {
                            uid: dynamoId,
                            migrated: true,
                            gqlEventId: graphqlId,
                        },
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    printObject('MIGRATED:\n', data);
                });
        } catch (error) {
            console.log('Error fetching registrations \n' + error);
        }
    }
    await updateTheEventRecord();
};

export const getCRP8EventsNotMigrated = async () => {
    try {
        let returnValue = {};
        await fetch(
            'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events',
            {
                method: 'POST',
                body: JSON.stringify({
                    operation: 'getAllEvents',
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                // will ave array in data.body.Items
                let returnArray = [];
                const returnedEvents = data.body.Items;
                returnedEvents.forEach((r) => {
                    if (r.affiliate === 'CRP8') {
                        if (r?.migrated === true) {
                            console.log(`${r.uid} is already migrated`);
                        } else {
                            returnArray.push(r);
                        }
                    }
                });
                if (returnArray.length > 0) {
                    returnValue = { status: 200, data: returnArray };
                } else {
                    returnValue = { status: 404, data: [] };
                }
            });
        return returnValue;
    } catch (error) {
        return {
            status: 400,
            data: error,
            line: 142,
        };
    }
};
