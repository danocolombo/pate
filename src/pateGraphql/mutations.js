/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOrganization = /* GraphQL */ `
    mutation CreateOrganization(
        $input: CreateOrganizationInput!
        $condition: ModelOrganizationConditionInput
    ) {
        createOrganization(input: $input, condition: $condition) {
            id
            appName
            available
            category
            code
            description
            exposure
            label
            name
            title
            value
            divisions {
                items {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const updateOrganization = /* GraphQL */ `
    mutation UpdateOrganization(
        $input: UpdateOrganizationInput!
        $condition: ModelOrganizationConditionInput
    ) {
        updateOrganization(input: $input, condition: $condition) {
            id
            appName
            available
            category
            code
            description
            exposure
            label
            name
            title
            value
            divisions {
                items {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const deleteOrganization = /* GraphQL */ `
    mutation DeleteOrganization(
        $input: DeleteOrganizationInput!
        $condition: ModelOrganizationConditionInput
    ) {
        deleteOrganization(input: $input, condition: $condition) {
            id
            appName
            available
            category
            code
            description
            exposure
            label
            name
            title
            value
            divisions {
                items {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const createDivision = /* GraphQL */ `
    mutation CreateDivision(
        $input: CreateDivisionInput!
        $condition: ModelDivisionConditionInput
    ) {
        createDivision(input: $input, condition: $condition) {
            id
            code
            divCompKey
            organization {
                id
                appName
                available
                category
                code
                description
                exposure
                label
                name
                title
                value
                divisions {
                    nextToken
                }
                createdAt
                updatedAt
            }
            events {
                items {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                nextToken
            }
            affiliations {
                items {
                    id
                    role
                    status
                    createdAt
                    updatedAt
                    divisionAffiliationsId
                    userAffiliationsId
                }
                nextToken
            }
            defaultUsers {
                items {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                nextToken
            }
            createdAt
            updatedAt
            organizationDivisionsId
        }
    }
`;
export const updateDivision = /* GraphQL */ `
    mutation UpdateDivision(
        $input: UpdateDivisionInput!
        $condition: ModelDivisionConditionInput
    ) {
        updateDivision(input: $input, condition: $condition) {
            id
            code
            divCompKey
            organization {
                id
                appName
                available
                category
                code
                description
                exposure
                label
                name
                title
                value
                divisions {
                    nextToken
                }
                createdAt
                updatedAt
            }
            events {
                items {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                nextToken
            }
            affiliations {
                items {
                    id
                    role
                    status
                    createdAt
                    updatedAt
                    divisionAffiliationsId
                    userAffiliationsId
                }
                nextToken
            }
            defaultUsers {
                items {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                nextToken
            }
            createdAt
            updatedAt
            organizationDivisionsId
        }
    }
`;
export const deleteDivision = /* GraphQL */ `
    mutation DeleteDivision(
        $input: DeleteDivisionInput!
        $condition: ModelDivisionConditionInput
    ) {
        deleteDivision(input: $input, condition: $condition) {
            id
            code
            divCompKey
            organization {
                id
                appName
                available
                category
                code
                description
                exposure
                label
                name
                title
                value
                divisions {
                    nextToken
                }
                createdAt
                updatedAt
            }
            events {
                items {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                nextToken
            }
            affiliations {
                items {
                    id
                    role
                    status
                    createdAt
                    updatedAt
                    divisionAffiliationsId
                    userAffiliationsId
                }
                nextToken
            }
            defaultUsers {
                items {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                nextToken
            }
            createdAt
            updatedAt
            organizationDivisionsId
        }
    }
`;
export const createAffiliation = /* GraphQL */ `
    mutation CreateAffiliation(
        $input: CreateAffiliationInput!
        $condition: ModelAffiliationConditionInput
    ) {
        createAffiliation(input: $input, condition: $condition) {
            id
            role
            status
            user {
                id
                sub
                username
                firstName
                lastName
                email
                phone
                defaultDivision {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                residence {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                registrations {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                createdAt
                updatedAt
                divisionDefaultUsersId
                residenceResidentsId
            }
            division {
                id
                code
                divCompKey
                organization {
                    id
                    appName
                    available
                    category
                    code
                    description
                    exposure
                    label
                    name
                    title
                    value
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                createdAt
                updatedAt
                organizationDivisionsId
            }
            createdAt
            updatedAt
            divisionAffiliationsId
            userAffiliationsId
        }
    }
`;
export const createNewProfileAffiliation = /* GraphQL */ `
    mutation CreateAffiliation(
        $input: CreateAffiliationInput!
        $condition: ModelAffiliationConditionInput
    ) {
        createAffiliation(input: $input, condition: $condition) {
            id
            role
            status
            divisionAffiliationsId
            userAffiliationsId
        }
    }
`;
export const updateAffiliation = /* GraphQL */ `
    mutation UpdateAffiliation(
        $input: UpdateAffiliationInput!
        $condition: ModelAffiliationConditionInput
    ) {
        updateAffiliation(input: $input, condition: $condition) {
            id
            role
            status
            user {
                id
                sub
                username
                firstName
                lastName
                email
                phone
                defaultDivision {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                residence {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                registrations {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                createdAt
                updatedAt
                divisionDefaultUsersId
                residenceResidentsId
            }
            division {
                id
                code
                divCompKey
                organization {
                    id
                    appName
                    available
                    category
                    code
                    description
                    exposure
                    label
                    name
                    title
                    value
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                createdAt
                updatedAt
                organizationDivisionsId
            }
            createdAt
            updatedAt
            divisionAffiliationsId
            userAffiliationsId
        }
    }
`;
export const deleteAffiliation = /* GraphQL */ `
    mutation DeleteAffiliation(
        $input: DeleteAffiliationInput!
        $condition: ModelAffiliationConditionInput
    ) {
        deleteAffiliation(input: $input, condition: $condition) {
            id
            role
            status
            user {
                id
                sub
                username
                firstName
                lastName
                email
                phone
                defaultDivision {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                residence {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                registrations {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                createdAt
                updatedAt
                divisionDefaultUsersId
                residenceResidentsId
            }
            division {
                id
                code
                divCompKey
                organization {
                    id
                    appName
                    available
                    category
                    code
                    description
                    exposure
                    label
                    name
                    title
                    value
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                createdAt
                updatedAt
                organizationDivisionsId
            }
            createdAt
            updatedAt
            divisionAffiliationsId
            userAffiliationsId
        }
    }
`;
export const createEvent = /* GraphQL */ `
    mutation CreateEvent(
        $input: CreateEventInput!
        $condition: ModelEventConditionInput
    ) {
        createEvent(input: $input, condition: $condition) {
            id
            eventDate
            eventCompKey
            division {
                id
                code
                divCompKey
                organization {
                    id
                    appName
                    available
                    category
                    code
                    description
                    exposure
                    label
                    name
                    title
                    value
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                createdAt
                updatedAt
                organizationDivisionsId
            }
            registrations {
                items {
                    id
                    attendanceCount
                    mealCount
                    createdAt
                    updatedAt
                    eventRegistrationsId
                    userRegistrationsId
                }
                nextToken
            }
            coordinator {
                id
                sub
                username
                firstName
                lastName
                email
                phone
                defaultDivision {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                residence {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                registrations {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                createdAt
                updatedAt
                divisionDefaultUsersId
                residenceResidentsId
            }
            status
            plannedCount
            actualCount
            mealPlannedCount
            mealActualCount
            startTime
            endTime
            message
            name
            graphic
            location {
                id
                street
                city
                stateProv
                postalCode
                latitude
                longitude
                events {
                    nextToken
                }
                createdAt
                updatedAt
            }
            contact {
                id
                firstName
                lastName
                email
                phone
                street
                city
                stateProv
                postalCode
                events {
                    nextToken
                }
                createdAt
                updatedAt
            }
            meal {
                id
                deadline
                cost
                plannedCount
                actualCount
                startTime
                message
                event {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                createdAt
                updatedAt
                mealEventId
            }
            createdAt
            updatedAt
            divisionEventsId
            eventLocationEventsId
            eventContactEventsId
            userEventsId
            eventMealId
        }
    }
`;
export const updateEvent = /* GraphQL */ `
    mutation UpdateEvent(
        $input: UpdateEventInput!
        $condition: ModelEventConditionInput
    ) {
        updateEvent(input: $input, condition: $condition) {
            id
            eventDate
            eventCompKey
            division {
                id
                code
                divCompKey
                organization {
                    id
                    appName
                    available
                    category
                    code
                    description
                    exposure
                    label
                    name
                    title
                    value
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                createdAt
                updatedAt
                organizationDivisionsId
            }
            registrations {
                items {
                    id
                    attendanceCount
                    mealCount
                    createdAt
                    updatedAt
                    eventRegistrationsId
                    userRegistrationsId
                }
                nextToken
            }
            coordinator {
                id
                sub
                username
                firstName
                lastName
                email
                phone
                defaultDivision {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                residence {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                registrations {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                createdAt
                updatedAt
                divisionDefaultUsersId
                residenceResidentsId
            }
            status
            plannedCount
            actualCount
            mealPlannedCount
            mealActualCount
            startTime
            endTime
            message
            name
            graphic
            location {
                id
                street
                city
                stateProv
                postalCode
                latitude
                longitude
                events {
                    nextToken
                }
                createdAt
                updatedAt
            }
            contact {
                id
                firstName
                lastName
                email
                phone
                street
                city
                stateProv
                postalCode
                events {
                    nextToken
                }
                createdAt
                updatedAt
            }
            meal {
                id
                deadline
                cost
                plannedCount
                actualCount
                startTime
                message
                event {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                createdAt
                updatedAt
                mealEventId
            }
            createdAt
            updatedAt
            divisionEventsId
            eventLocationEventsId
            eventContactEventsId
            userEventsId
            eventMealId
        }
    }
`;
export const updateEventNumbers = /* GraphQL */ `
    mutation UpdateEvent(
        $input: UpdateEventInput!
        $condition: ModelEventConditionInput
    ) {
        updateEvent(input: $input, condition: $condition) {
            id
            plannedCount
            actualCount
            mealPlannedCount
            mealActualCount
        }
    }
`;
export const deleteEvent = /* GraphQL */ `
    mutation DeleteEvent(
        $input: DeleteEventInput!
        $condition: ModelEventConditionInput
    ) {
        deleteEvent(input: $input, condition: $condition) {
            id
            eventDate
            eventCompKey
            division {
                id
                code
                divCompKey
                organization {
                    id
                    appName
                    available
                    category
                    code
                    description
                    exposure
                    label
                    name
                    title
                    value
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                createdAt
                updatedAt
                organizationDivisionsId
            }
            registrations {
                items {
                    id
                    attendanceCount
                    mealCount
                    createdAt
                    updatedAt
                    eventRegistrationsId
                    userRegistrationsId
                }
                nextToken
            }
            coordinator {
                id
                sub
                username
                firstName
                lastName
                email
                phone
                defaultDivision {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                residence {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                registrations {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                createdAt
                updatedAt
                divisionDefaultUsersId
                residenceResidentsId
            }
            status
            plannedCount
            actualCount
            mealPlannedCount
            mealActualCount
            startTime
            endTime
            message
            name
            graphic
            location {
                id
                street
                city
                stateProv
                postalCode
                latitude
                longitude
                events {
                    nextToken
                }
                createdAt
                updatedAt
            }
            contact {
                id
                firstName
                lastName
                email
                phone
                street
                city
                stateProv
                postalCode
                events {
                    nextToken
                }
                createdAt
                updatedAt
            }
            meal {
                id
                deadline
                cost
                plannedCount
                actualCount
                startTime
                message
                event {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                createdAt
                updatedAt
                mealEventId
            }
            createdAt
            updatedAt
            divisionEventsId
            eventLocationEventsId
            eventContactEventsId
            userEventsId
            eventMealId
        }
    }
`;
export const createEventLocation = /* GraphQL */ `
    mutation CreateEventLocation(
        $input: CreateEventLocationInput!
        $condition: ModelEventLocationConditionInput
    ) {
        createEventLocation(input: $input, condition: $condition) {
            id
            street
            city
            stateProv
            postalCode
            latitude
            longitude
            events {
                items {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const updateEventLocation = /* GraphQL */ `
    mutation UpdateEventLocation(
        $input: UpdateEventLocationInput!
        $condition: ModelEventLocationConditionInput
    ) {
        updateEventLocation(input: $input, condition: $condition) {
            id
            street
            city
            stateProv
            postalCode
            latitude
            longitude
            events {
                items {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const deleteEventLocation = /* GraphQL */ `
    mutation DeleteEventLocation(
        $input: DeleteEventLocationInput!
        $condition: ModelEventLocationConditionInput
    ) {
        deleteEventLocation(input: $input, condition: $condition) {
            id
            street
            city
            stateProv
            postalCode
            latitude
            longitude
            events {
                items {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const createEventContact = /* GraphQL */ `
    mutation CreateEventContact(
        $input: CreateEventContactInput!
        $condition: ModelEventContactConditionInput
    ) {
        createEventContact(input: $input, condition: $condition) {
            id
            firstName
            lastName
            email
            phone
            street
            city
            stateProv
            postalCode
            events {
                items {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const updateEventContact = /* GraphQL */ `
    mutation UpdateEventContact(
        $input: UpdateEventContactInput!
        $condition: ModelEventContactConditionInput
    ) {
        updateEventContact(input: $input, condition: $condition) {
            id
            firstName
            lastName
            email
            phone
            street
            city
            stateProv
            postalCode
            events {
                items {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const deleteEventContact = /* GraphQL */ `
    mutation DeleteEventContact(
        $input: DeleteEventContactInput!
        $condition: ModelEventContactConditionInput
    ) {
        deleteEventContact(input: $input, condition: $condition) {
            id
            firstName
            lastName
            email
            phone
            street
            city
            stateProv
            postalCode
            events {
                items {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const createMeal = /* GraphQL */ `
    mutation CreateMeal(
        $input: CreateMealInput!
        $condition: ModelMealConditionInput
    ) {
        createMeal(input: $input, condition: $condition) {
            id
            deadline
            cost
            plannedCount
            actualCount
            startTime
            message
            event {
                id
                eventDate
                eventCompKey
                division {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                registrations {
                    nextToken
                }
                coordinator {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                status
                plannedCount
                actualCount
                mealPlannedCount
                mealActualCount
                startTime
                endTime
                message
                name
                graphic
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                contact {
                    id
                    firstName
                    lastName
                    email
                    phone
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                }
                meal {
                    id
                    deadline
                    cost
                    plannedCount
                    actualCount
                    startTime
                    message
                    createdAt
                    updatedAt
                    mealEventId
                }
                createdAt
                updatedAt
                divisionEventsId
                eventLocationEventsId
                eventContactEventsId
                userEventsId
                eventMealId
            }
            createdAt
            updatedAt
            mealEventId
        }
    }
`;
export const updateMeal = /* GraphQL */ `
    mutation UpdateMeal(
        $input: UpdateMealInput!
        $condition: ModelMealConditionInput
    ) {
        updateMeal(input: $input, condition: $condition) {
            id
            deadline
            cost
            plannedCount
            actualCount
            startTime
            message
            event {
                id
                eventDate
                eventCompKey
                division {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                registrations {
                    nextToken
                }
                coordinator {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                status
                plannedCount
                actualCount
                mealPlannedCount
                mealActualCount
                startTime
                endTime
                message
                name
                graphic
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                contact {
                    id
                    firstName
                    lastName
                    email
                    phone
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                }
                meal {
                    id
                    deadline
                    cost
                    plannedCount
                    actualCount
                    startTime
                    message
                    createdAt
                    updatedAt
                    mealEventId
                }
                createdAt
                updatedAt
                divisionEventsId
                eventLocationEventsId
                eventContactEventsId
                userEventsId
                eventMealId
            }
            createdAt
            updatedAt
            mealEventId
        }
    }
`;
export const deleteMeal = /* GraphQL */ `
    mutation DeleteMeal(
        $input: DeleteMealInput!
        $condition: ModelMealConditionInput
    ) {
        deleteMeal(input: $input, condition: $condition) {
            id
            deadline
            cost
            plannedCount
            actualCount
            startTime
            message
            event {
                id
                eventDate
                eventCompKey
                division {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                registrations {
                    nextToken
                }
                coordinator {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                status
                plannedCount
                actualCount
                mealPlannedCount
                mealActualCount
                startTime
                endTime
                message
                name
                graphic
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                contact {
                    id
                    firstName
                    lastName
                    email
                    phone
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                }
                meal {
                    id
                    deadline
                    cost
                    plannedCount
                    actualCount
                    startTime
                    message
                    createdAt
                    updatedAt
                    mealEventId
                }
                createdAt
                updatedAt
                divisionEventsId
                eventLocationEventsId
                eventContactEventsId
                userEventsId
                eventMealId
            }
            createdAt
            updatedAt
            mealEventId
        }
    }
`;
export const createRegistration = /* GraphQL */ `
    mutation CreateRegistration(
        $input: CreateRegistrationInput!
        $condition: ModelRegistrationConditionInput
    ) {
        createRegistration(input: $input, condition: $condition) {
            id
            event {
                id
                eventDate
                eventCompKey
                division {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                registrations {
                    nextToken
                }
                coordinator {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                status
                plannedCount
                actualCount
                mealPlannedCount
                mealActualCount
                startTime
                endTime
                message
                name
                graphic
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                contact {
                    id
                    firstName
                    lastName
                    email
                    phone
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                }
                meal {
                    id
                    deadline
                    cost
                    plannedCount
                    actualCount
                    startTime
                    message
                    createdAt
                    updatedAt
                    mealEventId
                }
                createdAt
                updatedAt
                divisionEventsId
                eventLocationEventsId
                eventContactEventsId
                userEventsId
                eventMealId
            }
            attendanceCount
            mealCount
            registrar {
                id
                sub
                username
                firstName
                lastName
                email
                phone
                defaultDivision {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                residence {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                registrations {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                createdAt
                updatedAt
                divisionDefaultUsersId
                residenceResidentsId
            }
            createdAt
            updatedAt
            eventRegistrationsId
            userRegistrationsId
        }
    }
`;
export const updateRegistration = /* GraphQL */ `
    mutation UpdateRegistration(
        $input: UpdateRegistrationInput!
        $condition: ModelRegistrationConditionInput
    ) {
        updateRegistration(input: $input, condition: $condition) {
            id
            event {
                id
                eventDate
                eventCompKey
                division {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                registrations {
                    nextToken
                }
                coordinator {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                status
                plannedCount
                actualCount
                mealPlannedCount
                mealActualCount
                startTime
                endTime
                message
                name
                graphic
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                contact {
                    id
                    firstName
                    lastName
                    email
                    phone
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                }
                meal {
                    id
                    deadline
                    cost
                    plannedCount
                    actualCount
                    startTime
                    message
                    createdAt
                    updatedAt
                    mealEventId
                }
                createdAt
                updatedAt
                divisionEventsId
                eventLocationEventsId
                eventContactEventsId
                userEventsId
                eventMealId
            }
            attendanceCount
            mealCount
            registrar {
                id
                sub
                username
                firstName
                lastName
                email
                phone
                defaultDivision {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                residence {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                registrations {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                createdAt
                updatedAt
                divisionDefaultUsersId
                residenceResidentsId
            }
            createdAt
            updatedAt
            eventRegistrationsId
            userRegistrationsId
        }
    }
`;
export const deleteRegistration = /* GraphQL */ `
    mutation DeleteRegistration(
        $input: DeleteRegistrationInput!
        $condition: ModelRegistrationConditionInput
    ) {
        deleteRegistration(input: $input, condition: $condition) {
            id
            event {
                id
                eventDate
                eventCompKey
                division {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                registrations {
                    nextToken
                }
                coordinator {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                status
                plannedCount
                actualCount
                mealPlannedCount
                mealActualCount
                startTime
                endTime
                message
                name
                graphic
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                contact {
                    id
                    firstName
                    lastName
                    email
                    phone
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                }
                meal {
                    id
                    deadline
                    cost
                    plannedCount
                    actualCount
                    startTime
                    message
                    createdAt
                    updatedAt
                    mealEventId
                }
                createdAt
                updatedAt
                divisionEventsId
                eventLocationEventsId
                eventContactEventsId
                userEventsId
                eventMealId
            }
            attendanceCount
            mealCount
            registrar {
                id
                sub
                username
                firstName
                lastName
                email
                phone
                defaultDivision {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                residence {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                registrations {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                createdAt
                updatedAt
                divisionDefaultUsersId
                residenceResidentsId
            }
            createdAt
            updatedAt
            eventRegistrationsId
            userRegistrationsId
        }
    }
`;
export const createResidence = /* GraphQL */ `
    mutation CreateResidence(
        $input: CreateResidenceInput!
        $condition: ModelResidenceConditionInput
    ) {
        createResidence(input: $input, condition: $condition) {
            id
            street
            city
            stateProv
            postalCode
            latitude
            longitude
            residents {
                items {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const createNewProfileResidence = /* GraphQL */ `
    mutation CreateResidence(
        $input: CreateResidenceInput!
        $condition: ModelResidenceConditionInput
    ) {
        createResidence(input: $input, condition: $condition) {
            id
            street
            city
            stateProv
            postalCode
            latitude
            longitude
        }
    }
`;
export const updateResidence = /* GraphQL */ `
    mutation UpdateResidence(
        $input: UpdateResidenceInput!
        $condition: ModelResidenceConditionInput
    ) {
        updateResidence(input: $input, condition: $condition) {
            id
            street
            city
            stateProv
            postalCode
            latitude
            longitude
            residents {
                items {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const deleteResidence = /* GraphQL */ `
    mutation DeleteResidence(
        $input: DeleteResidenceInput!
        $condition: ModelResidenceConditionInput
    ) {
        deleteResidence(input: $input, condition: $condition) {
            id
            street
            city
            stateProv
            postalCode
            latitude
            longitude
            residents {
                items {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const createUser = /* GraphQL */ `
    mutation CreateUser(
        $input: CreateUserInput!
        $condition: ModelUserConditionInput
    ) {
        createUser(input: $input, condition: $condition) {
            id
            sub
            username
            firstName
            lastName
            email
            phone
            defaultDivision {
                id
                code
                divCompKey
                organization {
                    id
                    appName
                    available
                    category
                    code
                    description
                    exposure
                    label
                    name
                    title
                    value
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                createdAt
                updatedAt
                organizationDivisionsId
            }
            residence {
                id
                street
                city
                stateProv
                postalCode
                latitude
                longitude
                residents {
                    nextToken
                }
                createdAt
                updatedAt
            }
            events {
                items {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                nextToken
            }
            registrations {
                items {
                    id
                    attendanceCount
                    mealCount
                    createdAt
                    updatedAt
                    eventRegistrationsId
                    userRegistrationsId
                }
                nextToken
            }
            affiliations {
                items {
                    id
                    role
                    status
                    createdAt
                    updatedAt
                    divisionAffiliationsId
                    userAffiliationsId
                }
                nextToken
            }
            createdAt
            updatedAt
            divisionDefaultUsersId
            residenceResidentsId
        }
    }
`;
export const createNewProfileUser = /* GraphQL */ `
    mutation CreateUser(
        $input: CreateUserInput!
        $condition: ModelUserConditionInput
    ) {
        createUser(input: $input, condition: $condition) {
            id
            sub
            firstName
            lastName
            username
            email
            phone
            defaultDivision {
                id
                code
            }
            divisionDefaultUsersId
            residenceResidentsId
        }
    }
`;
export const createNewProfile = /* GraphQL */ `
    mutation MultiMutation($input: CreateNewProfile!) {
        createResidence(
            input: {
                id: $id
                street: $street
                city: $city
                stateProv: $stateProv
                postalCode: $postalCode
                latitude: $latitude
                longitude: $longitude
            }
        ) {
            id
            street
            city
            stateProv
            postalCode
            latitude
            longitude
        }
        createUser(
            input: {
                id: $id1
                sub: $sub
                username: $username
                firstName: $firstName
                lastName: $lastName
                email: $email
                phone: $phone
                divisionDefaultUsersId: $divisionDefaultUsersId
                residenceResidentsId: $residenceResidentsId
            }
        ) {
            id
            sub
            username
            firstName
            lastName
            email
            phone
            divisionDefaultUsersId
            residenceResidentsId
        }
        createAffiliation(
            input: {
                id: $id2
                role: $role
                status: $status
                divisionAffiliationsId: $divisionAffiliationsId
                userAffiliationsId: $userAffiliationsId
            }
        ) {
            id
            role
            status
            divisionAffiliationsId
            userAffiliationsId
        }
    }
`;
export const createGQLProfile = /* GraphQL */ `
    mutation CreateUserProfile(
        $input: CreateProfileInput!
        $condition: ModelUserConditionInput
    ) {
        createUser(input: $input) {
            userId: id
        }
    }
`;
export const WAScreateGQLProfile = /* GraphQL */ `
    mutation CreateProfile(
        $input: CreateProfileInput!
        $condition: ModelUserConditionInput
    ) {
        createUser(
            input: {
                sub: $sub
                username: $username
                firstName: $firstName
                lastName: $lastName
                email: $email
                phone: $phone
                divisionDefaultUsersId: $divisionDefaultUsersId
            }
        ) {
            userId: id
        }
        createResidence(
            input: {
                street: $street
                city: $city
                stateProv: $stateProv
                postalCode: $postalCode
            }
        ) {
            residenceId: id
        }
    }
`;
export const updateUser = /* GraphQL */ `
    mutation UpdateUser(
        $input: UpdateUserInput!
        $condition: ModelUserConditionInput
    ) {
        updateUser(input: $input, condition: $condition) {
            id
            sub
            username
            firstName
            lastName
            email
            phone
            defaultDivision {
                id
                code
                divCompKey
                organization {
                    id
                    appName
                    available
                    category
                    code
                    description
                    exposure
                    label
                    name
                    title
                    value
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                createdAt
                updatedAt
                organizationDivisionsId
            }
            residence {
                id
                street
                city
                stateProv
                postalCode
                latitude
                longitude
                residents {
                    nextToken
                }
                createdAt
                updatedAt
            }
            events {
                items {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                nextToken
            }
            registrations {
                items {
                    id
                    attendanceCount
                    mealCount
                    createdAt
                    updatedAt
                    eventRegistrationsId
                    userRegistrationsId
                }
                nextToken
            }
            affiliations {
                items {
                    id
                    role
                    status
                    createdAt
                    updatedAt
                    divisionAffiliationsId
                    userAffiliationsId
                }
                nextToken
            }
            createdAt
            updatedAt
            divisionDefaultUsersId
            residenceResidentsId
        }
    }
`;

export const createProfile = /* GraphQL */ `
    mutation($data1: )
`;

export const deleteUser = /* GraphQL */ `
    mutation DeleteUser(
        $input: DeleteUserInput!
        $condition: ModelUserConditionInput
    ) {
        deleteUser(input: $input, condition: $condition) {
            id
            sub
            username
            firstName
            lastName
            email
            phone
            defaultDivision {
                id
                code
                divCompKey
                organization {
                    id
                    appName
                    available
                    category
                    code
                    description
                    exposure
                    label
                    name
                    title
                    value
                    createdAt
                    updatedAt
                }
                events {
                    nextToken
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                createdAt
                updatedAt
                organizationDivisionsId
            }
            residence {
                id
                street
                city
                stateProv
                postalCode
                latitude
                longitude
                residents {
                    nextToken
                }
                createdAt
                updatedAt
            }
            events {
                items {
                    id
                    eventDate
                    eventCompKey
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    startTime
                    endTime
                    message
                    name
                    graphic
                    createdAt
                    updatedAt
                    divisionEventsId
                    eventLocationEventsId
                    eventContactEventsId
                    userEventsId
                    eventMealId
                }
                nextToken
            }
            registrations {
                items {
                    id
                    attendanceCount
                    mealCount
                    createdAt
                    updatedAt
                    eventRegistrationsId
                    userRegistrationsId
                }
                nextToken
            }
            affiliations {
                items {
                    id
                    role
                    status
                    createdAt
                    updatedAt
                    divisionAffiliationsId
                    userAffiliationsId
                }
                nextToken
            }
            createdAt
            updatedAt
            divisionDefaultUsersId
            residenceResidentsId
        }
    }
`;
export const updateMembership = /* GraphQL */ `
  mutation UpdateMembership(
    $input: UpdateMembershipInput!
    $condition: ModelMembershipConditionInput
  ) {
    updateMembership(input: $input, condition: $condition) {
      id
      name
      street
      city
      stateProv
      postalCode
    }
`;
