import React from 'react';

import './secured-user.styles.scss';

const SecuredUser = ({
    onLogOut
}) => (
    <button onClick={onLogOut}>logout</button>
);

export default SecuredUser;
