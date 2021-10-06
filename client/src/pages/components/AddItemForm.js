// Libraries
import React, { Component } from 'react'
import axios from 'axios'

export class AddItemForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name: '',
             qty: 1,
        }
    }

    handleUserInput = e => {
        const { value, id } = e.target;
        this.setState({ [id]: value });
    }
    
    addQty = e => this.setState(ps => ({ qty: ps.qty+= 1 }))

    subtractQty = e => { 
        if (this.state.qty <= 1) return;
        this.setState(ps => ({ qty: ps.qty-= 1 }))
    }

    handleSubmit = e => {
        e.preventDefault();
        this.addItem()
    }

    // Adds item to backend MongoDb
    addItem = async () => {
        const { name, qty } = this.state;
        const { listId } = this.props
        const input = { name, qty, listId };
        const result = await axios.post(`/api/${listId}`, input);
        this.props.addItem(result.data.item)
        this.setState({ name: '', qty: 1 })
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='Name-container'>
                    <input id='name' name='name' className='Name-input'
                        type='text' value={this.state.name}
                        onChange={this.handleUserInput}
                    />
                    <button className='submit' type='submit'>ADD</button>
                </div>
                <div className='Qty-container'>
                    <div className='Qty-number' >{this.state.qty}</div>
                    <div className='Qty-buttons'>
                        <i 
                            className="plus far fa-plus-square fa-2x"
                            onClick={this.addQty}
                        ></i>
                        <i 
                            className="minus far fa-minus-square fa-2x"
                            onClick={this.subtractQty}
                        ></i>
                    </div>
                </div>
            </form>
        )
    }
}

export default AddItemForm
