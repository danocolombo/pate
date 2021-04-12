import React from 'react';
import './help.styles.scss';
export const StateRepHelp = () => {
    return (
        <>
            <div className='help-box'>
                <div className='help-flex-box__container'>
                    <div className='help-flex-box__body'>
                        <div className='help-title'>CR State Rep Help</div>
                        <dl className='help-definition__list'>
                            <dt className='help-definition__term'>
                                Can I register other people for events besides
                                myself and my team?
                            </dt>
                            <dd className='help-definition__definition'>
                                Yes, you have the ability to register multiple
                                times and just put in the different names and
                                appropriate numbers for each entry. The
                                registrations you submit will show up at the
                                bottom of your profile page. If you put in other
                                names, they will be identified on each
                                registration.
                            </dd>
                            <dt className='help-definition__term'>
                                My event is not Approved. How do I get it
                                approved?
                            </dt>
                            <dd className='help-definition__definition'>
                                If you have put your event in the pending state,
                                which means the event is ready for the State
                                Lead to review, please contact them directly and
                                let them know you have an event ready for
                                review.
                            </dd>
                            <dt className='help-definition__term'>
                                How do I know how many people are registered for
                                my event?
                            </dt>
                            <dd className='help-definition__definition'>
                                You can go to the Serve page, select the event
                                and on the page. The current registration count
                                is listed under the Tally Information as
                                "Registations". If your event is offering a
                                meal, the registered guests for the meal are in
                                the Meals Detail section, labeled "Planned".
                            </dd>
                            <dt className='help-definition__term'>
                                Why can't I change the meals served or attendee
                                values on an event?
                            </dt>
                            <dd className='help-definition__definition'>
                                These are the actual attendance at the meal and
                                the event. You will not be able to update the
                                value until the day of the event.
                            </dd>
                            <dt className='help-definition__term'>
                                Why can't I change the meals planned and the
                                registrations value on an event?
                            </dt>
                            <dd className='help-definition__definition'>
                                Those values come directly from the online
                                registrations.
                            </dd>
                            <dt className='help-definition__term'>
                                If someone contacts me and asks me to cancel
                                their registration, can I do that?
                            </dt>
                            <dd className='help-definition__definition'>
                                Yes, go to the SERVE page, select the event and
                                then go to the registration listed at the
                                bottom. Click on it and you will be able to
                                adjust the registration or even cancel the
                                registration. NOTE: if you cancel a
                                registration. It is permanentaly deleted.
                            </dd>
                            <dt className='help-definition__term'>
                                Can a registration be transfered to someone
                                else?
                            </dt>
                            <dd className='help-definition__definition'>
                                Yes, go to the SERVE page, select the event and
                                edit the registrar.
                            </dd>
                            <dt className='help-definition__term'>
                                Can anyone else modify my event?
                            </dt>
                            <dd className='help-definition__definition'>
                                Yes, your CR State Lead and the system
                                adminstrator can modify your event. If you feel
                                your information has been inappropriately
                                changed, please start with your Lead.
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </>
    );
};
