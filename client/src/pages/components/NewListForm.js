// Libraries
import React, { Component } from 'react'
import axios from 'axios'

// Styles
import '../../styles/NewListForm.css'

export class NewListForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             title: ''
        }
    }

    handleUserInput = e => {
        const { value, id } = e.target;
        this.setState({ [id]: value });
    }

    cancelForm = e => {
        this.props.cancel();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.addList()
    }

    addList = async () => {
        const { title } = this.state
        const input = { title }
        const result = await axios.post('/api/addList', input);
        this.props.addList(result.data.newList);
        this.props.toggleInputForm();
    }
    

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='NewListForm'>
                <div className='Title-container'>
                    <input id='title' name='title' autoFocus='on'
                        type='text' value={this.state.title}
                        onChange={this.handleUserInput} autoComplete='off'
                    />
                </div>
                <div className='NewListForm-buttons'>
                    <button type='submit' className='Add-button'>ADD</button>
                    <button type='button' className='Cancel-button' onClick={this.cancelForm}>CANCEL</button>
                </div>
            </form>
        )
    }
}

export default NewListForm
