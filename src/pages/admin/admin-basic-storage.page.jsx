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
import { request } from 'http';
const BasicStorage = ({ currentUser, pate, setSpinner, clearSpinner }) => {
    const [displayFile, setDisplayFile] = useState('');
    const [graphicDate, setGraphicData] = useState({});
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
            let s3FileName = 'events/TT-SOGWALLOW-TT.png';
            s3FileName = 'events/P8-NewnanGA-20210424.png';
            let searchValue = '/public/events/TT-SOGWALLOW-TT.png';
            searchValue = '/public/events';
            searchValue = s3FileName;
            // const fileAccessURL = await Storage.get(searchValue);
            // const testFileInfo = await Storage.get(s3FileName, { level: 'public'})
            console.log('about to do promise call');
            await Storage.get(s3FileName, { level: 'public' })
                .then((requestResponse) => {
                    const util = require('util');
                    console.log(
                        'Storage.get OK - requestResponse \n' +
                            util.inspect(requestResponse, {
                                showHidden: false,
                                depth: null,
                            })
                    );
                })
                .catch((e) => {
                    const util = require('util');
                    console.log(
                        'forgotPasswordSubmit error (e): \n' +
                            util.inspect(e, {
                                showHidden: false,
                                depth: null,
                            })
                    );
                    switch (e.code) {
                        case 'InvalidParameterException':
                            console.log('error');
                            break;

                        default:
                            break;
                    }
                    return;
                });
        } catch (error) {
            console.error('error reading s3', error);
        }
    };
    const getEventFileURL = async (fileName) => {
        //this takes the generic file name and returns the url for the s3 location
        const requestedFile = 'events/' + fileName;
        await Storage.get(requestedFile, { level: 'public' })
            .then((requestResponse) => {
                const util = require('util');
                console.log(
                    'Storage.get OK - requestResponse \n' +
                        util.inspect(requestResponse, {
                            showHidden: false,
                            depth: null,
                        })
                );
                console.log(requestResponse);
                setDisplayFile(requestResponse);
                return;
            })
            .catch((e) => {
                const util = require('util');
                console.log(
                    'forgotPasswordSubmit error (e): \n' +
                        util.inspect(e, {
                            showHidden: false,
                            depth: null,
                        })
                );
                switch (e.code) {
                    case 'InvalidParameterException':
                        console.log('error');
                        break;

                    default:
                        break;
                }
                return e;
            });
    };
    const listEventFiles = async (fileName) => {
        //this takes the generic file name and returns the url for the s3 location
        const requestedData = 'events/';
        await Storage.list(requestedData, { level: 'public' })
            .then((requestResponse) => {
                const util = require('util');
                console.log(
                    'Storage.get OK - requestResponse \n' +
                        util.inspect(requestResponse, {
                            showHidden: false,
                            depth: null,
                        })
                );
                requestResponse.forEach((s3File) => {
                    console.log(s3File.key);
                    if (s3File.key === 'events/' + fileName) {
                        setDisplayFile(s3File.size);
                    }
                });
                console.log(displayFile);

                return;
            })
            .catch((e) => {
                const util = require('util');
                console.log(
                    'forgotPasswordSubmit error (e): \n' +
                        util.inspect(e, {
                            showHidden: false,
                            depth: null,
                        })
                );
                switch (e.code) {
                    case 'InvalidParameterException':
                        console.log('error');
                        break;

                    default:
                        break;
                }
                return e;
            });
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
                            <button
                                onClick={listEventFiles('TT-SOGWALLOW-TT.png')}
                            >
                                Get Image
                            </button>
                        </div>
                    </div>
                    {displayFile ? (
                        <div>
                            <span>{displayFile}</span>
                            <img src={displayFile} alt='P8 picture'></img>
                        </div>
                    ) : (
                        'txt'
                    )}
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
