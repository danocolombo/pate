import { API } from 'aws-amplify';
import * as mutations from '../pateGraphql/mutations';
import { printObject } from '../utils/helpers';
import { wait } from '@testing-library/react';

export async function createNewGQLProfile(payload) {
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
            query: mutations.createNewProfileResidence,
            variables: { input: residenceInput },
        });
        await wait2Seconds();
        const UseResults = await API.graphql({
            query: mutations.createNewProfileUser,
            variables: { input: userInput },
        });

        await wait2Seconds();
        const AffResults = await API.graphql({
            query: mutations.createNewProfileAffiliation,
            variables: { input: affiliationInput },
        });

        const newCreatedProfile = {
            ...UseResults.data.createUser,
            residence: ResResults.data.createResidence,
            registrations: { items: [] },
            affiliations: AffResults.data.createAffiliation,
            events: { items: [] },
        };

        let returnValue = {
            status: 200,
            data: newCreatedProfile,
        };
        return returnValue;
    } catch (e) {
        let returnValue = { status: 400, data: 'error', error: e };
        return returnValue;
    }
}

export async function createNewGQLEvent(payload) {
    try {
        const locationInput = {
            id: payload.location.id,
            street: payload.location.street,
            city: payload.location.city,
            stateProv: payload.location.stateProv,
            postalCode: payload.location.postalCode,
            latitude: payload.location.latitude,
            longitude: payload.location.longitude,
        };
        const contactInput = {
            id: payload.contact.id,
            firstName: payload.contact.firstName,
            lastName: payload.contact.lastName,
            email: payload.contact.email,
            phone: payload.contact.phone,
            street: payload.contact.street,
            city: payload.contact.city,
            stateProv: payload.contact.stateProv,
            postalCode: payload.contact.postalCode,
        };
        const mealOffered = !!Object.keys(payload.meal).length;
        let mealInput = {};
        if (mealOffered) {
            mealInput = {
                id: payload.meal.id,
                deadline: payload.meal.deadline,
                cost: payload.meal.cost,
                plannedCount: payload.meal.plannedCount,
                actualCount: payload.meal.acutalCount,
                startTime: payload.meal.startTime,
                message: payload.meal.message,
                mealEventId: payload.event.id,
            };
        }
        const eventInput = {
            id: payload.event.id,
            eventDate: payload.event.eventDate,
            eventCompKey: payload.event.eventCompKey,
            status: payload.event.status,
            plannedCount: payload.event.plannedCount,
            actualCount: payload.event.actualCount,
            mealPlannedCount: payload.event.mealPlannedCount,
            mealActualCount: payload.event.mealActualCount,
            startTime: payload.event.startTime,
            endTime: payload.event.endTime,
            message: payload.event.message,
            name: payload.event.name,
            graphic: payload.event.graphic,
            divisionEventsId: payload.event.divisionEventsId,
            eventLocationEventsId: payload.event.eventLocationEventsId,
            eventContactEventsId: payload.event.eventContactEventsId,
            userEventsId: payload.event.userEventsId,
            eventMealId: payload.event.eventMealId,
        };
        let DANO = false;
        if (DANO) {
            console.log('NOT YET...');
            printObject('LOCATION:\n', locationInput);
            printObject('CONTACT:\n', contactInput);
            printObject('MEAL:\n', mealInput);
            printObject('EVENT:\n', eventInput);
            return;
        }
        //  RE-USABLE WAIT FUNCTION
        async function wait2Seconds() {
            return new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
        }

        const LocationResults = await API.graphql({
            query: mutations.createEventLocation,
            variables: { input: locationInput },
        });
        await wait2Seconds();
        const ContactResults = await API.graphql({
            query: mutations.createEventContact,
            variables: { input: contactInput },
        });

        await wait2Seconds();
        const MealResults = await API.graphql({
            query: mutations.createMeal,
            variables: { input: mealInput },
        });
        await wait2Seconds();
        const EventResults = await API.graphql({
            query: mutations.createEvent,
            variables: { input: eventInput },
        });

        const newEventResults = {
            ...EventResults.data.createUser,
            location: LocationResults.data.createEventLocation,
            contact: ContactResults.data.createEventContact,
            meal: MealResults.data.createMeal,
        };

        let returnValue = {
            status: 200,
            data: newEventResults,
        };
        return returnValue;
    } catch (e) {
        let returnValue = { status: 400, data: 'error', error: e };
        return returnValue;
    }
}
