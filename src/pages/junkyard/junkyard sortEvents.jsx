import React from 'react';

const Leroy = () => {
    const theEvents = {
        body: [
            {
                meal: {
                    startTime: '1200',
                    mealCount: 6,
                    cost: '0',
                    message: 'No cost, just a blessing',
                    mealsServed: 0,
                },
                eventDate: '20210522',
                contact: {
                    name: 'Chase Adams',
                    phone: '770-598-5535',
                    email: '',
                },
                status: 'offered',
                message:
                    'We are excited to offer the first rally have the Covid-19 pandemic',
                stateProv: 'GA',
                coordinator: {
                    name: 'Ron Coleman',
                    id: '0a28050e-5639-4756-86de-6564dfe50b93',
                    phone: '678-2235129',
                    email: 'crrepcoleman@gmail.com',
                },
                uid: '65dc88fb33fe4c0887b086188f2e9b1f',
                name: 'Chestnut Mtn Church',
                registrations: 8,
                city: 'Flowery Branch',
                startTime: '13:00',
                attendees: '0',
                approved: true,
                graphic:
                    'https://pate-images.s3.amazonaws.com/20210522-FloweryBranch-GA.png',
                endTime: '16:00',
                attendance: 0,
                id: '2a7f73c4a7f8601f243b1a89ccc29d7c',
                postalCode: '30542',
                street: '4903 Chestnut Mtn Cir',
            },
            {
                meal: {
                    mealCount: 11,
                    startTime: '1230',
                    cost: '5.00',
                    message: 'Everything but grits',
                    mealsServed: '',
                },
                eventDate: '20210807',
                contact: {
                    name: 'Clark Mars',
                    phone: '7066611234',
                    email: 'km@test.church',
                },
                status: 'available',
                message: 'What the heck...',
                stateProv: 'GA',
                coordinator: {
                    name: 'Dano Colombo',
                    id: 'c45d9046-7667-45db-8c16-60071821ba25',
                    phone: '7066042494',
                    email: 'danocolombo@gmail.com',
                },
                uid: '65ff55fb33fe4c0447b086188f2e9b1g',
                name: 'Test Church',
                registrations: 17,
                startTime: '13:00',
                city: 'Testville',
                approved: false,
                graphic: 'tbd',
                endTime: '16:00',
                attendance: 100,
                id: '2a7f73c4a7f8601f243b1a89ccc29d7c',
                postalCode: '31111',
                street: '100 Broadway',
            },
            {
                meal: {
                    startTime: '1200',
                    mealCount: 30,
                    cost: '0',
                    message: 'No cost, just a blessing',
                    mealsServed: '0',
                },
                eventDate: '20210424',
                contact: {
                    name: 'Ben Hosey',
                    phone: '7067631234',
                    email: 'bh@church.net',
                },
                status: 'offered',
                message: 'It is going to be such a blessing to gather again.',
                stateProv: 'GA',
                coordinator: {
                    name: 'Dano Colombo',
                    id: 'c45d9046-7667-45db-8c16-60071821ba25',
                    phone: '7066042494',
                    email: 'danocolombo@gmail.com',
                },
                uid: '65ff55fb33fe4c0447b086188f2e9b1f',
                name: 'Southcrest Church',
                registrations: 33,
                startTime: '13:00',
                city: 'Newnan',
                graphic:
                    'https://pate-images.s3.amazonaws.com/2021-04-24_Newnan-GA.png',
                approved: true,
                attendees: '0',
                endTime: '16:00',
                attendance: 0,
                id: '2a7f73c4a7f8601f243b1a89ccc29d7c',
                postalCode: '30265',
                street: '365 International Park',
            },
        ],
    };
    let newRally = {};
    let rallyArray = [];
    theEvents.body.map((rally) => {
        console.log(rally.uid);
        console.log(rally.meal.mealCount);
        newRally.meal_mealCount = rally.meal.mealCount;

        newRally.meal_startTime = rally?.meal?.startTime;
        newRally.meal_cost = rally.meal.cost;
        newRally.meal_message = rally.meal.message;
        newRally.meal_mealsServed = rally.meal.mealsServed;
        newRally.eventDate = rally.eventDate;
        newRally.contact_name = rally.contact.name;
        newRally.contact_phone = rally.contact.phone;
        newRally.contact_email = rally.contact.email;
        newRally.status = rally.status;
        newRally.message = rally.message;
        newRally.stateProv = rally.stateProv;
        newRally.coordinator_name = rally.coordinator.name;
        newRally.coordinator_id = rally.coordinator.id;
        newRally.coordinator_phone = rally.coordinator.phone;
        newRally.coordinator_email = rally.coordinator.email;
        newRally.uid = rally.uid;
        newRally.name = rally.name;
        newRally.registrations = rally.regisrations;
        newRally.startTime = rally.startTime;
        newRally.city = rally.city;
        newRally.approved = rally.approved;
        newRally.graphic = rally.graphic;
        newRally.endTime = rally.endTime;
        newRally.attendance = rally.attendance;
        newRally.id = rally.id;
        newRally.postalCode = rally.postalCode;
        newRally.street = rally.street;
        rallyArray.push(newRally);
        newRally = {};
    });
    function compareEventDate(a, b) {
        const eventA = a.eventDate;
        const eventB = b.eventDate;

        let comparison = 0;
        if (eventA > eventB) {
            comparison = 1;
        } else if (eventA < eventB) {
            comparison = -1;
        }
        return comparison;
    }
    console.log(rallyArray.sort(compareEventDate));

    console.log('Rally count: ' + rallyArray.length);

    return <div>Whoa</div>;
};

export default Leroy;
