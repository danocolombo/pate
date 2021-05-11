import React, {useState} from 'react'
import { Storage } from 'aws-amplify';
const SongExample = () => {
    const [graphicInfo, setGraphicInfo] = useState({});
    const [graphicFile, setGraphicFile] = useState();
    const handleUpload = async () => {
        console.log('graphicInfo:', graphicInfo);
        console.log('graphicFile: ', graphicFile);
        // we need to put events/ in front of the name to store it in S3 location
        const fileLocation = 'events/' + graphicFile.name;
        console.log('fileLocation: ', fileLocation);
        
        const { key } = await Storage.put(fileLocation, graphicFile, {contentType: 'image/*'});

        console.log('key:', key);

    }
    return (
        <>
        <div>Song Sample (storage)</div>
        <div>
            <span>File Name</span><input type='text' id='fileName' name='fileName' 
                value={graphicInfo.fileName}
                onChange={e => setGraphicInfo({...graphicInfo, fileName: e.target.value})}/>
        </div>
        <div>
            <span>Location</span><input type='text' id='location' name='location' 
                value={graphicInfo.location}
                onChange={e => setGraphicInfo({...graphicInfo, location: e.target.value})}/>
        </div> 
        <div>
            <span>File</span><input type='file' accept='image/*' id='graphicFile' name='graphicFile' onChange={e => setGraphicFile(e.target.files[0])}/>
        </div>
        <button onClick={handleUpload} >Upload</button>
        </>
    )
}

export default SongExample
