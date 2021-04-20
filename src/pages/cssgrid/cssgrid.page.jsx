import React from 'react';
import './cssgrid.styles.scss';
const GridTest = () => {
    return (
        <>
            <div>
                <h2>WHO</h2>
            </div>

            <div className='grid-container'>
                <div className='grid-item'>Item 1</div>
                <div className='grid-item'>
                    <div classNaem='event-box'>
                        <div clsasName='event-label'>dog</div>
                        <div className='event-control'>heron</div>
                    </div>
                </div>
                <div className='grid-item'>Item 3</div>
                <div className='grid-item'>Item 4</div>
            </div>
            <div>TEST</div>
        </>
    );
};

export default GridTest;
