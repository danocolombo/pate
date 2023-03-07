import { API } from "aws-amplify";
import * as mutations from "../pateGraphql/mutations";
import * as coreMutations from "../graphql/mutations";
import { printObject } from "../utils/helpers";
import { wait } from "@testing-library/react";

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
    let returnValue = { status: 400, data: "error", error: e };
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
      console.log("NOT YET...");
      printObject("LOCATION:\n", locationInput);
      printObject("CONTACT:\n", contactInput);
      printObject("MEAL:\n", mealInput);
      printObject("EVENT:\n", eventInput);
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
    let returnValue = { status: 400, data: "error", error: e };
    return returnValue;
  }
}
export async function createNewRegistration(regRequest) {
  try {
    const createRegistrationResults = await API.graphql({
      query: mutations.createRegistration,
      variables: { input: regRequest },
    });
    if (createRegistrationResults.data?.createRegistration != null) {
      // need to get the event object from pate and save to registration and save
      // to currentUser Redux.
      regRequest.id = createRegistrationResults?.data?.createRegistration?.id;
      return {
        statusCode: 200,
        data: regRequest,
        message: "registration created",
      };
    } else {
      return {
        statusCode: 400,
        data: "createRegistration: ERROR",
        errorMessage: createRegistrationResults?.errors?.message,
      };
    }
  } catch (e) {
    let returnValue = { status: 400, data: "error", error: e };
    return returnValue;
  }
}
export async function updateEventNumbers(regRequest, rally) {
  let eValue = +rally.plannedCount;
  if (isNaN(eValue)) {
    eValue = 0;
  }
  let mValue = +rally.mealPlannedCount;
  if (isNaN(mValue)) {
    mValue = 0;
  }
  const inputVariables = {
    id: rally.id,
    plannedCount: eValue + +regRequest.attendanceCount,
    actualCount: rally.actualCount,
    mealPlannedCount: mValue + +regRequest.mealCount,
    mealActualCount: rally.mealActualCount,
  };
  try {
    const eventResults = await API.graphql({
      query: mutations.updateEvent,
      variables: { input: inputVariables },
    });
    // printObject('RPP:286-->SUCCESS!!\nEventResults:\n', eventResults);
    if (eventResults?.data?.updateEvent != null) {
      return {
        statusCode: 200,
        data: eventResults.data.updateEvent,
        message: "updateEvent: SUCCESS",
      };
    } else {
      return {
        statusCode: 400,
        data: "updateEvent: ERROR",
        errorMessage: eventResults?.errors?.message,
      };
    }
  } catch (err) {
    return { statusCode: 400, data: "updateEvent: ERROR", error: err };
  }
}

export async function updateMealNumbers(regRequest, rally) {
  try {
    // updae the Meal numbers
    let mValue = +rally.mealPlannedCount;
    if (isNaN(mValue)) {
      mValue = 0;
    }
    const inputVariables = {
      id: rally.meal.id,
      plannedCount: mValue + +regRequest.mealCount,
    };
    try {
      const mealResults = await API.graphql({
        query: mutations.updateMeal,
        variables: { input: inputVariables },
      });
      if (mealResults?.data?.updateMeal != null) {
        return {
          statusCode: 200,
          body: mealResults.data.updateMeal,
          message: "updateMeal success",
        };
      } else {
        return {
          statusCode: 400,
          data: "updateMeal: ERROR",
          errorMessage: mealResults?.errors?.message,
        };
      }
    } catch (err) {
      return {
        statusCode: 400,
        body: "error doign gql updateMeal",
        error: err,
      };
    }
  } catch (err) {
    return { statusCode: 400, data: "updateEvent: ERROR", error: err };
  }
}
export async function updateGQLEvent(payload) {
  // payload should be the variables to update

  try {
    let DANO = false;
    if (DANO) {
      console.log("updateGQLEvent");
      printObject("payload:\n", payload);
      return;
    }

    const eventUpdateResults = await API.graphql({
      query: mutations.updateEvent,
      variables: { input: payload },
    });
    let returnValue = {};
    if (eventUpdateResults.data.updateEvent.id) {
      returnValue = {
        statusCode: 200,
        data: eventUpdateResults,
      };
    } else {
      returnValue = {
        statusCode: 401,
        data: eventUpdateResults,
      };
    }
    return returnValue;
  } catch (e) {
    let returnValue = { statusCode: 400, data: "error", error: e };
    return returnValue;
  }
}
export async function updateGQLEventLocation(payload) {
  // payload should be the variables to update

  try {
    let DANO = false;
    if (DANO) {
      console.log("updateGQLEvent");
      printObject("payload:\n", payload);
      return;
    }

    const eventLocationUpdateResults = await API.graphql({
      query: mutations.updateEventLocation,
      variables: { input: payload },
    });
    let returnValue = {};
    if (eventLocationUpdateResults.data.updateEventLocation.id) {
      returnValue = {
        statusCode: 200,
        data: eventLocationUpdateResults,
      };
    } else {
      returnValue = {
        statusCode: 401,
        data: eventLocationUpdateResults,
      };
    }
    return returnValue;
  } catch (e) {
    let returnValue = { statusCode: 400, data: "error", error: e };
    return returnValue;
  }
}
export async function updateGQLMeal(payload) {
  // payload should be the variables to update

  try {
    const mealUpdateResults = await API.graphql({
      query: mutations.updateMeal,
      variables: { input: payload },
    });
    let returnValue = {};
    if (mealUpdateResults.data.updateMeal.id) {
      returnValue = {
        statusCode: 200,
        data: mealUpdateResults,
      };
    } else {
      returnValue = {
        statusCode: 401,
        data: mealUpdateResults,
      };
    }
    return returnValue;
  } catch (e) {
    let returnValue = { statusCode: 400, data: "error", error: e };
    return returnValue;
  }
}
export async function insertGQLMeal(payload) {
  // payload should be the variables to update

  try {
    const mealCreateResults = await API.graphql({
      query: mutations.createMeal,
      variables: { input: payload },
    });
    let returnValue = {};
    if (mealCreateResults.data.createMeal.id) {
      returnValue = {
        statusCode: 200,
        data: mealCreateResults,
      };
    } else {
      returnValue = {
        statusCode: 401,
        data: mealCreateResults,
      };
    }
    return returnValue;
  } catch (e) {
    let returnValue = { statusCode: 400, data: "error", error: e };
    return returnValue;
  }
}
export async function updateGQLEventContact(payload) {
  // payload should be the variables to update

  try {
    const contactUpdateResults = await API.graphql({
      query: mutations.updateEventContact,
      variables: { input: payload },
    });
    let returnValue = {};
    if (contactUpdateResults.data.updateEventContact.id) {
      returnValue = {
        statusCode: 200,
        data: contactUpdateResults,
      };
    } else {
      returnValue = {
        statusCode: 401,
        data: contactUpdateResults,
      };
    }
    return returnValue;
  } catch (e) {
    let returnValue = { statusCode: 400, data: "error", error: e };
    return returnValue;
  }
}
export async function deleteEventLocation(payload) {
  // payload will be the eventLocation id
  let DANO = true;
  if (DANO) {
    console.log("deleteEventLocation:", payload);
    return { statusCode: 200 };
  }
  const inputVariable = {
    id: payload,
  };
  try {
    const deleteEventLocationResults = await API.graphql({
      query: mutations.deleteEventLocation,
      variables: { input: inputVariable },
    });
    let returnValue = {};
    if (deleteEventLocationResults.data.deleteEventLocation.id) {
      returnValue = {
        statusCode: 200,
        data: deleteEventLocationResults,
      };
    } else {
      returnValue = {
        statusCode: 401,
        data: deleteEventLocationResults,
      };
    }
    return returnValue;
  } catch (e) {
    let returnValue = { statusCode: 400, data: "error", error: e };
    return returnValue;
  }
}
export async function deleteEventContact(payload) {
  let DANO = true;
  if (DANO) {
    console.log("deleteEventContact:", payload);
    return { statusCode: 200 };
  }
  // payload will be the eventContact id
  const inputVariable = {
    id: payload,
  };
  try {
    const deleteEventContactResults = await API.graphql({
      query: mutations.deleteEventContact,
      variables: { input: inputVariable },
    });
    let returnValue = {};
    if (deleteEventContactResults.data.deleteEventContact.id) {
      returnValue = {
        statusCode: 200,
        data: deleteEventContactResults,
      };
    } else {
      returnValue = {
        statusCode: 401,
        data: deleteEventContactResults,
      };
    }
    return returnValue;
  } catch (e) {
    let returnValue = { statusCode: 400, data: "error", error: e };
    return returnValue;
  }
}
export async function deleteEvent(payload) {
  let DANO = true;
  if (DANO) {
    console.log("deleteEvent:", payload);
    return { statusCode: 200 };
  }
  // payload will be the eventContact id
  const inputVariable = {
    id: payload,
  };
  try {
    const deleteEventResults = await API.graphql({
      query: mutations.deleteEvent,
      variables: { input: inputVariable },
    });
    let returnValue = {};
    if (deleteEventResults.data.deleteEvent.id) {
      returnValue = {
        statusCode: 200,
        data: deleteEventResults,
      };
    } else {
      returnValue = {
        statusCode: 401,
        data: deleteEventResults,
      };
    }
    return returnValue;
  } catch (e) {
    let returnValue = { statusCode: 400, data: "error", error: e };
    return returnValue;
  }
}
export async function deleteMeal(payload) {
  let DANO = true;
  if (DANO) {
    console.log("deleteMeal:", payload);
    return { statusCode: 200 };
  }
  // payload will be the eventContact id
  const inputVariable = {
    id: payload,
  };
  try {
    const deleteMealResults = await API.graphql({
      query: mutations.deleteMeal,
      variables: { input: inputVariable },
    });
    let returnValue = {};
    if (deleteMealResults.data.deleteMeal.id) {
      returnValue = {
        statusCode: 200,
        data: deleteMealResults,
      };
    } else {
      returnValue = {
        statusCode: 401,
        data: deleteMealResults,
      };
    }
    return returnValue;
  } catch (e) {
    let returnValue = { statusCode: 400, data: "error", error: e };
    return returnValue;
  }
}
