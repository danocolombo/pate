import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/material';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles({
    cardGrid: {
        paddingTop: '20px',
        paddingLeft: '20px',
        paddingRight: '20px',
    },
    flipCard: {
        width: '100%',
        height: '100%',
        perspective: '1000px',
    },
    flipCardInner: {
        position: 'relative',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        transition: 'transform 0.6s',
        transformStyle: 'preserve-3d',
    },
    flipCardFront: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        backgroundColor: 'green',
        color: 'white',
    },
    flipCardBack: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        backgroundColor: 'blue',
        color: 'white',
        transform: 'rotateY(180deg)',
    },
});

const RallyList = () => {
    const classes = useStyles();
    const [flipped, setFlipped] = useState(false);

    const handleClick = () => {
        setFlipped(!flipped);
    };

    return (
        <Grid container spacing={4} className={classes.cardGrid}>
            <Grid item xs={12} sm={6} md={3}>
                <Paper className={classes.flipCard} onClick={handleClick}>
                    <div className={classes.flipCardInner}>
                        <div
                            className={`${classes.flipCardFront} ${
                                flipped && classes.flipCardBack
                            }`}
                        >
                            <h2>Front</h2>
                        </div>
                        <div
                            className={`${classes.flipCardBack} ${
                                flipped && classes.flipCardFront
                            }`}
                        >
                            <h2>Back</h2>
                        </div>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default RallyList;
