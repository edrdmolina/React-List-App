// Libraries
import React, { Component } from 'react';
import axios from 'axios';

//Components
import NewListForm from './components/NewListForm';
import Listsbox from './components/Listsbox';
import AddListButton from './components/AddListButton';

// Styles
import '../styles/Lists.css'

export class Lists extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             lists: [],
             showForm: false,
        }
    }
    
    componentDidMount = () => {
        this.getData();
    }

    // Get data from DB
    getData = async () => {
        const result = await axios.get('/api/lists');
        if (result.data.error) {
            return window.location.href = result.data.redirectUrl;
        }
        const { lists } = result.data
        this.setState({
            lists: [...lists]
        })
    }

    // Open input form for new list
    toggleInputForm = e => {
        this.setState(ps => ({
            showForm: !ps.showForm,
        }))
    }

    addList = newList => {
        this.setState(ps => ({
            lists: [...ps.lists, newList]
        }))
    }

    render() {

        const lists = this.state.lists.map(l => {
            return (
                <Listsbox {...l} key={l._id} />
            )
        })
        
        return (
            <div className='Lists'>
                { lists }
                <div className='AddList'>
                    { this.state.showForm ? (
                        <NewListForm 
                            cancel={this.toggleInputForm} addList={this.addList} 
                            toggleInputForm={this.toggleInputForm}
                        />
                    ) : (
                        <AddListButton toggleInputForm={this.toggleInputForm} />
                    )}
                </div>
                
            </div>
        )
    }
}

export default Lists