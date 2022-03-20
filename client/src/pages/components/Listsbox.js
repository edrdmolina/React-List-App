//  Libraries
import React from 'react'
import { Link } from 'react-router-dom'
import { createUseStyles } from 'react-jss';

// Styles
const useStyles = createUseStyles({
    listBox: {
        height: '250px',
        width: '250px',
        borderRadius: '10px',
        textDecoration: 'none',
        color: '#FCFCFC',
        backgroundColor: '#FCFCFC12',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',

        '&:hover':{
            textDecoration: 'none',
            color: '#FCFCFC',
            boxShadow: '0 0 10px #fcfcfc52',
        },

        '& h3':{
            textAlign: 'center',
            borderBottom: 'dashed #FCFCFC 4px',
            height: '20%',
            paddingTop: '0.5rem',
            margin: '0',
        },
    },
    preview: {
        height: '80%',
        margin: '0',
        padding: '1.25rem 0 0 .75rem',

        // TODO FIX SIZING
        '& li': {
            fontSize: '20px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        }
    }

})


function Listsbox(props) {
    const classes = useStyles();
    
    const { _id, title, items } = props;

    const preview = items.map((item,i) => {
        if (i >= 5) return null;
        return (
            <li key={item._id} className={`Preview-item ${
                item.checked ? 'checked' : ''
            }`}>
                {item.title}
            </li>
        )
    })
    return (
        <Link to={`/${_id}`} className={classes.listBox} >
            <h3>{ title }</h3>
            <ul className={classes.preview}>
                {preview}
            </ul>
        </Link>
    )
    
}

export default Listsbox
