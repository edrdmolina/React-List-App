// Libraries
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import axios from 'axios';

// Components
import Listsbox from '../Components/Listsbox';
import AddList from '../Components/AddList';
import Logo from '../Icons/Logo-SM.svg'

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
        padding: '8rem 0 5rem 0',
    },

    '@media (max-width: 768px)': {
        lists: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '1rem',
            padding: '2rem 0 6rem 0',

            '& img': {
                height: '100px',
                margin: '0 0 2rem 0'
            }
        }
    }
})

function Lists(props) {
    const { data, updateData } = props;
    const classes = useStyles();

    const [showForm, toggleShowForm] = useState(false);

    useEffect(() => {   
        async function getData() {
            const res = await axios.get('/api/all');
            updateData(res.data.lists);
        }
        getData();
    },[updateData])

    function handleToggleShowForm() {
        toggleShowForm(!showForm);
    }

    function addList(newList) {
        updateData([...data, newList]);
    }

    const lists = data.map(list => {
        return (
            <Listsbox {...list} key={list._id} updateData={updateData} data={data} />
        )
    })

    return (
        <div className={classes.lists}>
            <img src={Logo} alt="Logo" className={classes.logo} />
            { lists }
            < AddList handleToggleShowForm={handleToggleShowForm} showForm={showForm} addList={addList} />
        </div>
    )
}

export default Lists