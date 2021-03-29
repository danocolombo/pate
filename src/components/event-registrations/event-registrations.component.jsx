import React from 'react';
import { connect } from 'react-redux';
const EventRegistration = ({ registrations }) => {
    return (
        <>
            <div>TEST</div>
            <div>MORE TESTS</div>
            {registrations.forEach((regItem) => {
                <div>RegItem: {regItem.uid}</div>;
            })}
        </>
    );
};
const mapStateToProps = (state) => ({
    registrations: state.registrations.eventRegistrations,
});
export default connect(mapStateToProps, null)(EventRegistration);
