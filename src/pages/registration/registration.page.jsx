import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { compose } from "redux";
import { withRouter } from "react-router";
// import { withAuthenticator } from '@aws-amplify/ui-react';

import Header from "../../components/header/header.component";
import { MainFooter } from "../../components/footers/main-footer";
import Spinner from "../../components/spinner/Spinner";
import PhoneInput from "react-phone-input-2";
import SelectStateProv from "../../components/state-prov/select-stateProv.component";
import Modal from "../../components/modals/wrapper.modal";
import InputErrors from "../../components/modals/registration/registation-input-error.modal";
import SuccessModal from "../../components/modals/registration/registration-success.modal";
import SuccessMessage from "../../components/modals/registration/registration-success-msg.component";

import {
  addRegistration,
  loadTempRegistration,
  clearTempRegistration,
} from "../../redux/registrations/registrations.actions";
import { loadRally } from "../../redux/pate/pate.actions";
import { setSpinner, clearSpinner } from "../../redux/pate/pate.actions";
import { setAlert } from "../../redux/alert/alert.action";
import "./registration.styles.scss";
import classNames from "classnames";
const EventRegistration = ({
  setSpinner,
  clearSpinner,
  match,
  pateSystem,
  currentUser,
  registrations,
  addRegistration,
  setAlert,
  loadTempRegistration,
  clearTempRegistration,
  loadRally,
}) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);
  // const [plan, setPlan] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [inputModalVisible, setInputModalVisible] = useState(false);

  const [attendeeCount, setAttendeeCount] = useState(1);
  const [mealCount, setMealCount] = useState(0);
  const [firstName, setFirstName] = useState(currentUser?.firstName);
  const [lastName, setLastName] = useState(currentUser?.lastName);
  const [email, setEmail] = useState(currentUser?.email);
  const [phone, setPhone] = useState(currentUser?.phone);
  const [homeStreet, setHomeStreet] = useState(currentUser?.residence?.street);
  const [homeCity, setHomeCity] = useState(currentUser?.residence?.city);
  const [homeStateProv, setHomeStateProv] = useState(
    currentUser?.residence?.stateProv
  );
  const [homePostalCode, setHomePostalCode] = useState(
    currentUser?.residence?.postalCode
  );
  const [churchName, setChurchName] = useState("");
  const [churchCity, setChurchCity] = useState("");
  const [churchStateProv, setChurchStateProv] = useState("");

  const [theEvent, setTheEvent] = useState({});
  const history = useHistory();
  const util = require("util");
  useEffect(() => {
    let id = match.params.id;
    //need to determine if the first 3 digits are REG, which
    //means that the request is to get a registration already
    //saved.
    let regCheck = "";

    if (id.length > 3) {
      regCheck = id.substring(0, 3);
      if (regCheck === "REG") {
        // EXISTING-REGISTRATION_EXISTING-REGISTRATION_EXISTING-REGISTRATION_
        // ------------------------------------------------------------------
        // this is existing registration. go it it
        //-------------------------------------------------------------------
        // EXISTING-REGISTRATION_EXISTING-REGISTRATION_EXISTING-REGISTRATION_
        id = id.slice(3);

        setIsEdit(true);
        async function preClean() {
          clearTempRegistration();
        }
        preClean();
        async function getTheRegistration() {
          fetch(
            "https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations",
            {
              method: "POST",
              body: JSON.stringify({
                operation: "getRegistration",
                payload: {
                  uid: id,
                },
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              const details = data?.body?.Items[0];
              loadTempRegistration(details);
              // setTheEvent({ ...theEvent, details });
            });
        }
        getTheRegistration();
        async function getTheEvent() {
          fetch(
            "https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events",
            {
              method: "POST",
              body: JSON.stringify({
                operation: "getEvent",
                payload: {
                  uid: registrations.tempRegistration.eid,
                },
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              const details = data?.body?.Items[0];
              loadRally(details);
              setTheEvent({ ...theEvent, details });
            });
        }
        getTheEvent();
        // if (weAreEditting) {
        //     //copy registrations.confirmed to registrations.tempRegistration
        //     registrations.confirmed.forEach((reg) => {
        //         if (reg.eid === id) {
        //             async function copyReg() {
        //                 loadTempRegistration(reg);
        //             }
        //             copyReg();
        //         }
        //     });
        // }
      } else {
        // NEW-REGISTRATION_NEW-REGISTRATION_NEW-REGISTRATION_
        // ---------------------------------------
        // if new registration, get the event
        //----------------------------------------
        // NEW-REGISTRATION_NEW-REGISTRATION_NEW-REGISTRATION_
        async function getTheEvent() {
          fetch(
            "https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events",
            {
              method: "POST",
              body: JSON.stringify({
                operation: "getEvent",
                payload: {
                  uid: id,
                },
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              const details = data?.body?.Items[0];
              loadRally(details);
              setTheEvent({ ...theEvent, details });
            });
        }
        getTheEvent();
      }
      console.log("done getting data");
    }
  }, []);
  useEffect(() => {
    //when we get tempRegistation, load state
    console.log("USE_EFFECT for registrations.tempRegistration");
    if (registrations.tempRegistration) {
      setAttendeeCount(registrations.tempRegistration?.attendeeCount);
      setMealCount(registrations.tempRegistration?.mealCount);
      setFirstName(registrations.tempRegistration?.registrar?.firstName);
      setLastName(registrations.tempRegistration?.registrar?.lastName);
      setEmail(registrations.tempRegistration?.registrar?.email);
      setPhone(registrations.tempRegistration?.registrar?.phone);
      setHomeStreet(
        registrations.tempRegistration?.registrar?.residence?.street
      );
      setHomeCity(registrations.tempRegistration?.registrar?.residence?.city);
      setHomeStateProv(
        registrations.tempRegistration?.registrar?.residence?.stateProv
      );
      setHomePostalCode(
        registrations.tempRegistration?.registrar?.residence?.postalCode
      );
      setChurchName(registrations.tempRegistration?.church?.Name);
      setChurchCity(registrations.tempRegistration?.church?.city);
      setChurchStateProv(registrations.tempRegistration?.church?.stateProv);
    } else {
      setAttendeeCount(1);
      setMealCount(0);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setHomeStreet("");
      setHomeCity("");
      setHomeStateProv("");
      setHomePostalCode("");
      setChurchName("");
      setChurchCity("");
      setChurchStateProv("");
    }
  }, [registrations.tempRegistration]);

  useEffect(() => {}, [pateSystem.showSpinner]);
  const displayDate = () => {
    // format the date and return it
    if (theEvent?.details?.eventDate) {
      let y = parseInt(theEvent?.details?.eventDate.substring(0, 4));
      let m = parseInt(theEvent?.details?.eventDate.substring(4, 6)) - 1;
      let d = parseInt(theEvent?.details?.eventDate.substring(6, 8));
      let eventDate = new Date(y, m, d);
      let theDate = eventDate.toDateString();
      return theDate;
    }
    return null;
  };
  const displayTimes = () => {
    if (theEvent?.details?.startTime) {
      let sTime = theEvent?.details?.startTime.split(":");
      let eTime = theEvent?.details?.endTime.split(":");

      let startTime = "";
      let endTime = "";
      if (parseInt(sTime[0]) < 13) {
        startTime = theEvent?.details?.startTime;
      } else {
        let newHour = parseInt(sTime[0]) - 12;

        startTime = newHour.toString() + ":" + sTime[1];
      }
      if (parseInt(eTime[0]) < 13) {
        endTime = theEvent?.details?.endTime;
      } else {
        let newHour = parseInt(eTime[0]) - 12;
        endTime = newHour.toString() + ":" + eTime[1];
      }
      let sap = "";
      let eap = "";
      if (sTime[0] < 12) {
        sap = "AM";
      } else {
        sap = "PM";
      }
      if (eTime[0] < 12) {
        eap = "AM";
      } else {
        eap = "PM";
      }
      let returnValue = `${startTime}${sap}-${endTime}${eap}`;
      return returnValue;
    } else {
      return null;
    }
  };
  const handleCancel = (e) => {
    async function purgeTempReg() {
      clearTempRegistration();
    }
    purgeTempReg();
    history.push("/profile");
  };
  const successAcknowledged = () => {
    setShowRegistrationSuccess(false);
    history.push("/");
  };
  const handleHomeStateChange = ({ newValue }) => {
    console.log("stateProv:", newValue);
    setHomeStateProv(newValue);
  };
  const handleChurchStateChange = ({ newValue }) => {
    setChurchStateProv(newValue);
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "homeStreet":
        setHomeStreet(value);
        break;
      case "homeCity":
        setHomeCity(value);
        break;
      // case 'homeStateProv':
      //     setHomeStateProv(value);
      //     break;
      case "homePostalCode":
        setHomePostalCode(value);
        break;
      case "attendeeCount":
        setAttendeeCount(value);
        break;
      case "mealCount":
        setMealCount(value);
        break;
      case "churchName":
        setChurchName(value);
        break;
      case "churchCity":
        setChurchCity(value);
        break;
      // case 'churchStateProv':
      //     setChurchStateProv(value);
      //     break;
      default:
        break;
    }
  };
  const handleLoginClick = (e) => {
    e.preventDefault();
    history.push("/signin");
  };
  const handleRegisterClick = (e) => {
    e.preventDefault();
    history.push("/register");
  };
  const mealCostValue = (strValue) => {
    const convertedValue = +strValue;
    if (convertedValue === 0) {
      return 0;
    } else {
      let returnValue = parseFloat(strValue * 0.01);
      console.log(returnValue.toFixed(2));
      return returnValue.toFixed(2);
    }
  };
  const displayDate2 = (displayThis) => {
    // format the date and return it
    //the new formatted date coming in will look like this...
    //            2021-04-21
    let dateParts = displayThis?.eventDate.split("-");
    console.log(dateParts);
    // dateParts.forEach(element => {
    //     console.log(element);
    // });
    // let newEventDate = new Date(dateParts[0], dateParts[1], dateParts[2]);
    // let newTheDate = newEventDate.toDateString();
    // console.log('newTheDate:' + newTheDate);
    let y = parseInt(displayThis?.eventDate.substring(0, 4));
    let m = parseInt(displayThis?.eventDate.substring(4, 6)) - 1;
    let d = parseInt(displayThis?.eventDate.substring(6, 8));
    let eventDate = new Date(y, m, d);
    let theDate = eventDate.toDateString();

    return theDate;
  };
  const displayTimes2 = (displayThis) => {
    if (displayThis?.startTime) {
      let sTime = displayThis?.startTime.split(":");
      let eTime = displayThis?.endTime.split(":");

      let startTime = "";
      let endTime = "";
      if (parseInt(sTime[0]) < 13) {
        startTime = displayThis?.startTime;
      } else {
        let newHour = parseInt(sTime[0]) - 12;

        startTime = newHour.toString() + ":" + sTime[1];
      }
      if (parseInt(eTime[0]) < 13) {
        endTime = displayThis.endTime;
      } else {
        let newHour = parseInt(eTime[0]) - 12;
        endTime = newHour.toString() + ":" + eTime[1];
      }
      let returnValue = startTime + " - " + endTime;
      return returnValue;
    } else {
      return null;
    }
  };
  const handleRegisterRequest = async (e) => {
    e.preventDefault();
    setSpinner();
    // this function pulls the data together and creates
    // an object to update database.
    //-----------------------------------------------------
    // all fields are required.
    //-----------------------------------------------------
    let fieldMessage = {};
    let okayToProceed = true;
    if (firstName?.length < 2) {
      okayToProceed = false;
      fieldMessage.First_Name = "is required";
    }
    if (lastName?.length < 2) {
      okayToProceed = false;
      fieldMessage.Last_Name = "is required";
    }
    if (email?.length < 10) {
      okayToProceed = false;
      fieldMessage.Email = "is required";
    }
    if (phone?.length < 10) {
      okayToProceed = false;
      fieldMessage.Phone = "is required";
    }
    if (homeStreet?.length < 5) {
      okayToProceed = false;
      fieldMessage.Home_Street = "is required";
    }
    if (homeCity?.length < 2) {
      okayToProceed = false;
      fieldMessage.City = "is required";
    }
    // if (homeStateProv?.length < 2) {
    //     okayToProceed = false;
    //     fieldMessage.Home_State = 'is required';
    // }
    if (homePostalCode?.length < 5) {
      okayToProceed = false;
      fieldMessage.Postal_Code = "is required";
    }
    if (churchName?.length < 5) {
      okayToProceed = false;
      fieldMessage.Church_Name = "is required";
    }
    if (churchCity?.length < 3) {
      okayToProceed = false;
      fieldMessage.Church_City = "is required";
    }
    // if (churchStateProv?.length < 2) {
    //     okayToProceed = false;
    //     fieldMessage.Church_State = 'is required';
    // }
    if (attendeeCount > 10) {
      okayToProceed = false;
      fieldMessage.Attendees = "limited to 10 per registration";
    }
    if (mealCount > attendeeCount) {
      okayToProceed = false;
      fieldMessage.Meals = "only available to attendees";
    }

    if (!okayToProceed) {
      // alert(
      //     'Please correct your request.\n' + JSON.stringify(fieldMessage)
      // );
      clearSpinner();
      setModalMessage("All the fields are required");
      setModalIsVisible(true);
      const alertPayload = {
        msg: "ALL FIELDS ARE REQUIRED",
        alertType: "danger",
      };
      setAlert(alertPayload);
      window.scrollTo(0, 0);

      return;
    }

    //========================================
    // check to see if he registration request is from
    // a logged in user. If not, set the rid to 0.
    let registrarId = "0";
    if (currentUser?.isLoggedIn) {
      registrarId = currentUser.uid;
    }

    let regData = {
      eventDate: theEvent?.details?.eventDate,
      startTime: theEvent?.details?.startTime,
      endTime: theEvent?.details?.endTime,
      eid: theEvent?.details?.uid,
      location: {
        name: theEvent?.details?.name,
        street: theEvent?.details?.street,
        city: theEvent?.details?.city,
        stateProv: theEvent?.details?.stateProv,
        postalCode: theEvent?.details?.postalCode,
      },
      church: {
        name: churchName,
        city: churchCity,
        stateProv: churchStateProv,
      },
      rid: registrarId,
      registrar: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        residence: {
          street: homeStreet,
          city: homeCity,
          stateProv: homeStateProv,
          postalCode: homePostalCode,
        },
      },
      attendeeCount: parseInt(attendeeCount, 10),
      mealCount: parseInt(mealCount, 10),
    };

    // post the registration to API and return to /
    //====================================================
    // async function updateDb() {
    try {
      await fetch(
        "https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/registrations",
        {
          method: "POST",
          body: JSON.stringify({
            operation: "createRegistration",
            payload: {
              Item: regData,
            },
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // const util = require('util');
          // console.log(
          //     'db data returned: \n' +
          //         util.inspect(data, {
          //             showHidden: false,
          //             depth: null,
          //         })
          // );
          // if (registrarId !== '0') {
          //     addRegistration(regData);
          // }
        });
    } catch (error) {
      console.log(JSON.stringify(error));
    }
    //====================================
    // update the event with the numbers
    //====================================
    let eventUpdate = {
      uid: pateSystem.rally.uid,
      adjustments: {
        registrationCount: attendeeCount,
        mealCount: mealCount,
      },
    };
    //===========================
    // now send event update to API
    //-------------------------------
    await fetch(
      "https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events",
      {
        method: "POST",
        body: JSON.stringify({
          operation: "maintainNumbers",
          payload: eventUpdate,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("maintainEventNumbers successful");
      });

    // //=====================================
    // // add the registration to redux
    // //=====================================
    if (registrarId !== "0") {
      await addRegistration(regData);
    }
    // const alertPayload = {
    //     msg: 'REGISTRATION SUCCESS - REVIEW IN PROFILE',
    //     alertType: 'success',
    //     timeout: 15,
    // };
    // setAlert(alertPayload);
    // alert('REGISTRATION SUCCESSFUL - SEE PROFILE');
    // history.push('/');
    //=================================================
    // send email to registrar
    //=================================================
    let displayThis = {
      eventDate: theEvent?.details?.eventDate,
      startTime: theEvent?.details?.startTime,
      endTime: theEvent?.details?.endTime,
    };
    let emailBody =
      "Congrats " +
      firstName +
      ", you have successfully registered for the P8 Rally. Put it on your calendar!!<br/><br/><center>";
    emailBody = emailBody.concat(displayDate2(displayThis), "<br/>");
    emailBody = emailBody.concat(displayTimes2(displayThis), "<br/>");

    emailBody = emailBody.concat("<h3>", theEvent?.details?.name, "</h3><br/>");
    emailBody = emailBody.concat(theEvent?.details?.street, "<br/>");
    emailBody = emailBody.concat(theEvent?.details?.city, ", ");
    emailBody = emailBody.concat(theEvent?.details?.stateProv, " ");
    emailBody = emailBody.concat(
      theEvent?.details?.postalCode,
      "</center><br/><br/>"
    );
    emailBody = emailBody.concat(
      'You can visit <a href="p8rally.com">P8Rally.com</a> to manage your registration and keep up with other rally plans<br/>'
    );
    let emailRequest = {
      toAddresses: [email],
      ccAddresses: ["support@p8rally.com"],
      subject: "P8 Rally Registration Confirmation",
      message: emailBody,
    };
    await fetch(
      "https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/admin",
      {
        method: "POST",
        body: JSON.stringify({
          operation: "emailNotification",
          payload: emailRequest,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("maintainEventNumbers successful");
      });

    clearSpinner();
    setShowRegistrationSuccess(true);
  };
  const populateUserInfo = () => {
    setFirstName(currentUser?.firstName);
    setLastName(currentUser?.lastName);
    setEmail(currentUser?.email);
    setPhone(currentUser?.phone);
    setHomeStreet(currentUser?.residence?.street);
    setHomeCity(currentUser?.residence?.city);
    setHomeStateProv(currentUser?.residence?.stateProv);
    setHomePostalCode(currentUser?.residence?.postalCode);
    setChurchName(currentUser?.church?.name);
    setChurchCity(currentUser?.church?.city);
    setChurchStateProv(currentUser?.church?.stateProv);
  };
  const madeMealDeadline = () => {
    //--------------------------------------------------------------------
    //for the meal deadline we need to get the redux value and add 1 day
    //for calculation purposes to include 'today'.
    //--------------------------------------------------------------------
    let dbDate = pateSystem?.rally?.meal?.deadline;
    let convertedDBDate = Date.parse(dbDate);
    let deadlineTestDate = new Date(convertedDBDate);
    deadlineTestDate.setDate(deadlineTestDate.getDate() + 1);
    var today = new Date();
    if (today.getTime() < deadlineTestDate.getTime()) {
      return true;
    } else {
      return false;
    }
  };
  return pateSystem.showSpinner ? (
    <Spinner />
  ) : (
    <>
      <Header />
      <div className="registration-page__wrapper">
        <div className="registration-page__form-box">
          <div className="registration-page__header">REGISTRATION</div>
          {/*
                    <div className='registration-page__image-wrapper'>
                        {pateSystem?.rally?.graphic !== 'tbd' ? (
                            <img
                                class='registration-page__image-file'
                                src={pateSystem?.rally?.graphic}
                                alt='CR P8 Rally'
                            ></img>
                        ) : null}
                        </div> */}
          <div className="registration-page__church-name">
            {pateSystem?.rally?.name}
          </div>
          <div className="registration-page__church-street">
            {pateSystem?.rally?.street}
          </div>
          <div className="registration-page__church-city-state-postal">
            {pateSystem?.rally?.city}, {pateSystem?.rally?.stateProv}
            &nbsp;
            {pateSystem?.rally?.postalCode}
          </div>
          <div className="registration-page__date">{displayDate()}</div>
          <div className="registration-page__time">{displayTimes()}</div>
          <div className="registration-page__message">
            <div>{pateSystem?.rally?.message}</div>
          </div>
          <hr className="registration-page__divider" />
          <div className="registration-page__instructions">
            {currentUser?.isLoggedIn ? (
              <>
                <button
                  className="registration-page__login-button"
                  onClick={populateUserInfo}
                >
                  Click to Populate w/ Your Profile Data
                </button>
              </>
            ) : (
              <>
                <div>
                  You can{" "}
                  <button
                    className="registration-page__login-button"
                    onClick={handleLoginClick}
                  >
                    LOGIN
                  </button>{" "}
                  or{" "}
                  <button
                    className="registration-page__signup-button"
                    onClick={handleRegisterClick}
                  >
                    SIGN-UP
                  </button>{" "}
                  for an account to save your profile for future use.
                </div>
              </>
            )}
          </div>

          <div className="registration-page__section-header">
            Contact Information
          </div>
          <div className="registration-page__data-input-box">
            <div className="registration-page__input-line">
              <div className="registration-page__input-label">First Name</div>
              <div className="registration-page__input-control">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="registration-page__input-line">
              <div className="registration-page__input-label">Last Name</div>
              <div className="registration-page__input-control">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  value={lastName}
                  required
                />
              </div>
            </div>
            <div className="registration-page__input-line">
              <div className="registration-page__input-label">E-mail</div>
              <div className="registration-page__input-control">
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={email}
                  required
                />
              </div>
            </div>

            <div className="profile-component__phone-input-line">
              <PhoneInput
                onlyCountries={["us"]}
                country="us"
                disableCountryCode
                disableDropdown
                value={phone}
                onChange={(phone) => setPhone(phone)}
                inputProps={{
                  padding: 0,
                  name: "Cell",
                  margin: 0,
                  required: true,
                  placeholder: "(xxx) xxx-xxxx",
                }}
              />
            </div>
          </div>
          <div className="registration-page__section-header">Address</div>
          <div className="registration-page__data-input-box">
            <div className="registration-page__input-line">
              <div className="registration-page__input-label">Street</div>
              <div className="registration-page__input-control">
                <input
                  type="text"
                  id="homeStreet"
                  name="homeStreet"
                  onChange={handleChange}
                  value={homeStreet}
                  required
                />
              </div>
            </div>
            <div className="registration-page__input-line">
              <div className="registration-page__input-label">City</div>
              <div className="registration-page__input-control">
                <input
                  type="text"
                  id="homeCity"
                  name="homeCity"
                  onChange={handleChange}
                  value={homeCity}
                  required
                />
              </div>
            </div>
            <div className="registration-page__state-line">
              <div className="registration-page__input-label">State</div>
              <SelectStateProv
                controlName="homeStateProv"
                initialValue={homeStateProv}
                doChange={handleHomeStateChange}
              />
            </div>
            <div className="registration-page__input-line">
              <div className="registration-page__input-label">Postal Code</div>
              <div className="registration-page__input-control">
                <input
                  type="text"
                  id="homePostalCode"
                  name="homePostalCode"
                  onChange={handleChange}
                  value={homePostalCode}
                  required
                />
              </div>
            </div>
          </div>
          <div className="registration-page__section-header">
            Your Church/CR Information
          </div>
          <div className="registration-page__data-input-box">
            <div className="registration-page__input-line">
              <div className="registration-page__input-label">Name</div>
              <div className="registration-page__input-control">
                <input
                  type="text"
                  id="churchName"
                  name="churchName"
                  onChange={handleChange}
                  value={churchName}
                  required
                />
              </div>
            </div>
            <div className="registration-page__input-line">
              <div className="registration-page__input-label">City</div>
              <div className="registration-page__input-control">
                <input
                  type="text"
                  id="churchCity"
                  name="churchCity"
                  onChange={handleChange}
                  value={churchCity}
                  required
                />
              </div>
            </div>
            <div className="registration-page__state-line">
              <div className="registration-page__input-label">State</div>

              <SelectStateProv
                controlName="churchStateProv"
                initialValue={churchStateProv}
                doChange={handleChurchStateChange}
              />
            </div>
          </div>
          <div className="registration-page__section-header">Attendance</div>
          <div className="registration-page__data-input-box">
            <div className="registration-page__attendee-input-line">
              <div className="registration-page__input-label">Attendees</div>
              <div className="registration-page__input-control">
                <input
                  type="number"
                  className="attendee-count-component"
                  id="attendeeCount"
                  name="attendeeCount"
                  onChange={handleChange}
                  value={attendeeCount}
                  required
                />
              </div>
            </div>
          </div>
          {madeMealDeadline() ? (
            <div className="registration-page__meal-box">
              <div className="registration-page__meal-details-container">
                <div className="registration-page__meal-row">
                  <div className="registration-page__meal-cell">
                    <p className="registration-page__meal-message">
                      This event offers a meal at a different time. Please
                      indicate how many will attend.
                    </p>
                  </div>
                </div>
                <div className="registration-page__meal-row">
                  <div className="registration-page__meal-cell">
                    <p>Serving time: {pateSystem?.rally?.meal?.startTime}</p>
                  </div>
                </div>
                <div className="registration-page__meal-row">
                  <div className="registration-page__meal-cell">
                    <p>
                      Cost: $ {mealCostValue(pateSystem?.rally?.meal?.cost)}
                    </p>
                  </div>
                </div>
                {pateSystem?.rally?.meal?.message && (
                  <div className="registration-page__meal-row">
                    <div className="registration-page__meal-cell">
                      <p>{pateSystem?.rally?.meal?.message}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="registration-page__meal-input-line">
                <div className="registration-page__meal-input-label">
                  Meal Guests
                </div>
                <div className="registration-page__meal-count">
                  <input
                    type="number"
                    className="meal-count-component"
                    id="mealCount"
                    name="mealCount"
                    onChange={handleChange}
                    value={mealCount}
                    required
                  />
                </div>
              </div>
              <div className="registration-page__meal-message">
                <div>
                  Deadline for meals: {pateSystem?.rally?.meal?.deadline}
                </div>
              </div>
            </div>
          ) : null}
          <div className="registration-page__button-wrapper">
            <button
              className="registration-page__register-button"
              onClick={handleRegisterRequest}
            >
              Register
            </button>
          </div>
        </div>
      </div>
      <MainFooter />
      <Modal isOpened={modalIsVisible}>
        <div>
          <InputErrors onClose={() => setModalIsVisible(false)} />
          {/*<div>{modalMessage}</div>*/}
        </div>
      </Modal>
      <SuccessModal isOpened={showRegistrationSuccess}>
        <SuccessMessage onClose={() => successAcknowledged()} />
      </SuccessModal>
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
});
const mapStateToProps = (state) => ({
  pateSystem: state.pate,
  currentUser: state.user.currentUser,
  registrations: state.registrations,
});
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(EventRegistration);
