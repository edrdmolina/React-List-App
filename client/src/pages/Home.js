//  Libraries
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Styles
import '../styles/Home.css'

export class Home extends Component {
    render() {
        
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
}

export default Home
