import React from 'react';
import './help.styles.scss';
export const StateLeadHelp = () => {
    return (
        <>
            <div className='help-box'>
                <div className='help-flex-box__container'>
                    <div className='help-flex-box__body'>
                        <div className='help-title'>CR State Lead Help</div>
                        <dl className='help-definition__list'>
                            <dt className='help-definition__term'>
                                How do I know which events are in my state?
                            </dt>
                            <dd className='help-definition__definition'>
                                Select the SERVE menu. The events you are
                                coordinating are listed under "YOUR EVENTS",
                                then if there are other events in your state,
                                they will be listed under "STATE EVENTS".
                            </dd>
                            <dt className='help-definition__term'>
                                How do I approve an event to be available for
                                registration?
                            </dt>
                            <dd className='help-definition__definition'>
                                Go to the SERVE page, select the event. About
                                half way down the page you will see a checkbox
                                to either approve or disapprove. Note that after
                                changing the approval status, you will need to
                                click UPDATE for your changes to be saved.
                            </dd>
                            <dt className='help-definition__term'>
                                Can I edit an event in my state?
                            </dt>
                            <dd className='help-definition__definition'>
                                Yes, same as the process to approve above, but
                                you can change all the other details of the
                                event as well. NOTE: a state rep has entered the
                                information and you should let them be aware of
                                your changes.
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </>
    );
};
