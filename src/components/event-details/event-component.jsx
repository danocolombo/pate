import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Storage } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { Stack, Box, Typography, Button } from '@mui/material';
import { alpha } from '@mui/system';
import './event.styles.scss';
import { printObject, prettyDate, prettyTime } from '../../utils/helpers';
const EventDetails = ({ theEvent, currentUser }) => {
    const [eventGraphicFile, setEventGraphicFile] = useState();
    const [multiplier, setMultiplier] = useState(1);

    const [authenticated, setAuthenticated] = useState(false);
    //get data ready to display
    const displayThis = theEvent;

    //-------------------------------------------------------
    // if the graphic file name is available and not tbd.png
    // add the correct path to display from s3
    //-------------------------------------------------------
    useEffect(() => {
        if (currentUser?.authSession?.idToken?.jwtToken.length > 0) {
            setAuthenticated(true);
        } else {
            console.log('EC:42==> nope');
        }
        if (displayThis?.graphic) {
            printObject('EC:17-->graphic:\n', displayThis.graphic);
            async function getS3File() {
                const eventGraphic = await Storage.get(
                    `events/${displayThis.id}/${displayThis.graphic}`,
                    {
                        level: 'public',
                    }
                );
                setEventGraphicFile(
                    'https://eor-images-202214132-staging.s3.amazonaws.com/public/events/b70c0a49-dfa0-4671-b48d-38d3dcb1de9c/NorthwayChurch.png'
                );
                setEventGraphicFile(eventGraphic);
                // const tmp = `s3://eor-images-202214132-staging/public/events/b70c0a49-dfa0-4671-b48d-38d3dcb1de9c/${displayThis.graphic}`;
                // setEventGraphicFile(tmp);
            }
            getS3File();
        }
    }, []);
    useEffect(() => {}, []);

    return (
        <>
            <Box
                className='MyBox-root'
                sx={{
                    position: 'relative',
                    background: 'linear-gradient(to bottom, #384ea3, #ced8e8)',
                    borderRadius: 2,
                    minHeight: `${20 * multiplier}px`,
                    marginTop: 2,
                    marginBottom: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'top',
                    alignContent: 'center',
                    maxWidth: 400,
                    width: '100%',
                    margin: '0 auto',
                }}
            >
                <Typography
                    variant='h5'
                    align='center'
                    marginTop='10px'
                    color='white'
                >
                    Upcoming Events
                </Typography>
                {displayThis?.graphic !== 'tbd' ? (
                    <div>
                        {displayThis?.graphic && (
                            <div>
                                <img
                                    src='https://eor-images-202214132-staging.s3.amazonaws.com/public/events/b70c0a49-dfa0-4671-b48d-38d3dcb1de9c/NorthwayChurch.png'
                                    alt='Event '
                                    className='event-details__graphic-image'
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </div>
                        )}
                    </div>
                ) : null}
                <Stack>
                    <Typography variant='h4' align='center'>
                        {displayThis?.name}
                    </Typography>
                    <Typography variant='h5' align='center'>
                        {displayThis?.location?.street}
                    </Typography>
                    <Typography variant='h5' align='center'>
                        {displayThis?.location?.city},
                        {displayThis?.location?.stateProv}&nbsp;
                        {displayThis?.location?.postalCode}
                    </Typography>
                </Stack>

                {displayThis.eventDate && (
                    <div className='event-details__event-date'>
                        {prettyDate(displayThis?.eventDate)}
                    </div>
                )}
                {displayThis.startTime && (
                    <div className='event-details__event-time'>
                        {prettyTime(displayThis.startTime)}
                    </div>
                )}
                <Stack align='center'>
                    <Typography variant='h6'>{displayThis?.message}</Typography>
                </Stack>
                <Stack align='center'>
                    <Link
                        to={
                            authenticated
                                ? `/registration/${displayThis.id}`
                                : '/signin'
                        }
                    >
                        <Button
                            variant='contained'
                            sx={{
                                color: 'black',
                                border: '2px solid black',
                                bgcolor: 'yellow',
                                marginTop: '1rem',
                                marginX: '20px',
                                marginBottom: '10px',
                            }}
                        >
                            <Typography variant='button'>
                                {authenticated
                                    ? 'Register Now'
                                    : 'Sign-in/Sign-Up'}
                            </Typography>
                        </Button>
                    </Link>
                </Stack>
            </Box>
        </>
    );
};
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});
export default compose(connect(mapStateToProps))(EventDetails);
