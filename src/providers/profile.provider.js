import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../pateGraphql/queries';
import { printObject } from '../utils/helpers';
export const updateLegacyAsMigrated = async (dynamoId, graphqlId) => {
    try {
        let returnValue = {};
        let inputVariables = {
            uid: dynamoId,
            migrated: true,
            gqlUserId: graphqlId,
        };
        await fetch(
            'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/users',
            {
                method: 'POST',
                body: JSON.stringify({
                    operation: 'setMigrate',
                    payload: inputVariables,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data?.body?.Items[0]) {
                    returnValue = { status: 200, data: data?.body?.Items[0] };
                } else {
                    returnValue = { status: 404, data: {} };
                }
            });
        return returnValue;
    } catch (error) {
        return {
            status: 400,
            data: error,
            line: 84,
        };
    }
};
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
        let returnValue = {};
        if (gqlProfile?.data?.listUsers?.items[0]) {
            returnValue = {
                status: 200,
                data: gqlProfile?.data?.listUsers?.items[0],
            };
        } else {
            returnValue = {
                status: 404,
                data: {},
            };
        }
        return returnValue;
    } catch (error) {
        return { status: 400, data: error, line: 28 };
    }
};

export const getDDBProfile = async (sub) => {
    try {
        let returnValue = {};
        await fetch(
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
        )
            .then((response) => response.json())
            .then((data) => {
                if (data?.body?.Items[0]) {
                    returnValue = { status: 200, data: data?.body?.Items[0] };
                } else {
                    returnValue = { status: 404, data: {} };
                }
            });
        return returnValue;
    } catch (error) {
        return {
            status: 400,
            data: error,
            line: 84,
        };
    }
};
