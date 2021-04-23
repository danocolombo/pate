import React from 'react'
import './registration2.styles.scss';
const Registration2 = () => {
    return (
        <>
          <div className='registration-page2__wrapper'>
            <div className='registration-page2__form-box'>
                <div className='registration-page2__data-row'>
                    <div className='registration-page2__data-label'>First Name</div>
                    <div className='registration-page2__data-control'><input
                    type='text'
                    name='firstName'
                    id='firstName'
                    // value={firstName}
                    // onChange={handleChange}
                    required
                /></div>
                </div>
            </div>
          </div>  
        </>
    )
}

export default Registration2
