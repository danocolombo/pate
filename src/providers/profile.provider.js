import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../pateGraphql/queries';
import * as mutations from '../pateGraphql/mutations';
import { printObject } from '../utils/helpers';
export const updateLegacyAsMigrated = async (dynamoId, graphqlId) => {
    async function updateTheUserRecord() {
        try {
            fetch(
                'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/users',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        operation: 'setMigrated',
                        payload: {
                            uid: dynamoId,
                            migrated: true,
                            gqlUserId: graphqlId,
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
    await updateTheUserRecord();

    // try {
    //     let returnValue = {};
    //     let inputVariables = {
    //         uid: dynamoId,
    //         migrated: true,
    //         gqlUserId: graphqlId,
    //     };
    //     await fetch(
    //         'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/users',
    //         {
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 operation: 'setMigrate',
    //                 payload: inputVariables,
    //             }),
    //             headers: {
    //                 'Content-type': 'application/json; charset=UTF-8',
    //             },
    //         }
    //     )
    //         .then((response) => response.json())
    //         .then((data) => {
    //             if (data?.body?.Items[0]) {
    //                 returnValue = { status: 200, data: data?.body?.Items[0] };
    //             } else {
    //                 returnValue = { status: 404, data: {} };
    //             }
    //         });
    //     return returnValue;
    // } catch (error) {
    //     return {
    //         status: 400,
    //         data: error,
    //         line: 84,
    //     };
    // }
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
export const updateGQLUserPersonalInfo = async (profileInfo) => {
    if (!profileInfo) {
        return { status: 400, data: 'profileInfo is required' };
    }
    const inputVariables = {
        id: profileInfo.id,
        firstName: profileInfo.firstName,
        lastName: profileInfo.lastName,
        phone: profileInfo.phone,
    };
    try {
        let returnValue = {};
        const updateUserResults = await API.graphql({
            query: mutations.updateUser,
            variables: { input: inputVariables },
        });
        if (updateUserResults?.data?.updateUser?.id) {
            //==========================================
            // update REDUX
            //==========================================
            returnValue = {
                status: 200,
                data: updateUserResults?.data?.updateUser,
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
