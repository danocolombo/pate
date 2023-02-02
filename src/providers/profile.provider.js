import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../pateGraphql/queries';
export const getGQLProfile = async (sub) => {
    if (!sub) {
        return { status: 400, data: 'sub is required' };
    }
    const variables = {
        id: sub,
    };
    try {
        API.graphql(graphqlOperation(queries.getProfileBySub, variables))
            .then((gqlProfile) => {
                if (gqlProfile?.data?.listUsers?.items.length > 0) {
                    return { status: 200, data: gqlProfile?.data?.items[0] };
                } else {
                    return {
                        status: 404,
                        data: 'graphql profile not found',
                        line: 16,
                    };
                }
            })
            .catch((error) => {
                return {
                    status: 400,
                    data: 'error during gql query',
                    message: error,
                    line: 24,
                };
            });
    } catch (error) {
        return { status: 400, data: error, line: 28 };
    }
};
export const getDDBProfile = async (sub) => {
    try {
        await fetch(process.env.REACT_APP_PATE_API, {
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
        })
            .then((response) => response.json())
            .then((response) => {
                if (response?.body?.Items.length > 0) {
                    return { status: 200, data: response.body.Items[0] };
                } else {
                    return { status: 404, data: {} };
                }
            });
    } catch (error) {
        return {
            status: 400,
            data: error,
            line: 54,
            endPoint: process.env.REACT_APP_PATE_API,
        };
    }
};
