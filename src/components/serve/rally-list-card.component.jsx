import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Stack, Box, Typography, CardContent } from '@mui/material';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ModeIcon from '@mui/icons-material/Mode';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { prettyDate, printObject } from '../../utils/helpers';
import './serve.styles.scss';
const RallyListCard = ({ rally }) => {
    const [bStart, setBStart] = useState('#ccc');
    const [bEnd, setBEnd] = useState('#ccc');
    const [hStart, setHStart] = useState('#ccc');
    const [hEnd, setHEnd] = useState('#ccc');
    const [complete, setComplete] = useState(false);
    const [attention, setAttention] = useState(false);
    const [headerIcon, setHeaderIcon] = useState(null);
    library.add(faGlasses); // This line adds the icon to the library
    useEffect(() => {
        // determine the colors for the event
        const eventStartDate = new Date(rally.eventDate);
        const today = new Date();

        if (eventStartDate < today && rally.eventDate !== '1900-01-01') {
            setBStart('lightgreen');
            setBEnd('#228B22');
            setHStart('green');
            setHEnd('#228B22');
            setComplete(true);

            if (
                rally.actualCount < 1 ||
                (rally.mealPlannedCount > 0 && rally.mealActualCount < 1)
            ) {
                setAttention(true);
            }
        } else {
            // event is in the future
            setBStart('#4484CE'); // or any other color
            setBEnd('#ccc');
            setHStart('#4484CE'); // or any other color
            setHEnd('#4484CE');
            setComplete(false);
        }

        if (!complete && rally.status === 'draft') {
            setHeaderIcon(
                <ModeIcon
                    sx={{
                        color: 'black',
                        marginRight: 'auto',
                        marginLeft: '5px',
                    }}
                />
            );
        }
        // if (!complete && rally.status === 'review') {
        //     setHeaderIcon(
        //         <RemoveRedEyeIcon
        //             sx={{
        //                 color: 'black',
        //                 marginRight: 'auto',
        //                 marginLeft: '5px',
        //             }}
        //         />
        //     );
        // }
    }, []);
    return (
        <>
            <Stack direction='row' justifyContent='center'>
                <div>
                    <div>
                        <Link
                            to={`/serveevent/${rally.id}`}
                            className='serve-component__rally-link'
                        >
                            <Card
                                key={rally.eventDate}
                                sx={{
                                    borderRadius: 2,
                                    boxShadow: 8,
                                    // background: `linear-gradient(to bottom, #000, #fff)`,
                                    background: `linear-gradient(to bottom, ${bStart} 3%, ${bEnd} 97%)`,
                                    margin: '15px',
                                    minWidth: '300px',
                                    maxWidth: '300px',
                                }}
                            >
                                <Box
                                    sx={{
                                        background: `linear-gradient(to bottom, ${hStart} 10%, ${hEnd} 90%)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CheckCircleOutlineIcon
                                        visibility='hidden'
                                        sx={{
                                            color: 'green',
                                            marginRight: 'auto',
                                            marginLeft: '5px',
                                        }}
                                    />

                                    <Typography
                                        variant='h6'
                                        color={complete ? 'white' : 'white'}
                                        component='h2'
                                        align='center'
                                        sx={{ flex: 1 }}
                                    >
                                        {rally.eventDate === '1900-01-01'
                                            ? 'TBD'
                                            : prettyDate(rally.eventDate)}
                                    </Typography>
                                    {!complete && headerIcon}
                                    {complete && (
                                        <CheckCircleOutlineIcon
                                            sx={{
                                                color: 'white',
                                                marginLeft: 'auto',
                                                marginRight: '5px',
                                            }}
                                        />
                                    )}
                                    {rally.status === 'review' && (
                                        <FontAwesomeIcon
                                            icon='glasses'
                                            color='yellow'
                                            style={{ paddingRight: '10px' }}
                                        />
                                    )}
                                </Box>

                                <CardContent sx={{ padding: '16px' }}>
                                    <Stack align='center' direction='column'>
                                        <Typography
                                            variant='h5'
                                            component='p'
                                            gutterBottom
                                        >
                                            {rally.name}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '1.2rem',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {rally.location.street}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: '1.2rem',
                                                fontWeight: '500',
                                            }}
                                            gutterBottom
                                            align='center'
                                        >
                                            {rally.location.city},{' '}
                                            {rally.location.stateProv}{' '}
                                            {rally.location.postalCode}
                                        </Typography>
                                        {attention && (
                                            <Stack
                                                direction='row'
                                                justifyContent='right'
                                            >
                                                <Stack
                                                    direction='row'
                                                    alignContent='center'
                                                >
                                                    <div
                                                        style={{
                                                            color: 'gold',
                                                            paddingRight:
                                                                '10px',
                                                        }}
                                                    >
                                                        ATTENTION
                                                    </div>
                                                    <ErrorOutlineIcon
                                                        sx={{
                                                            color: 'gold',
                                                            marginLeft: 'auto',
                                                            marginRight: '5px',
                                                        }}
                                                    />
                                                </Stack>
                                            </Stack>
                                        )}
                                    </Stack>
                                </CardContent>
                                {rally?.coordinator?.firstName && (
                                    <Stack>
                                        <Typography
                                            sx={{
                                                fontSize: '1.2rem',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {rally.coordinator.firstName}
                                        </Typography>
                                    </Stack>
                                )}
                            </Card>
                        </Link>
                    </div>
                </div>
            </Stack>
        </>
    );
};

export default RallyListCard;