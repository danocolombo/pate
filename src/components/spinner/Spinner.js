import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
    <Fragment>
        <div>  </div>
        <img
            src={spinner}
            style={{ width: '200px', margin: 'auto', display: 'block', padding: '25px 0 0 0' }}
            alt='Loading...'
        />
    </Fragment>
);
export default Spinner;
