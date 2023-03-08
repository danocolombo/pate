import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import StateRepRally from "./stateRep-rally.component";
import { Stack, Button } from "@mui/material";
import "./serve.styles.scss";
const StateRep = ({ currentUser, rallies, doneRallies }) => {
  const history = useHistory();
  const [doneEvents, setDoneEvents] = useState([]);
  const [activeEvents, setActiveEvents] = useState([]);
  useEffect(() => {
    let dEvents = [];
    let aEvents = [];
    async function splitEvents() {
      if (currentUser?.events?.items) {
        currentUser.events.items.forEach((evnt) => {
          var today = new Date().toISOString().slice(0, 10); // get current date in yyyy-mm-dd format
          if (evnt.eventDate < today) {
            if (evnt.eventDate === "1900-01-01") {
              aEvents.push(evnt);
            } else {
              dEvents.push(evnt);
            }
          } else {
            aEvents.push(evnt);
          }
        });
      }
    }
    splitEvents();
    async function sortEvents() {
      dEvents.sort(function (a, b) {
        return new Date(b.eventDate) - new Date(a.eventDate);
      });
      setDoneEvents(dEvents);
      aEvents.sort(function (a, b) {
        return new Date(a.eventDate) - new Date(b.eventDate);
      });
      setActiveEvents(aEvents);
    }
    sortEvents();
  }, []);
  const handleNewRequest = (e) => {
    history.push("/newevent");
  };
  return (
    <>
      <div className="serve-component__event-list-header">Your Events</div>
      {currentUser?.events?.items ? (
        <>
          {currentUser?.events?.items?.length > 0 ? (
            <h3>Upcoming Events</h3>
          ) : null}

          {activeEvents.map((rally, index) => (
            <StateRepRally key={index} rally={rally} />
          ))}

          {currentUser?.events?.items?.length > 0 ? (
            <h3>Historic Events</h3>
          ) : null}

          {doneEvents.map((rally, index) => (
            <StateRepRally key={index} rally={rally} />
          ))}
        </>
      ) : null}

      <div className="serve-component__button-wrapper">
        <Stack direction="row" justifyContent="center">
          <Button
            variant="contained"
            onClick={handleNewRequest}
            sx={{ backgroundColor: "primary", margin: 2 }}
          >
            Add New Rally
          </Button>
        </Stack>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  rallies: state.stateRep.rally,
  doneRallies: state.stateRep.doneRally,
});
export default connect(mapStateToProps, null)(StateRep);
