import React from 'react';
import './check-email.styles.scss';
const CheckEmail = ({ emailDest, isOpened = true, children, acknowledged }) => {
    console.log('recovery code sent to ' + emailDest);
    return (
        <div>
            <div className='success-message__wrapper'>
                <div className='success-message__header'>
                    CHECK EMAIL
                </div>
                <div className='success-message__message'>
                    If user name exists, a confirmation code was sent to the email account.
                </div>
                <div className='success-message__button-wrapper'>
                    <button
                        className='success-message__ok-button'
                        onClick={acknowledged}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckEmail;
