import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import './gridItem.styles.scss';

export default function GridItem(props) {
    const { children, className, ...rest } = props;
    return (
        <Grid item {...rest} className={+' ' + className}>
            {children}
        </Grid>
    );
}

GridItem.defaultProps = {
    className: '',
};

GridItem.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};
