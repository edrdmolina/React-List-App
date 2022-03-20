//  Libraries
import React from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from "react-jss";

// Styles
const useStylesLargeScreen = createUseStyles({

})
const useStylesSmallScreen = createUseStyles({

})

function Home() {
    

    return (
        <div className='Home'>
            <div className='Container'>
                <h1>LIST APP</h1>
                <p>
                    An app designed to create checklists for everyday tasks.
                </p>
                <div className='Buttons'>
                    <Link to='/register'><button>Sign Up</button></Link>
                    <Link to='/Login'><button>Log In</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Home
