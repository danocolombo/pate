import React from 'react';
import './help.styles.scss';
export const RegisteredHelp = () => {
    return (
        <>
            <div className='help-box'>
                <div className='help-flex-box__container'>
                    <div className='help-flex-box__body'>
                        <div className='help-title'>
                            Registered P8 Rally Help
                        </div>
                        <dl className='help-definition__list'>
                            <dt className='help-definition__term'>
                                Why should I register?
                            </dt>
                            <dd className='help-definition__definition'>
                                By registering you get some added features, such
                                as quick registrations. Ability to modify your
                                registration, cancel your registration and keep
                                track of all your registrations and attendance.
                                <br />
                                It also provides a way for the Celebrate
                                Recovery state rep to contact you.
                            </dd>
                            <dt className='help-definition__term'>
                                Do I have to register?
                            </dt>
                            <dd className='help-definition__definition'>
                                No. You can arrive at the event a little bit
                                early and register at the door.
                            </dd>
                            <dt className='help-definition__term'>
                                Will I be notified if the event changes or is
                                canceled?
                            </dt>
                            <dd className='help-definition__definition'>
                                Yes, you will receive changes to the email
                                provided during registration.
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </>
    );
};
