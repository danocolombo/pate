import React, { useState, useEffect } from 'react';
import { Stack, Card, CardMedia, CircularProgress } from '@mui/material';
import { Storage } from 'aws-amplify';

const ShowImage = () => {
    const [error, setError] = useState('');
    const [files, setFiles] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [accepted, setAccepted] = useState(false);

    useEffect(() => {
        async function fetchFiles() {
            const fileList = await Storage.list('');
            setFiles(fileList);
        }
        fetchFiles();
    }, []);

    useEffect(() => {
        const fetchImageUrl = async () => {
            const url = await Storage.get('tmp/new-image-1678960968751.jpg');
            setImageUrl(url);
        };
        fetchImageUrl();
    }, [selectedFile]);

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

    const handleAccept = async () => {
        try {
            const finalKey = `tmp/default.png`;
            await Storage.rename(imageUrl, finalKey);
            setImageUrl(await Storage.get(finalKey));
            setAccepted(true);
        } catch (error) {
            console.log('Error accepting file: ', error);
        }
    };

    const handleReject = () => {
        setImageUrl('');
        setSelectedFile(null);
        setAccepted(false);
    };

    return (
        <>
            <Stack
                direction='row'
                justifyContent='center'
                sx={{ backgroundColor: 'white' }}
            >
                <Stack>
                    <Stack>
                        <h1>List of files in S3 bucket:</h1>
                    </Stack>
                    <Stack>
                        <ul>
                            {files.map((file) => (
                                <li key={file.key}>{file.key}</li>
                            ))}
                        </ul>
                    </Stack>
                </Stack>
            </Stack>
            <Stack justifyContent='center'>
                <form onSubmit={handleFileUpload}>
                    <input
                        type='file'
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                    <button type='submit'>Upload</button>
                </form>
                {error && <div className='error'>{error}</div>}

                {uploading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {imageUrl && (
                            <Card>
                                <CardMedia
                                    component='img'
                                    height='auto'
                                    image={imageUrl}
                                    alt='My Image'
                                />
                                {!accepted && (
                                    <>
                                        <button onClick={handleAccept}>
                                            Accept
                                        </button>
                                        <button onClick={handleReject}>
                                            Reject
                                        </button>
                                    </>
                                )}
                            </Card>
                        )}
                    </>
                )}
            </Stack>
        </>
    );
};

export default ShowImage;
