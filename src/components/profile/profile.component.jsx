import React from 'react';

import './profile.styles.scss';
const PersonalProfile = () => {
    return (
        <>
            <div className='personalprofilewrapper'>
                <div className='profileform'>
                    <form>
                        <div>
                            <label for='first-name'>First name</label>
                            <input type='text' id='firstname' required />
                        </div>
                        <div>
                            <label for='last-name'>Last name</label>
                            <input type='text' id='lastname' required />
                        </div>
                        <div>
                            <label for='profileemail'>E-mail</label>
                            <input type='text' id='profileemail' required />
                        </div>
                        <div>
                            <label for='profilephone'>Telephone</label>
                            <input type='text' id='profilephone' required />
                        </div>
                        <div className='profilehomesection'>Home Address</div>
                        <div className='profileaddress'>
                            <div>
                                <label for='profilestreet'>Street</label>
                                <input
                                    type='text'
                                    id='profilestreet'
                                    required
                                />
                            </div>
                            <div>
                                <label for='profilecity'>City</label>
                                <input type='text' id='profilecity' required />
                            </div>
                            <div>
                                <label for='profilestate'>State</label>
                                <input type='text' id='profilestate' required />
                            </div>
                            <div>
                                <label for='profilepostalcode'>
                                    Postal Code
                                </label>
                                <input
                                    type='text'
                                    id='profilepostalcode'
                                    required
                                />
                            </div>
                            <div className='churchsection'>
                                CR / Church Information
                            </div>
                            <div>
                                <label for='churchname'>Name</label>
                                <input type='text' id='churchname' required />
                            </div>
                            <div>
                                <label for='churchcity'>City</label>
                                <input type='text' id='churchcity' required />
                            </div>
                            <div>
                                <label for='churchstate'>State</label>
                                <input type='text' id='churchstate' required />
                            </div>
                        </div>
                        <div className='profilebutton'>
                            <button>UPDATE</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default PersonalProfile;
