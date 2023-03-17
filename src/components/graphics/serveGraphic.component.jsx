import React, { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import { Card, CardMedia, Stack, CircularProgress } from '@mui/material';
function ServeGraphic({ eventId, graphicName }) {
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImageUrl = async () => {
            const url = await Storage.get(`events/${eventId}/${graphicName}`);
            setImageUrl(url);
        };
        fetchImageUrl();
    }, [imageUrl]);

    return (
        <Card sx={{ width: '95vw' }}>
            {isLoading ? (
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
                        </Card>
                    )}
                </>
            )}
        </Card>
    );
}

export default ServeGraphic;
