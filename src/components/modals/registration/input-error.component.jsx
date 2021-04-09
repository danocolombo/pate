import React from 'react';
import ReactDom from 'react-dom';
import './registration-modal.css';
export default function InputError({ open, children, onClose }) {
    if (!open) return null;
    return ReactDom.createPortal(
        <>
            <div className='modal-overlay' />
            <div className='modal-wrapper'>
                <button onClick={onClose}>X</button>
                <div>{children}</div>
            </div>
        </>,
        document.getElementById('portal')
    );
}
