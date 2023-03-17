import React, { useState, useEffect } from 'react';
import { Card, CardMedia, Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import ServeGraphic from '../../components/graphics/serveGraphic.component';
import { setSpinner, clearSpinner } from '../../redux/pate/pate.actions';
const ServeGraphicPage = ({ match, setSpinner, clearSpinner }) => {
    let eventID = match?.params?.eventId;
    let graphicName = match?.params?.graphicName;
    const [error, setError] = useState('');
    const [files, setFiles] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [status, setStatus] = useState(0);
    const handleFileUpload = async (e) => {
        e.preventDefault();

        if (!selectedFile) return;

        const fileSize = selectedFile.size / (1024 * 1024);
        if (fileSize > 3) {
            setError('File size exceeds 3MB limit');
            return;
        }

        try {
            const fileExtension = selectedFile.name.split('.').pop();
            const fileName = `new-image-${Date.now()}.${fileExtension}`;
            const key = `tmp/${fileName}`;
            setUploading(true);
            await Storage.put(key, selectedFile);
            setImageUrl(await Storage.get(key));
            setUploading(false);
            setAccepted(false);
        } catch (error) {
            console.log('Error uploading file: ', error);
            setUploading(false);
        }
    };
    return (
        <Stack
            direction='column'
            alignItems='center'
            sx={{ height: '100vh', backgroundColor: 'yellow' }}
        >
            <ServeGraphic eventId={eventID} graphicName={graphicName} />
            <Card sx={{ width: '95vw' }}>
                <Stack alignItems='center'>
                    {status === 0 && (
                        <>
                            <div
                                style={{
                                    fontSize: '1.2rem',
                                    fontWeight: '500',
                                }}
                            >
                                Current Event Image
                            </div>
                            <div
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: 'normal',
                                    padding: '10px',
                                }}
                            >
                                The above image is the current graphic
                                associated for the event. The graphic is used to
                                enhance the user experience when the event
                                details are viewed as well as the marquee
                                displayed when the event is available.
                            </div>
                            <div
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: 'normal',
                                    padding: '10px',
                                }}
                            >
                                You can change the image using the fetature
                                below, and switch out the file used. A couple
                                things to note.
                            </div>
                            <div
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: 'normal',
                                    padding: '10px',
                                }}
                            >
                                <ul>
                                    <li>Images cannot be greater than 3MB</li>
                                    <li>Only one image will be retained.</li>
                                </ul>
                            </div>
                        </>
                    )}
                    <form onSubmit={handleFileUpload}>
                        <input
                            type='file'
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                        <button type='submit'>Upload</button>
                    </form>
                    {error && <div className='error'>{error}</div>}
                </Stack>
            </Card>
        </Stack>
    );
};
const mapDispatchToProps = (dispatch) => ({
    setSpinner: () => dispatch(setSpinner()),
    clearSpinner: () => dispatch(clearSpinner()),
});
// Serve.propTypes = {
//     getEventRegistrations: PropTypes.func.isRequired,
// }
const mapStateToProps = (state) => ({
    pateSystem: state.pate,
    currentUser: state.user.currentUser,
});
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ServeGraphicPage);
