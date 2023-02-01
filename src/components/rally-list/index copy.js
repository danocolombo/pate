import React from 'react';
import Grid from '@mui/material/Grid';
import RallyRotatingCard from '../rally-rotating-card';

function RallyList() {
    return (
        <>
            <Grid container spacing={3}>
                <div xs={12} sm={6}>
                    <RallyRotatingCard rally={{ id: 333, title: 'Testing' }} />
                </div>
                <div xs={12} sm={6}>
                    <RallyRotatingCard
                        rally={{ id: 333, title: 'Verifying' }}
                    />
                </div>
            </Grid>
            <RallyRotatingCard key={'ABC'} rally={{ id: 5, title: 'HOMIE' }} />
        </>
    );
}

export default RallyList;
