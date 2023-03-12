import React from 'react';
import Card from '@mui/material/Card';
const RallyRotatingCard = (props) => {
    return (
        <Card
            style={{
                minWidth: '300px',
                padding: '10px',
                borderRadius: '10px',
            }}
        >
            <h2
                style={{
                    backgroundColor: 'blue',
                    color: 'white',
                    textAlign: 'center',
                    padding: '5px',
                }}
            >
                {props.rally.title}
            </h2>
        </Card>
    );
};
export default RallyRotatingCard;
