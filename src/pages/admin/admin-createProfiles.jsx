import React, { useEffect, useState } from 'react';
import { createNewProfile } from '../../providers/gqlProfiles.provider';
import { API } from 'aws-amplify';
import ddbProfiles from '../../assets/data/p8User.array.json';
import { printObject } from '../../utils/helpers';
import * as queries from '../../pateGraphql/queries';
import ProfileDetails from '../../components/admin/admin-profile-check-list.component';
import './registered-users.style.scss';
const CreateProfiles = () => {
    const [profiles, setProfiles] = useState([]);

    //printObject('ACP:7==>dbbProfiles:\n', ddbProfiles);
    //console.log('count:', ddbProfiles.body.Items.length);
    const getGData = async () => {
        try {
            const gqlProfileData = await API.graphql({
                query: queries.listUsers,
            });
            console.log('GQL USERS', gqlProfileData.data.listUsers.items);
        } catch (error) {
            console.log('ERROR getting users\n', error);
        }
    };
    const purifyProfiles = async () => {
        try {
            const gqlProfileData = await API.graphql({
                query: queries.listUsers,
            });
            console.log('GQL USERS', gqlProfileData.data.listUsers.items);
            const gData = gqlProfileData.data.listUsers.items;
            const dData = ddbProfiles.body.Items;
            let newArray = [];
            dData.forEach((ddb) => {
                let loaded = gData.find((gd) => gd.sub === ddb.uid);
                if (loaded) {
                    console.log('DONE: ', ddb.firstName);
                    let tmp = { ...ddb, gqlProfile: true };
                    newArray.push(tmp);
                } else {
                    newArray.push(ddb);
                }
            });
            setProfiles(newArray);
        } catch (error) {
            console.log('ERROR getting users\n', error);
        }
    };
    const handleSubmitClick = () => {
        console.log('CLICK');
        //getGData();
        //createNewProfile('test');
    };
    useEffect(() => {
        purifyProfiles()
            .then(() => console.log('done'))
            .catch((error) => console.log('ERROR:', error));
    }, []);
    return (
        <div className='admin-component__wrapper'>
            <div className='admin-component__options-box'>
                <div className='admin-component__page-title'>
                    Registered Users
                </div>
                <div className='admin-component__option-box'>
                    {profiles && (
                        <div>
                            {profiles.map((p) => {
                                return <ProfileDetails user={p} key={p.uid} />;
                                // return (
                                //     <div style={{ fontSize: '14px' }}>
                                //         {p.uid}
                                //     </div>
                                // );
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

export default CreateProfiles;
