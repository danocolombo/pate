import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../pateGraphql/queries';
import { printObject } from '../utils/helpers';
export const getGQLProfile = async (sub) => {
    if (!sub) {
        return { status: 400, data: 'sub is required' };
    }

    const variables = {
        id: sub,
    };
    try {
        const gqlProfile = await API.graphql(
            graphqlOperation(queries.getProfileBySub, variables)
        );
        return { status: 200, data: gqlProfile };
    } catch (error) {
        return { status: 400, data: error, line: 28 };
    }
};

export const getDDBProfile = async (sub) => {
    try {
        async function getDBData() {
            const response = await fetch(
                'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/users',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        operation: 'getUser',
                        payload: {
                            uid: sub,
                        },
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            );
            return response;
        }
        const values = await getDBData();
        printObject('PP:43=->values:\n', values);
        //* define userData
        /*          
            sub,
            firstName,
            lastName,
            email,
            phone
        */
        return { status: 200, response: values };
        // const data1 = {
        //     sub: response.uid,
        //     firstName: response.firstName || '',
        //     lastName: response.lastName || '',
        //     email: response.email || '',
        //     phone: response.phone || '',
        // };
        // const data2 = {
        //     street: response?.residence?.street || '',
        //     city: response?.residence?.city || '',
        //     stateProv: response?.residence?.stateProv || '',
        //     postalCode: response?.residence?.postalCode || '',
        // };
        // const data3 = {
        //     role: response?.role || '',
        // };
        // return { status: 200, data1: data1, data2: data2, data3: data3 };
    } catch (error) {
        return {
            status: 400,
            data: error,
            line: 54,
            endPoint: process.env.REACT_APP_PATE_API,
        };
    }
};
