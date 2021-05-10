import React, { useState } from 'react';
import './reset-password.styles.scss';
const ResetPassword = ({
    isOpened = true,
    children,
    userNameId,
    resetConfirmed,
    resetDecline,
}) => {
    const [userName, setUserName] = useState(userNameId);

    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'username':
                setUserName(value);
                break;
            default:
                break;
        }
    };
    return (
        <div>
            <div className='reset-password__wrapper'>
                <div className='reset-password__header'>ATTENTION</div>
                <div className='success-message__message'>
                    Provide your user name, and click RESET.
                    <br />
                    <br />
                    If the user name exists, a code will be sent to the email
                    account registered.
                </div>
                <div className='reset-password__username-textbox-wrapper'>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        value={userName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='reset-password__username-warning'>
                    <span className='reset-password__username-warning-msg'>
                        User name, NOT email address!
                    </span>
                </div>
                <div className='reset-password__button-wrapper'>
                    <button
                        className='reset-password__ok-button'
                        onClick={() => resetConfirmed(userName)}
                    >
                        RESET
                    </button>
                    <button
                        className='reset-password__cancel-button'
                        onClick={() => resetDecline()}
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
