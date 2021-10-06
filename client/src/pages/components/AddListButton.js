// Libraries
import React, { Component } from 'react'

// Styles
import '../../styles/AddListButton.css'

export class AddListButton extends Component {

    handleClick = e => {
        this.props.toggleInputForm()
    }

    render() {
        return (
            <div 
                onClick={this.handleClick} 
                className='AddList-button'
            >
                <h3>Add List</h3>
                <div className='Plus'>
                    <i className="far fa-plus-square fa-7x"></i>
                </div>
            </div>
        )
    }
}

export default AddListButton
