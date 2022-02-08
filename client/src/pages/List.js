// Libraries
import React, { Component } from 'react';
import axios from 'axios';

// Components
import AddItemForm from './components/AddItemForm';
import Item from './components/Item';

// Styles
import '../styles/List.css'

class List extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            list: { _id: ''},
            items: [],
            sort: 0,
        }
    }
    
    componentDidMount = async () => {
        // Gets lists data on component render
        await this.getData();
        // Updates the App component to show the user has now ENTERED a list.
        this.props.enteredList(this.state.list._id);
    }    
    
    componentWillUnmount = () => {
        // Updates the App component to show the user has now EXITED a list.
        this.props.exitedList();
    }

    // Get data from DB
    getData = async (sort) => {
        const { listId } = this.props.match.params;
        let res = { data: { error: '', redirectUrl: '' } };
        // checks if arg exist and is a number
        if(!isNaN(sort)) {
            const input = {sort}
            res = await axios.put(`/api/sort/${listId}`, input);
        } else {
            res = await axios.get(`/api/${listId}`); 
        }
        if (res.data.error) {
            return window.location.href = res.data.redirectUrl;
            // ERROR PAGE
        } else {
            const { list } = res.data;
            const items = [...list.items];
            this.setState({ list: list, items });
        }
    }

    // Adds item to client array in state
    addItem = (newItem) => {
        this.setState(ps=> ({
            items: [...ps.items, newItem]
        }))
    }

    // Check Item
    checkItem = async (itemId) => {
        // CHECK IN FRONTEND
        const { items } = this.state
        const newItems = [...items]
        let itemIndex = items.findIndex(item => item._id === itemId)
        newItems[itemIndex].checked = !newItems[itemIndex].checked;
        this.setState(ps => ({
            items: [...newItems]
        }))
        // CHECK IN BACKEND
        const res = await axios.put(`api/check/${itemId}`);
        console.log(res.data)
    }

    // Delete checked items
    deleteItems = async () => {
        const { items } = this.state;
        const listId = this.state.list._id;
        const checkedItems = items.filter(item => {
            return item.checked === true;
        })

        if (checkedItems.length) {
            // DELETE IN FRONTEND
            const uncheckedItems = items.filter(item => {
                return item.checked === false;
            })
            this.setState({
                items: uncheckedItems
            })
            // DELETE IN BACKEND
            const input = { items: [...checkedItems] }
            const res = await axios.post(`/api/removeItems/${listId}`, input)
            console.log(res.data.message)
        }
        return
    }

    // Handle sort
    handleSort = async () => {
        this.sortItems();
    }

    // Change sort state
    sortItems = () => {
        const { sort } = this.state;
        if (sort === 3) {
            return this.setState({ sort: 0 }, () => {
                this.getData(this.state.sort)
            });
        }
        this.setState(ps => ({
            sort: ps.sort += 1
        }), () => {
            this.getData(this.state.sort)
        })
    }

    render() {
        const { listId } = this.props.match.params;
        const { title } = this.state.list;
        const items = this.state.items.map(item => {
            return (
                <Item key={item._id} checkItem={this.checkItem} {...item} />
            )
        })

        return (
            <div className='list'>
                <h1 className='list-title'>{title}</h1>
                <div className='table'>
                    <div className='table-head'>
                        <div className='table-row'>
                            <div className='table-data-head sort' onClick={this.handleSort}>
                                ITEMS
                                <i className="fas fa-sort" style={{ paddingLeft: '10px' }} />
                            </div>
                            <div className='table-data-head'>
                                QTY
                            </div>
                        </div>
                    </div>
                    <div className='table-body'>
                        { items }
                    </div>
                    <div className='table-footer'>
                        <div className='table-row'>
                            <div className='table-data-footer'>
                                <AddItemForm listId={listId} addItem={this.addItem} />
                            </div>
                        </div>
                        <div className='table-row'>
                            <button className='deleteItems-button' onClick={this.deleteItems}>REMOVE CHECKED ITEMS</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default List