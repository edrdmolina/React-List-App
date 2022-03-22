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

    useEffect( () => {
        if(!user.username) getUser();
        getData();
        getScreenWidth();
        window.onresize = getScreenWidth;
    }, [user, updateData])
    
    async function getUser() {
        try {
            const res = await axios.get('/api/users/getUser');
            if(res.data.user) updateUser(res.data.user);
        } catch(error) {
            console.error(error)
        }
    }

    async function getData() {
        try {
            const res = await axios.get('/api/all');
            updateData(res.data.lists);
        } catch (error) {
            console.log(error)
        }
    }

    const getScreenWidth = () => updateScreenWidth(window.innerWidth);
    
    return (
        <div className={classes.app}>
            < Navbar user={user} updateUser={updateUser} screenWidth={screenWidth} />
            < Routes 
                user={user} data={data} 
                updateData={updateData} getUser={getUser} 
                getData={getData} screenWidth={screenWidth} 
            />
        </div>
    )
}

export default AppRefactored