import { Button } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { clearSpinner } from '../../redux/pate/pate.actions';
import { addRegistrationToCurrentUser } from '../../redux/user/user.actions';
const TestCode = ({ addRegistrationToCurrentUser, clearSpinner }) => {
    const runCode = async () => {
        window.alert('Calliing Redux');

        const newRegistration = {
            attendanceCount: 2,
            mealCount: 2,
            event: {
                eventDate: '2023-02-13',
                id: 'abc123',
                location: {
                    id: '123abc',
                    text: 'here',
                },
            },
        };
        addRegistrationToCurrentUser(newRegistration);
    };
    return (
        <div>
            <div style={{ marginTop: '20px' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        // justifyContent: 'center',
                        height: '100vh',
                    }}
                >
                    <div
                        style={{
                            background: 'white',
                            alignItems: 'center',
                            alignContent: 'center',
                            paddingTop: '10px',
                            textAlign: 'center',
                            width: '50%',
                            // height: '50%',
                        }}
                    >
                        Click to run code
                    </div>
                    <div
                        style={{
                            background: 'white',
                            width: '50%',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            alignItems: 'center',
                            alignContent: 'center',
                            // height: '50%',
                        }}
                    >
                        <div
                            style={{
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <Button
                                variant='contained'
                                onClick={() => runCode()}
                            >
                                Run runCode()
                            </Button>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignIems: 'center',
                    }}
                >
                    <div style={{ alignContent: 'center' }}></div>
                </div>
            </div>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => ({
    addRegistrationToCurrentUser: (registration) =>
        dispatch(addRegistrationToCurrentUser(registration)),
    clearSpinner: () => dispatch(clearSpinner()),
});
export default compose(
    withRouter,
    connect(mapDispatchToProps, { clearSpinner, addRegistrationToCurrentUser })
)(TestCode);
