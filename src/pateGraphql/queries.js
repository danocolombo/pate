/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrganization = /* GraphQL */ `
    query GetOrganization($id: ID!) {
        getOrganization(id: $id) {
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
export const listOrganizations = /* GraphQL */ `
    query ListOrganizations(
        $filter: ModelOrganizationFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listOrganizations(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
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
            nextToken
        }
    }
`;
export const getDivision = /* GraphQL */ `
    query GetDivision($id: ID!) {
        getDivision(id: $id) {
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
//      getRepRallies
export const getRepRallies = /* GraphQL */ `
    query MyQuery($divisionId: ID!, $coordinatorId: ID!) {
        listDivisions(filter: { id: { eq: $divisionId } }) {
            items {
                events(filter: { userEventsId: { eq: $coordinatorId } }) {
                    items {
                        id
                        eventDate
                        startTime
                        endTime
                        status
                        name
                        location {
                            street
                            city
                            stateProv
                            postalCode
                        }
                        coordinator {
                            id
                            firstName
                            lastName
                        }
                    }
                }
            }
        }
    }
`;
//      DONE WITH GETREPRALLIES
//      GET DIVISION RALLIES

export const getAllDivisionEvents2 = /* GraphQL */ `
    query MyQuery($id: ID!) {
        getDivision(id: $id) {
            events {
                items {
                    id
                    name
                    eventDate
                    startTime
                    endTime
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    location {
                        id
                        street
                        city
                        stateProv
                        postalCode
                        latitude
                        longitude
                    }
                    meal {
                        id
                        deadline
                        startTime
                        cost
                        message
                        plannedCount
                        actualCount
                    }
                    contact {
                        id
                        firstName
                        lastName
                        street
                        city
                        stateProv
                        postalCode
                        email
                        phone
                    }
                    coordinator {
                        id
                        sub
                        firstName
                        lastName
                        username
                    }
                }
            }
        }
    }
`;
//      GET ACTIVE DIVISION RALLIES
export const getDivisionEventsByDateStatus = /* GraphQL */ `
    query MyQuery($id: ID!, $eq: String!, $ge: String!) {
        getDivision(id: $id) {
            events(filter: { status: { eq: $eq }, eventDate: { ge: $ge } }) {
                items {
                    id
                    name
                    eventDate
                    startTime
                    endTime
                    status
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    location {
                        id
                        street
                        city
                        stateProv
                        postalCode
                        latitude
                        longitude
                    }
                    meal {
                        id
                        deadline
                        startTime
                        cost
                        message
                        plannedCount
                        actualCount
                    }
                    contact {
                        id
                        firstName
                        lastName
                        street
                        city
                        stateProv
                        postalCode
                        email
                        phone
                    }
                    coordinator {
                        id
                        sub
                        firstName
                        lastName
                        username
                    }
                }
            }
        }
    }
`;
export const getDivisionEvents = /* GraphQL */ `
    query MyQuery($divId: ID!, $startDate: String) {
        getDivision(id: $divId) {
            code
            events(
                sortDirection: ASC
                filter: { eventDate: { ge: $startDate } }
            ) {
                items {
                    id
                    name
                    eventCompKey
                    eventDate
                    startTime
                    endTime
                    status
                    message
                    graphic
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    meal {
                        id
                        message
                        deadline
                        cost
                        startTime
                        plannedCount
                        actualCount
                    }
                    location {
                        id
                        street
                        city
                        stateProv
                        postalCode
                        latitude
                        longitude
                    }
                    contact {
                        id
                        firstName
                        lastName
                        phone
                        email
                    }
                    coordinator {
                        id
                        firstName
                        lastName
                        email
                        phone
                    }
                }
            }
        }
    }
`;
export const getAllDivisionEvents = /* GraphQL */ `
    query MyQuery($divId: ID!) {
        getDivision(id: $divId) {
            code
            events(sortDirection: ASC) {
                items {
                    id
                    name
                    eventCompKey
                    eventDate
                    startTime
                    endTime
                    status
                    message
                    graphic
                    plannedCount
                    actualCount
                    mealPlannedCount
                    mealActualCount
                    meal {
                        id
                        message
                        deadline
                        cost
                        startTime
                        plannedCount
                        actualCount
                    }
                    location {
                        id
                        street
                        city
                        stateProv
                        postalCode
                        latitude
                        longitude
                    }
                    contact {
                        id
                        firstName
                        lastName
                        phone
                        email
                    }
                    coordinator {
                        id
                        firstName
                        lastName
                        email
                        phone
                    }
                }
            }
        }
    }
`;
export const listDivisions = /* GraphQL */ `
    query ListDivisions(
        $filter: ModelDivisionFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listDivisions(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
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
            nextToken
        }
    }
`;
export const getAffiliation = /* GraphQL */ `
    query GetAffiliation($id: ID!) {
        getAffiliation(id: $id) {
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
export const listAffiliations = /* GraphQL */ `
    query ListAffiliations(
        $filter: ModelAffiliationFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listAffiliations(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
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
                    createdAt
                    updatedAt
                    divisionDefaultUsersId
                    residenceResidentsId
                }
                division {
                    id
                    code
                    divCompKey
                    createdAt
                    updatedAt
                    organizationDivisionsId
                }
                createdAt
                updatedAt
                divisionAffiliationsId
                userAffiliationsId
            }
            nextToken
        }
    }
`;
export const getProfileBySub = /* GraphQL */ `
    query MyQuery($id: String) {
        listUsers(filter: { sub: { eq: $id } }) {
            items {
                id
                sub
                firstName
                lastName
                username
                email
                phone
                residence {
                    street
                    city
                    stateProv
                    postalCode
                }
                registrations {
                    items {
                        id
                        event {
                            id
                            name
                            eventDate
                            location {
                                city
                                stateProv
                            }
                        }
                    }
                }
                affiliations {
                    items {
                        id
                        role
                        status
                        divisionAffiliationsId
                    }
                }
                defaultDivision {
                    id
                    code
                }
                events {
                    items {
                        id
                        eventDate
                        startTime
                        endTime
                        name
                        location {
                            city
                            stateProv
                        }
                    }
                }
            }
        }
    }
`;
export const getCoordinatorEvents = /* GraphQL */ `
    query GetUser($id: ID!) {
        getUser(id: $id) {
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
export const getCoordinatorEvents2 = /* GraphQL */ `
    query GetUser($id: ID!) {
        getUser(id: $id) {
            events {
            items {
                id
                eventDate
                name
                location{
                    id
                    street
                    city
                    stateProv
                    postalCode
                    latitude
                    longitude
                }
                message
                        status
                startTime
                endTime
                plannedCount
                actualCount
                mealPlannedCount
                mealActualCount
                meal{
                    id
                    message
                    startTime
                    cost
                    deadline
                    plannedCount
                    actualCount
                }
                contact{
                    id
                    firstName
                    lastName
                    phone
                    email
                }
            }
        }
    }
`;
export const getEventDetails = /* GraphQL */ `
    query GetEvent($id: ID!) {
        getEvent(id: $id) {
            id
            status
            name
            eventDate
            startTime
            endTime
            graphic
            message
            actualCount
            plannedCount
            mealActualCount
            mealPlannedCount
            location {
                id
                street
                city
                stateProv
                postalCode
                latitude
                longitude
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
            }
            meal {
                id
                message
                cost
                deadline
                startTime
                plannedCount
                actualCount
            }
            coordinator {
                id
                firstName
                lastName
                email
                phone
            }
            division {
                id
                code
                organization {
                    id
                    code
                }
            }
            registrations {
                items {
                    id
                    attendanceCount
                    mealCount
                    registrar {
                        id
                        firstName
                        lastName
                        email
                        phone
                        residence {
                            street
                            city
                            stateProv
                            postalCode
                        }
                    }
                }
            }
        }
    }
`;
export const getEvent = /* GraphQL */ `
    query GetEvent($id: ID!) {
        getEvent(id: $id) {
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
export const listEvents = /* GraphQL */ `
    query ListEvents(
        $filter: ModelEventFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
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
            nextToken
        }
    }
`;
export const getEventLocation = /* GraphQL */ `
    query GetEventLocation($id: ID!) {
        getEventLocation(id: $id) {
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
export const listEventLocations = /* GraphQL */ `
    query ListEventLocations(
        $filter: ModelEventLocationFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listEventLocations(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
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
            nextToken
        }
    }
`;
export const getEventContact = /* GraphQL */ `
    query GetEventContact($id: ID!) {
        getEventContact(id: $id) {
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
export const listEventContacts = /* GraphQL */ `
    query ListEventContacts(
        $filter: ModelEventContactFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listEventContacts(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
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
            nextToken
        }
    }
`;
export const getMeal = /* GraphQL */ `
    query GetMeal($id: ID!) {
        getMeal(id: $id) {
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
export const listMeals = /* GraphQL */ `
    query ListMeals(
        $filter: ModelMealFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listMeals(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
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
            nextToken
        }
    }
`;
export const getRegistration = /* GraphQL */ `
    query GetRegistration($id: ID!) {
        getRegistration(id: $id) {
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
export const listRegistrations = /* GraphQL */ `
    query ListRegistrations(
        $filter: ModelRegistrationFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listRegistrations(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                id
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
            nextToken
        }
    }
`;
export const getResidence = /* GraphQL */ `
    query GetResidence($id: ID!) {
        getResidence(id: $id) {
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
export const listResidences = /* GraphQL */ `
    query ListResidences(
        $filter: ModelResidenceFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listResidences(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
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
            nextToken
        }
    }
`;
export const getUser = /* GraphQL */ `
    query GetUser($id: ID!) {
        getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
    query ListUsers(
        $filter: ModelUserFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
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
            nextToken
        }
    }
`;
