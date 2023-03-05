import React from 'react';
import './serve.styles.scss';
const ConfirmDelete = ({ confirmDelete, declineDelete }) => {
    return (
        <div>
            <div className='new-event-confirm-delete__wrapper'>
                <div className='new-event-confirm-delete__header'>
                    CONFIRM DELETION
                </div>
                <div className='new-event-confirm-delete__message'>
                    Are you sure you want to delete this rally?
                </div>
                <div className='new-event-confirm-delete__button-wrapper'>
                    <button
                        className='new-event-confirm-delete__yes-button'
                        onClick={confirmDelete}
                    >
                        YES
                    </button>
                    <button
                        className='new-event-confirm-delete__no-button'
                        onClick={declineDelete}
                    >
                        NO
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;
