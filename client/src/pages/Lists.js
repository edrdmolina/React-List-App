// Libraries
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

// Components
import Listsbox from './components/Listsbox';
import AddList from './components/AddList';

// Styles
const useStyles = createUseStyles({
    lists: {
        width: '90%',
        minHeight: `${window.innerHeight - 80}px`,
        maxWidth: '1200px',
        display: 'flex',
        flexFlow: 'row wrap',
        margin: '0 auto',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2rem',
        padding: '5rem 0',
    }
})

function Lists(props) {
    const { data, addList, getData } = props;
    const classes = useStyles();

    const [showForm, toggleShowForm] = useState(false);

    useEffect(() => {
      getData();
    }, [getData])
    

    function handleToggleShowForm() {
        toggleShowForm(!showForm);
    }


    const lists = data.map(list => {
        return (
            <Listsbox {...list} key={list._id} />
        )
    })

    return (
        <div className={classes.lists}>
            { lists }
            < AddList handleToggleShowForm={handleToggleShowForm} showForm={showForm} addList={addList} />
        </div>
    )
}

export default Lists