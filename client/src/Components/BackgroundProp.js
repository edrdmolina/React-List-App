import React from 'react';
import { createUseStyles } from 'react-jss';

import Body from '../Images/iPhone.png'

// Styles
const useStyles = createUseStyles({
    prop: {
        
    }
})

function BackgroundProp() {
    const classes = useStyles();
    return (
        <div className={classes.prop}>
            <img src={Body} alt='Body' />
        </div>
    )
}

export default BackgroundProp