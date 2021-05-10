import React, { useState, useEffect } from 'react';
/*=============================================
    This file does the call to API to get the
    registered users
==============================================*/
import { connect } from 'react-redux';
import { Storage } from 'aws-amplify';
import Spinner from '../../components/spinner/Spinner';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
import './admin-basic-storage.style.scss';
const BasicStorage = ({ currentUser, pate, setSpinner, clearSpinner }) => {
    useEffect(() => {}, []);
    const getBucketList = async () => {
        console.log('list the files here');
        try {
            const s3File = {
                objectURL:
                    'https://pate20213723ed06531948b6a5a0b14d1c3fb499175248-dev.s3.amazonaws.com/P8-NewnanGA-20210424.png',
                key: 'P8-NewnanGA-20210424.png',
                s3URI:
                    's3://pate20213723ed06531948b6a5a0b14d1c3fb499175248-dev/P8-NewnanGA-20210424.png',
                arn:
                    'arn:aws:s3:::pate20213723ed06531948b6a5a0b14d1c3fb499175248-dev/P8-NewnanGA-20210424.png',
            };
            const s3FileName = 'TT-SOGWALLOW-TT.png';
            const searchValue = 'public/events/TT-SOGWALLOW-TT.png';
            const fileAccessURL = await Storage.get(searchValue);
            console.log('fileAccessURL:\n', fileAccessURL);
        } catch (error) {
            console.error('error reading s3', error);
        }
    };
    return (
        <div className='admin-component__wrapper'>
            <div className='admin-component__options-box'>
                <div className='admin-component__page-title'>Basic Storage</div>
                <div className='admin-component__option-box'>
                    <div className='admin-component__row-center'>
                        <div>RIGHT HERE</div>
                    </div>
                    <div className='admin-component__row-center'>
                        <div>
                            <button onClick={getBucketList}>Bucket List</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
});
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    pate: state.pate,
});
export default connect(mapStateToProps, mapDispatchToProps)(BasicStorage);
