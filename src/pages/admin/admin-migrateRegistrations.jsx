import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { createAWSUniqueID, printObject } from '../../utils/helpers';
import {
    getEventRegistrationsFromDDB,
    getGQLUsers,
} from '../../providers/migration.provider';
import { createNewGQLProfile } from '../../pateGraphql/pateGraphql.provider';
import { DDB_SOUTHCREST_REGS } from '../../assets/data/migration/p8Registrations_SouthCrest';
import { DDB_NORTHWAY_REGS } from '../../assets/data/migration/p8Registrations_Northway';
import { DDB_LIVINGHOPE_REGS } from '../../assets/data/migration/p8Registrations_LivingHope';
import { DDB_CORDELE_REGS } from '../../assets/data/migration/p8Registrations_Cordele';
import { DDB_CROSSVIEW_REGS } from '../../assets/data/migration/p8Registrations_Crossview';
import { DDB_CALVARY_REGS } from '../../assets/data/migration/p8Registrations_Calvary';
import { DDB_CHESTNUT_REGS } from '../../assets/data/migration/p8Registrations_Chestnut';
import { DDB_USERS } from '../../assets/data/migration/p8Users';
import { GQL_USERS } from '../../assets/data/migration/gqlUsers';
import { GQL_REGISTRATIONS } from '../../assets/data/migration/gqlRegistrations';
import { createNewRegistration } from '../../pateGraphql/pateGraphql.provider';
import './registered-users.style.scss';
const MigrateRegistrations = ({ setSpinner, clearSpinner, currentUser }) => {
    const history = useHistory();
    const [gqlUsers, setGQLUsers] = useState([]);
    const [p8Registrations, setP8Registrations] = useState([]);

    // const [gqlUsers, setGQLUsers] = useState([]);
    // const [p8Users, setP8Users] = useState([]);

    const getP8Registrations = async () => {
        const registrationResults = await getEventRegistrationsFromDDB(
            '65ff55fb33fe4c0447b086188f2e9b1f'
        );
        if (registrationResults.statusCode === 200) {
            setP8Registrations(registrationResults.data);
        }
    };

    useEffect(() => {
        if (!currentUser?.authSession?.idToken?.jwtToken) history.push('/');

        getP8Registrations().then(() => {
            //*  p8Registrations loaded
            // for each p8Registration, check user...
            p8Registrations.forEach((reg) => {
                console.log('sub: ', reg?.ruid);
            });
            printObject('registrations:\n', p8Registrations);
            // console.log('done');
        });
    }, []);
    const handleProcessRequest = async () => {
        // console.log('south crest #:', DDB_SOUTHCREST_REGS.body.length);
        // console.log('northway #:', DDB_NORTHWAY_REGS.body.length);
        // console.log('Living Hope #:', DDB_LIVINGHOPE_REGS.body.length);
        // console.log('Cordele #:', DDB_CORDELE_REGS.body.length);
        // console.log('Crossview #:', DDB_CROSSVIEW_REGS.body.length);
        // console.log('Calvary #:', DDB_CALVARY_REGS.body.length);
        // console.log('Chestnut #:', DDB_CHESTNUT_REGS.body.length);

        // console.log('users:', DDB_USERS.body.Count);
        // console.log('Users:', GQL_USERS.body.Count);
        // console.log('GQL Registrations:', GQL_REGISTRATIONS.body.Count);
        //      ===================================
        //      START HERE
        //      ===================================
        const gqlEventID = DDB_SOUTHCREST_REGS.gqlID;
        const registrations = DDB_SOUTHCREST_REGS.body;
        console.log(
            'PROCESSING ' +
                registrations.length +
                ' registrations for Southcrest'
        );

        let gqlUserid = null;
        async function checkUsers() {
            let DDB = { ...registrations };
            let GQL = GQL_USERS.body.Items;
            let MATCH = [];
            let MISS = [];

            async function countMatchingIds() {
                for (let i = 0; i < DDB.length; i++) {
                    let hit = false;
                    for (let j = 0; j < GQL.length; j++) {
                        if (DDB[i].rid === GQL[j].sub) {
                            hit = true;
                            MATCH.push(DDB[i]);
                            j = GQL.length;
                        }
                    }
                    if (!hit) {
                        MISS.push(DDB[i]);
                    }
                }
            }
            //const count = await countMatchingIds();
            console.log('Checking Northway (', DDB.length, ')');
            console.log('MISSING: ', MISS.lognth);
            console.log('HIT: ', MATCH.length);
            MISS.forEach((m) => {
                console.log('missing SUB: ', m.rid);
            });
            MATCH.forEach((m) => {
                console.log('MATCH SUB: ', m.rid);
            });
        }
        // await checkUsers();
        async function createUserInGQL(reg) {
            //      ++++++++++++++++++++++++++++++
            //      create new GQL user
            //      ++++++++++++++++++++++++++++++
            const DDB_USER_ARRAY = DDB_USERS.body.Items.filter((u) => {
                return reg.rid === u.uid;
            });
            const DDB_USER_DETAILS = DDB_USER_ARRAY[0];
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            printObject('DDB_USER_DETAILS:\n', DDB_USER_DETAILS);
            printObject('reg:\n', reg);
            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            const NEW_RESIDENCE_ID = createAWSUniqueID();
            const NEW_USER_ID = createAWSUniqueID();
            const NEW_AFFILIATION_ID = createAWSUniqueID();
            try {
                const newAddition = {
                    residence: {
                        id: NEW_RESIDENCE_ID,
                        street: DDB_USER_DETAILS?.residence?.street || '',
                        city: DDB_USER_DETAILS?.residence?.city || '',
                        stateProv: DDB_USER_DETAILS?.residence?.stateProv || '',
                        postalCode:
                            DDB_USER_DETAILS?.residence?.postalCode || '',
                        latitude: '',
                        longitude: '',
                    },
                    user: {
                        id: NEW_USER_ID,
                        sub: DDB_USER_DETAILS.uid,
                        username: '',
                        firstName: DDB_USER_DETAILS.firstName,
                        lastName: DDB_USER_DETAILS.lastName,
                        email: DDB_USER_DETAILS?.email || '',
                        phone: DDB_USER_DETAILS?.phone || '',
                        divisionDefaultUsersId:
                            'fffedde6-5d5a-46f0-a3ac-882a350edc64',
                        residenceResidentsId: NEW_RESIDENCE_ID,
                    },
                    affiliation: {
                        id: NEW_AFFILIATION_ID,
                        role: 'guest',
                        status: 'active',
                        divisionAffiliationsId:
                            'fffedde6-5d5a-46f0-a3ac-882a350edc64',
                        userAffiliationsId: NEW_USER_ID,
                    },
                };
                const creationResults = await createNewGQLProfile(newAddition);

                return { statusCode: 200, data: creationResults };
            } catch (error) {
                printObject('Failed creating registration for reg:\n', reg);
                printObject('error:\n', error);
                return { statusCode: 400, data: reg, error: error };
            }
        }
        async function buildRegistration(reg, theUser) {
            try {
                let inputValues = {
                    eventRegistrationsId: gqlEventID,
                    attendeeId: theUser.id,
                    attendeeFirstName: reg.registrar.firstName,
                    attendeeLastName: reg.registrar.lastName,
                    attendeeEmail: reg?.registrar?.email || '',
                    attendeePhone: reg?.registrar?.phone || '',
                    attendeeStreet: reg?.registrar?.residence?.street || '',
                    attendeeCity: reg?.registrar?.residence?.city || '',
                    attendeeStateProv:
                        reg?.registrar?.residence?.stateProv || '',
                    attendeePostalCode:
                        reg?.registrar?.residence?.postalCode || '',
                    membershipName: reg?.church?.name || '',
                    membershipCity: reg?.church?.city || '',
                    membershipStateProv: reg?.church?.stateProv || '',
                    attendanceCount: parseInt(reg.attendeeCount),
                    mealCount: parseInt(reg.mealCount),
                    userRegistrationsId: theUser.id,
                };
                printObject('newEvent: \n', inputValues);
                return { statusCode: 200, data: inputValues };
            } catch (error) {
                return {
                    statusCode: 400,
                    data: 'error creating inputValues',
                    error: error,
                };
            }
        }
        for (
            let registrationCount = 0;
            registrationCount < registrations.length;
            registrationCount++
        ) {
            //      +++++++++++++++++++++++++++++++++
            //*  for each registration...
            //      +++++++++++++++++++++++++++++++++
            //* get gqlUserId

            let gqlUserIdSearch = GQL_USERS.body.Items.filter(
                (user) => user.sub === registrations[registrationCount].rid
            );
            if (gqlUserIdSearch.length < 1) {
                //*  we did not get userId
                window.alert('NEED TO CREATE_USER');
                console.log(
                    'NEED NEW GQL USER for ',
                    registrations[registrationCount].rid
                );
                //      ++++++++++++++++++++++++++++++++++++
                //      ADD Users
                //      ++++++++++++++++++++++++++++++++++++
                let DANO = false;
                if (DANO) {
                    //window.alert('would create new User. DANO skipped');
                    console.log('AMR:204-->DANO SKIPPED');
                    printObject(
                        'AMR:209-->missing user:\n',
                        registrations[registrationCount]
                    );
                    continue;
                }

                const newUserResults = await createUserInGQL(
                    registrations[registrationCount]
                );
                printObject('newUserResults: \n', newUserResults);
            } else if (gqlUserIdSearch.length > 1) {
                window.alert(
                    'DUPLICATE USER: sub= ' +
                        registrations[registrationCount].rid
                );
            }
            const THEUSER = gqlUserIdSearch[0];
            let attendeeCheck = GQL_REGISTRATIONS.body.Items.filter(
                (test) =>
                    test.eventRegistrationsId === gqlEventID &&
                    test.attendeeId === THEUSER.id
            );

            if (attendeeCheck.length === 0) {
                //window.alert('NEED TO CREATE_REGISTRATION');
                printObject(
                    'NEED THIS ADDED:\n',
                    registrations[registrationCount]
                );
                //      build createEvent variables
                const createRegistrationResponse = await buildRegistration(
                    registrations[registrationCount],
                    THEUSER
                );
                if (createRegistrationResponse?.statusCode === 200) {
                    //      ++++++++++++++++++++++++++++++++++++
                    //      ADD REGISTRATION
                    //      ++++++++++++++++++++++++++++++++++++
                    //      use provider to create the new registration
                    let DANO = false;
                    if (DANO) {
                        // window.alert(
                        //     'would create new registration. DANO skipped'
                        // );
                        console.log('AMR:239-->DANO SKIPPED');
                        printObject(
                            'AMR:253-->reg to add:\n',
                            createRegistrationResponse.data
                        );
                        continue;
                    }
                    const newRegistrationResults = await createNewRegistration(
                        createRegistrationResponse.data
                    );
                    if (newRegistrationResults.statusCode !== 200) {
                        printObject(
                            'createNewRegistration failed:\n',
                            newRegistrationResults
                        );
                    }
                } else {
                    console.log('bad');
                }
            }
            // window.alert('REGISTRATION ALREADY IN GQL');
        }
    };
    return (
        <div className='admin-component__wrapper'>
            <div className='admin-component__options-box'>
                <div className='admin-component__page-title'>
                    DDB registrationResults
                </div>
                <div className='admin-component__option-box'>
                    {gqlUsers && <div>GQL Users: {gqlUsers.length}</div>}
                </div>
                <div className='admin-component__option-box'>
                    {p8Registrations && (
                        <div>registrations: {p8Registrations.length}</div>
                    )}
                </div>
            </div>
            <div className='confirm-user-component__button-wrapper'>
                <button
                    className='confirm-user-component__confirm-button'
                    onClick={handleProcessRequest}
                >
                    CONFIRM
                </button>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    // setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    // loadRallies: (rallies) => dispatch(loadRallies(rallies)),
    // loadDoneRallies: (rallies) => dispatch(loadDoneRallies(rallies)),
    // loadLeadRallies: (srallies) => dispatch(loadLeadRallies(srallies)),
    // loadLeadDoneRallies: (srallies) => dispatch(loadLeadDoneRallies(srallies)),
    // setPateRallies: (allRallies) => dispatch(setPateRallies(allRallies)),
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
});
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
    currentUser: state.user.currentUser,
});
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(MigrateRegistrations);
