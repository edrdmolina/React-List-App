import React from 'react';
import { createUseStyles } from 'react-jss';

import Body from '../Images/Home.png';

// Styles
const useStyles = createUseStyles({
    prop: {
        
        '& img': {
            height: '500px'

        }
    },
})

function BackgroundProp() {
    const classes = useStyles();
    return (
        <div className={classes.prop}>
            <img src={Body} alt='App on iPhone' />
        </div>
    )
}

export default BackgroundProp