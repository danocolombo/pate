import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../pateGraphql/mutations';
import * as queries from '../../pateGraphql/queries';
// import { withAuthenticator } from '@aws-amplify/ui-react';

import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import Spinner from '../../components/spinner/Spinner';
import PhoneInput from 'react-phone-input-2';
import SelectStateProv from '../../components/state-prov/select-stateProv.component';
import Modal from '../../components/modals/wrapper.modal';
import InputErrors from '../../components/modals/registration/registation-input-error.modal';
import SuccessModal from '../../components/modals/registration/registration-success.modal';
import SuccessMessage from '../../components/modals/registration/registration-success-msg.component';
import {
    setCurrentUser,
    addRegistrationToCurrentUser,
} from '../../redux/user/user.actions';
import DifferentProfileInfo from '../../components/registrations-modals/registration-modal-different-data.component';
import NewAttendeeComplete from '../../components/registrations-modals/registration-modal-new-attendee-continue.component';
import UpdatedRegistered from '../../components/registrations-modals/registration-modal-updated-registered.component';
import ConfirmEmailChange from '../../components/registrations-modals/registration-modal-confirm-email-change.component';
import Registered from '../../components/registrations-modals/registration-modal-registered.component';
import InvalidEmail from '../../components/registrations-modals/registration-modal-invalid-email.component';
import ErrorMessage from '../../components/registrations-modals/registration-modal-error-message.component';
import Splash from '../../components/registrations-modals/registration-modal-splash.component';
import { changeCognitoEmail } from '../../providers/aws.provider';
import {
    printObject,
    prettyDate,
    prettyTime,
    isValidEmail,
} from '../../utils/helpers';
import {
    loadTempRegistration,
    addRegistration,
    clearTempRegistration,
} from '../../redux/registrations/registrations.actions';
import { loadRally } from '../../redux/pate/pate.actions';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import { setAlert } from '../../redux/alert/alert.action';
import './registration.styles.scss';
import classNames from 'classnames';
import { SimpleDB } from 'aws-sdk';
import { isEmpty } from '@aws-amplify/core';
const RegistrationProcess = ({
    setSpinner,
    clearSpinner,
    match,
    pateSystem,
    currentUser,
    setCurrentUser,
    registrations,
    addRegistration,
    setAlert,
    loadTempRegistration,
    clearTempRegistration,
    addRegistrationToCurrentUser,
    loadRally,
}) => {
    //      START OF FUNCTION -------------------
    const location = useLocation();
    const history = useHistory();
    const [emailChanged, setEmailChanged] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { registrationInput } = location.state;
    // let multiMutate = match.params.multiMutate;
    printObject('RPP:45-->multMutate:\n', registrationInput);
    const [modal, setModal] = useState(0);

    useEffect(() => {
        async function checkIfCurrentUserRequest() {
            let emailChanged = false;
            let currentUserInfo = true;
            const regUser = {
                firstName: registrationInput.firstName,
                lastName: registrationInput.lastName,
                email: registrationInput.email,
                phone: registrationInput.phone,
            };
            let userInput = {
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
                phone: currentUser.phone,
            };
            if (JSON.stringify(regUser) !== JSON.stringify(userInput)) {
                userInput = regUser;
                currentUserInfo = false;
                if (regUser.email !== currentUser.email) {
                    emailChanged = true;
                    setEmailChanged(true);
                }
            }

            let residenceInput = {};
            let currentResidenceInfo = true;
            let userResidence = {
                street: currentUser.residence.street,
                city: currentUser.residence.city,
                stateProv: currentUser.residence.stateProv,
                postalCode: currentUser.residence.postalCode,
            };
            if (
                JSON.stringify(registrationInput.residence) !==
                JSON.stringify(userResidence)
            ) {
                residenceInput = registrationInput.residence;
                currentResidenceInfo = false;
            }
            let membershipInput = {};
            let currentMembershipInfo = true;
            if (currentUser?.memberships.items.length > 0) {
                let membership = currentUser.memberships.items.find(
                    (m) => m.division.id === currentUser.defaultDivision.id
                );
                if (membership) {
                    const simplifiedUserMembership = {
                        name: membership.name,
                        city: membership.city,
                        stateProv: membership.stateProv,
                    };
                    if (
                        JSON.stringify(registrationInput.membership) !==
                        JSON.stringify(simplifiedUserMembership)
                    ) {
                        membershipInput = registrationInput.membership;
                        currentMembershipInfo = false;
                    } else {
                        membershipInput = membership;
                        currentMembershipInfo = true;
                    }
                } else {
                    membershipInput = registrationInput.membership;
                    currentMembershipInfo = false;
                    console.log(
                        'PC:52--> MEMBERSHIP NOT FOUND IN MEMBERSHIP ARRAY'
                    );
                }
            } else {
                membershipInput = registrationInput.membership;
            }
            console.log('currentUserInfo:', currentUserInfo);
            console.log('currentResidenceInfo:', currentResidenceInfo);
            console.log('currentMembershipInfo:', currentMembershipInfo);
            console.log('Email changed: ', emailChanged);
            if (
                !currentUserInfo ||
                !currentResidenceInfo ||
                !currentMembershipInfo
            ) {
                setModal(1);
            } else {
                //      ===========================================
                //      registering an authenticated user.
                //      ===========================================
                // const eventNumbers = await getEventNumbers();

                // printObject('eventNumbers: ', eventNumbers);
                //      update Event Numbers
                const eventUpdated = await updateEventNumbers();
                if (eventUpdated.statusCode === 200) {
                    console.log('Event numbers updated.');
                } else {
                    printObject('eventUpdated failure:\n', eventUpdated);
                }
                //      update Meal Numbers
                const mealUpdated = await udpateMealNumbers();
                if (mealUpdated.statusCode === 200) {
                    console.log('Meal numbers updated.');
                } else {
                    printObject('mealUpdated failure:\n', mealUpdated);
                }
                //   create registration AND addd to REDUX
                const registeredUser = await registerAuthUser();
                if (registeredUser.statusCode === 200) {
                    console.log('User registered');
                } else {
                    printObject('registeredUser failure:\n', registeredUser);
                }

                setModal(4);
            }
        }
        checkIfCurrentUserRequest();
    }, []);

    useEffect(() => {}, [pateSystem.showSpinner]);
    const handleFirstModalButtonClick = async (buttonType) => {
        console.log('buttonType:', buttonType);
        if (buttonType === 'update_register') {
            //      user has elected to update profile and register
            if (emailChanged === false) {
                const registeredResults = await registerAuthUser();
                if (!registeredResults) {
                    //error registering
                    setErrorMessage('Error registering');
                    setModal(7);
                } else {
                    setModal(2);
                }
            } else {
                // see if they want to update their email?
                setModal(5);
            }
        } else if (buttonType === 'confirm_email_change') {
            //      user has acknowledge that they want to update their
            //      profile and update email in cognito.
            // check if email is valid
            const validEmail = await isValidEmail(registrationInput.email);
            if (validEmail) {
                const updatedEmail = await updateUserEmail();
                if (!updatedEmail) {
                    setErrorMessage('Error updating email address');
                    setModal(7);
                }
                const updateProfile = await updateUserProfile();
                if (!updateProfile) {
                    setErrorMessage('Error updating profile');
                    setModal(7);
                } else {
                    const registeredUser = await registerAuthUser();
                    if (!registeredUser) {
                        setErrorMessage('Error registering');
                        setModal(7);
                    } else {
                        // completed
                        setModal(2);
                    }
                }
            } else {
                // Email is invalid
                setModal(6);
            }
        } else if (buttonType === 'update_email_cancel') {
            history.push('/');
        } else if (buttonType === 'register_new') {
            // new unregistered registration coming in...
            const validEmail = await isValidEmail(registrationInput.email);
            if (validEmail) {
                //provided email is valid, regiester
                const registeredResults = await registerAttendee();
                if (!registeredResults) {
                    // registration failed.
                    setErrorMessage('Error registering attendee');
                    setModal(7);
                } else {
                    // registration good
                    setModal(3);
                }
            } else {
                // invalid email
                setModal(6);
            }
        } else if (buttonType === 'register_more' || buttonType === 'retry') {
            history.push(`/registration/${registrationInput.eventId}`);
        } else if (buttonType === 'done') {
            history.push('/');
        }
    };
    const udpateMealNumbers = async () => {
        // updae the Meal numbers
        let mValue = +pateSystem.rally.mealPlannedCount;
        if (isNaN(mValue)) {
            mValue = 0;
        }
        const inputVariables = {
            id: pateSystem.rally.meal.id,
            plannedCount: mValue + +registrationInput.mealCount,
        };
        try {
            const mealResults = await API.graphql({
                query: mutations.updateMeal,
                variables: { input: inputVariables },
            });
            if (mealResults?.data?.updateMeal != null) {
                return { statusCode: 200, body: 'updateMeal success' };
            } else {
                return {
                    statusCode: 400,
                    data: 'updateMeal: ERROR',
                    errorMessage: mealResults?.errors?.message,
                };
            }
        } catch (err) {
            return {
                statusCode: 400,
                body: 'error doign gql updateMeal',
                error: err,
            };
        }
    };
    const updateEventNumbers = async () => {
        let eValue = +pateSystem.rally.plannedCount;
        if (isNaN(eValue)) {
            eValue = 0;
        }
        let mValue = +pateSystem.rally.mealPlannedCount;
        if (isNaN(mValue)) {
            mValue = 0;
        }
        const inputVariables = {
            id: pateSystem.rally.id,
            plannedCount: eValue + +registrationInput.attendanceCount,
            actualCount: pateSystem.rally.actualCount,
            mealPlannedCount: mValue + +registrationInput.mealCount,
            mealActualCount: pateSystem.rally.mealActualCount,
        };
        try {
            const eventResults = await API.graphql({
                query: mutations.updateEvent,
                variables: { input: inputVariables },
            });
            // printObject('RPP:286-->SUCCESS!!\nEventResults:\n', eventResults);
            if (eventResults?.data?.updateEvent != null) {
                return { statusCode: 200, data: 'updateEvent: SUCCESS' };
            } else {
                return {
                    statusCode: 400,
                    data: 'updateEvent: ERROR',
                    errorMessage: eventResults?.errors?.message,
                };
            }
        } catch (err) {
            return { statusCode: 400, data: 'updateEvent: ERROR', error: err };
        }
    };

    const updateUserEmail = async () => {
        // the user has confirmed they want to change their password.
        // 1. check that email is valid format.
        const emailValid = await isValidEmail(registrationInput.email);

        if (emailValid.statusCode === 200) {
            changeCognitoEmail(currentUser, registrationInput.email)
                .then((response) => {
                    //* cognito updated, update gql User
                    try {
                        async function udpateGQLEmail() {
                            const inputVariables = {
                                id: registrationInput.eventId,
                                email: registrationInput.email,
                            };
                            const createRegistrationResults = await API.graphql(
                                {
                                    query: mutations.createRegistration,
                                    variables: { input: inputVariables },
                                }
                            );
                            if (
                                createRegistrationResults.data
                                    ?.createRegistration != null
                            ) {
                                return {
                                    statusCode: 200,
                                    data: 'createRegistration: SUCCESS',
                                };
                            } else {
                                return {
                                    statusCode: 400,
                                    data: 'createRegistration: ERROR',
                                    errorMessage:
                                        createRegistrationResults?.errors
                                            ?.message,
                                };
                            }
                        }
                        udpateGQLEmail();
                    } catch (err) {
                        return {
                            statusCode: 400,
                            data: 'updateUser with new email failed',
                            error: err,
                        };
                    }

                    return response;
                })
                .catch((err) => {
                    return { statusCode: 400, message: 'change email failed' };
                });
            //todo-gql --- need to also update gqlUser values
        }
    };
    const registerAuthUser = async () => {
        // this is going to register a authenticated user.
        const inputVariables = {
            eventRegistrationsId: registrationInput.eventId,
            userRegistrationsId: currentUser.id,
            attendanceCount: registrationInput.attendanceCount,
            mealCount: registrationInput.mealCount,
        };
        try {
            const createRegistrationResults = await API.graphql({
                query: mutations.createRegistration,
                variables: { input: inputVariables },
            });
            if (createRegistrationResults.data?.createRegistration != null) {
                // need to get the event object from pate and save to registration and save
                // to currentUser Redux.
                inputVariables.id =
                    createRegistrationResults?.data?.createRegistration?.id;
                inputVariables.event = pateSystem.rally;
                addRegistrationToCurrentUser(inputVariables);
                return { statusCode: 200, data: 'createRegistration: SUCCESS' };
            } else {
                return {
                    statusCode: 400,
                    data: 'createRegistration: ERROR',
                    errorMessage: createRegistrationResults?.errors?.message,
                };
            }
        } catch (err) {
            return {
                statusCode: 400,
                data: 'createRegistration: ERROR',
                error: err,
            };
        }
    };
    const updateUserProfile = async () => {
        // this is used when the user is logged in and updated their info
        // and elected to update profile
        return false;
    };
    const registerAttendee = async () => {
        // 1. create user
        // 2. create residence
        // 3. create membership
        // 4. create affiliation  ??
        // 5. create registration
        return false;
    };

    return pateSystem.showSpinner ? (
        <Spinner />
    ) : (
        <>
            <Header />
            <div>
                {modal === 0 && <Splash />}

                {modal === 2 && (
                    <UpdatedRegistered
                        handleClick={handleFirstModalButtonClick}
                    />
                )}
                {modal === 3 && (
                    <NewAttendeeComplete
                        handleClick={handleFirstModalButtonClick}
                    />
                )}

                {modal === 4 && (
                    <Registered handleClick={handleFirstModalButtonClick} />
                )}
                {modal === 5 && (
                    <ConfirmEmailChange
                        handleClick={handleFirstModalButtonClick}
                    />
                )}
                {modal === 6 && (
                    <InvalidEmail handleClick={handleFirstModalButtonClick} />
                )}
                {modal === 1 && (
                    <DifferentProfileInfo
                        handleClick={handleFirstModalButtonClick}
                    />
                )}
                {modal === 7 && (
                    <ErrorMessage
                        message={errorMessage}
                        handleClick={handleFirstModalButtonClick}
                    />
                )}
            </div>
            <MainFooter />
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    // setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
    addRegistration: (registration) => dispatch(addRegistration(registration)),
    loadRally: (rally) => dispatch(loadRally(rally)),
    loadTempRegistration: (reg) => dispatch(loadTempRegistration(reg)),
    clearTempRegistration: () => dispatch(clearTempRegistration()),
    setAlert: (payload) => dispatch(setAlert(payload)),
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    addRegistrationToCurrentUser: (registration) =>
        dispatch(addRegistrationToCurrentUser(registration)),
});
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
    currentUser: state.user.currentUser,
    registrations: state.registrations,
});
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(RegistrationProcess);
