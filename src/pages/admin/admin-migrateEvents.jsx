import React, { useEffect, useState } from 'react';
import { createNewProfile } from '../../providers/gqlProfiles.provider';
import { API } from 'aws-amplify';
import ddbProfiles from '../../assets/data/p8User.array.json';
import { printObject } from '../../utils/helpers';
import { getCRP8EventsNotMigrated } from '../../providers/event.provider';
import EventDetails from '../../components/admin/admin-event-migrate-list.component';
import './registered-users.style.scss';
const MigrateEvents = () => {
    const [rallies, setRallies] = useState([]);

    //printObject('ACP:7==>dbbProfiles:\n', ddbProfiles);
    //console.log('count:', ddbProfiles.body.Items.length);
    const getData = async () => {
        const eventArray = await getCRP8EventsNotMigrated();
        setRallies(eventArray.data);
    };

    const handleSubmitClick = () => {
        console.log('CLICK');
        // getData();
        //createNewProfile('test');
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className='admin-component__wrapper'>
            <div className='admin-component__options-box'>
                <div className='admin-component__page-title'>
                    CRP8 Events Not Migrated
                </div>
                <div className='admin-component__option-box'>
                    {rallies && (
                        <div>
                            {rallies.map((r) => {
                                return <EventDetails rally={r} key={r.uid} />;
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div className='confirm-user-component__button-wrapper'>
                <button
                    className='confirm-user-component__confirm-button'
                    onClick={handleSubmitClick}
                >
                    CONFIRM
                </button>
            </div>
        </div>
    );
};

export default MigrateEvents;
