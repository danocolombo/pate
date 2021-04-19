import React from 'react';
import './cssgrid.styles.scss';
const GridTest = () => {
    return (
        <>
            <div className='grid-container'>
                <div className='grid-item'>Item 1</div>
                <div className='grid-item'>
                    <div classNaem='event-box'>
                        <div clsasName='event-label'>dog</div>
                        <div className='event-control'>
                            <input type='text' />
                        </div>
                    </div>
                </div>
                <div className='grid-item'>Item 3</div>
                <div className='grid-item'>Item 4</div>
            </div>
        </>
    );
};

export default GridTest;
