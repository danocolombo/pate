import {
    GET_EVENT_REGISTRATIONS
} from '../../redux/registrations/registrations.types';
import { loadEventRegistrations } from '../../redux/registrations/registrations.actions';
export const getEventRegistrationsXX = (eid) => {
    try {
        console.log('GETTING REGISTRATIONS for ' + {eid});
    } catch (err) {
        console.error(err);
    }   

}
export const getEventRegistrationsFromDB = () => async (dispatch) => {
    console.log('from Db');
}
export const getEventRegistrations = (eid) => async (dispatch) => {
    try {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log('server-event.actions/getEventRegistrations :: eid (' + eid + ')');
        try {
            fetch(
                'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        operation: 'getRegistrationsForEvent',
                        payload: {
                            eid: eid,
                        },
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    const util = require('util');
                    console.log(
                        'registrations-data:\n' +
                            util.inspect(data.body, {
                                showHidden: false,
                                depth: null,
                            })
                    );
                    loadEventRegistrations(data?.body?.Items);
                });
        } catch (error) {
            console.log('Error fetching registrations \n' + error);
        }

        // dispatch({type: GET_EVENT_REGISTRATIONS});
    } catch (err) {
        console.log('server-event.actions/getEventRegistrations');
        console.error(err);
    }
};