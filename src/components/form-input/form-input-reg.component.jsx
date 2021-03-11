import React from 'react';

import './form-input-reg.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => (
    <>
        <input
            className='form-reg-input'
            onChange={handleChange}
            {...otherProps}
        />
    </>
);

export default FormInput;
