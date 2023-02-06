import { API } from 'aws-amplify';
import * as mutations from '../pateGraphql/mutations';
import { printObject } from '../utils/helpers';
import { wait } from '@testing-library/react';

export async function createNewGQLProfile(payload) {
    printObject('PGP:4-->payload:\n', payload);
    try {
        const residenceInput = {
            id: payload.residence.id,
            street: payload.residence.street,
            city: payload.residence.city,
            stateProv: payload.residence.stateProv,
            postalCode: payload.residence.postalCode,
            latitude: payload.residence.latitude,
            longitude: payload.residence.longitude,
        };
        const userInput = {
            id: payload.user.id,
            sub: payload.user.sub,
            username: payload.user.username,
            firstName: payload.user.firstName,
            lastName: payload.user.lastName,
            email: payload.user.email,
            phone: payload.user.phone,
            divisionDefaultUsersId: payload.user.divisionDefaultUsersId,
            residenceResidentsId: payload.user.residenceResidentsId,
        };
        const affiliationInput = {
            id: payload.affiliation.id,
            role: payload.affiliation.role,
            status: payload.affiliation.status,
            divisionAffiliationsId: payload.affiliation.divisionAffiliationsId,
            userAffiliationsId: payload.affiliation.userAffiliationsId,
        };
        async function wait2Seconds() {
            return new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
        }

        const ResResults = await API.graphql({
            query: mutations.createResidence,
            variables: { input: residenceInput },
        });
        await wait2Seconds();
        const UseResults = await API.graphql({
            query: mutations.createUser,
            variables: { input: userInput },
        });

        await wait2Seconds();
        const AffResults = await API.graphql({
            query: mutations.createAffiliation,
            variables: { input: affiliationInput },
        });
        let returnValue = {
            status: 200,
            data: { res: ResResults, use: UseResults, aff: AffResults },
        };
        return returnValue;
    } catch (e) {
        let returnValue = { status: 400, data: 'error', error: e };
        return returnValue;
    }
}
