import React, { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import { AmplifyS3Image } from '@aws-amplify/ui-react';
//import { aws } from 'aws-sdk';
const SongExample = () => {
    const [imageToDisplay, setImageToDisplay] = useState();
    const [graphicInfo, setGraphicInfo] = useState({});
    const [graphicFile, setGraphicFile] = useState();
    useEffect(() => {
        console.log('imageToDisplay changed');
    }, [imageToDisplay]);
    const handleUpload = async () => {
        // we need to put events/ in front of the name to store it in S3 location
        const fileLocation = 'events/' + graphicFile.name;
        console.log('fileLocation: ', fileLocation);
        setGraphicFile(fileLocation);
        const { key } = await Storage.put(fileLocation, graphicFile, {
            contentType: 'image/*',
        });

        console.log('key:', key);
    };
    return (
        <>
            <div>Song Sample (storage)</div>
            <div>
                <AmplifyS3Image
                    style={{ '--height': '150px' }}
                    imgKey='background.jpg'
                />
                <AmplifyS3Image imgKey='public/events/background.jpg' />
                <AmplifyS3Image path='public/events/background.jpg' />
            </div>
            <div>
                <span>File Name</span>
                <input
                    type='text'
                    id='fileName'
                    name='fileName'
                    value={graphicInfo.fileName}
                    onChange={(e) =>
                        setGraphicInfo({
                            ...graphicInfo,
                            fileName: e.target.value,
                        })
                    }
                />
            </div>
            <div>
                <span>Location</span>
                <input
                    type='text'
                    id='location'
                    name='location'
                    value={graphicInfo.location}
                    onChange={(e) =>
                        setGraphicInfo({
                            ...graphicInfo,
                            location: e.target.value,
                        })
                    }
                />
            </div>
            <div>
                <span>File</span>
                <input
                    type='file'
                    accept='image/*'
                    id='graphicFile'
                    name='graphicFile'
                    onChange={(e) => setGraphicFile(e.target.files[0])}
                />
            </div>
            <button onClick={handleUpload}>Upload</button>
            {imageToDisplay ? (
                <>
                    <AmplifyS3Image
                        style={{ '--width': '100px' }}
                        path={imageToDisplay}
                    />
                </>
            ) : null}
        </>
    );
};

export default SongExample;
