import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AmplifyS3Image } from '@aws-amplify/ui-react';
import { IoTrash } from 'react-icons/io5';
import './events-graphics.styles.scss';
const EventGraphics = ({ gLoc, gFName, onChange, onDelete }) => {
    const handleFileChange = (e) => {
        onChange(e.target.files[0]);
    };
    return (
        <>
            <div className='event-graphics__section-header'>Graphic File</div>
            <div className='event-graphics__graphic-section'>
                {gFName && (
                    <div className='event-graphics__graphic-preview'>
                        {gLoc && (
                            <AmplifyS3Image
                                style={{ '--width': '100%' }}
                                imgKey={gLoc}
                            />
                        )}
                    </div>
                )}
                {gFName && (
                    <div className='event-graphics__wrapper'>
                        <div className='event-graphics__file-name'>
                            {gFName}
                        </div>
                        <div className='event-graphics__delete-icon'>
                            <Link
                                onClick={() => {
                                    onDelete({
                                        fileLocation: gLoc,
                                        fileName: gFName,
                                    });
                                }}
                            >
                                <IoTrash className='event-graphics__trash-can' />
                            </Link>
                        </div>
                    </div>
                )}
                <div className='event-graphics__graphic-file-control'>
                    <div>
                        <input
                            type='file'
                            accept='image/*'
                            className='event-graphics__file-input-control'
                            id='graphicFile'
                            name='graphicFile'
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default EventGraphics;
