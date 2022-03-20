// Libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createUseStyles } from 'react-jss';

// Components
import Routes from './Routes';
import Navbar from './Components/Navbar';

// Styles
const useStyles = createUseStyles({
    app: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

function AppRefactored() {
    const classes = useStyles;
    
    // State
    const [data, updateData] = useState([]);
    const [user, updateUser] = useState({});
    const [screenWidth, updateScreenWidth] = useState(0);

    useEffect(() => {
        getUser();
        getData();
        getScreenWidth();
        window.onresize = getScreenWidth;

    }, [])
    
    async function getUser() {
        const res = await axios.get('/api/users/getUser');
        if(res.data.user) {
            updateUser(res.data.user);
        }
    }

    async function getData() {
        const res = await axios.get('/api/all');
        updateData(res.data.lists);
    }

    function getScreenWidth() {
        updateScreenWidth(window.innerWidth);
    }

    function addList(newList) {
        updateData([...data, newList]);
    }
    
    return (
        <div className={classes.app}>
            < Navbar user={user} updateUser={updateUser}/>
            < Routes user={user} data={data} updateData={updateData} getData={getData} addList={addList} />
        </div>
    )
    

}

export default AppRefactored