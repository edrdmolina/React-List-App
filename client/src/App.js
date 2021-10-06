// Libraries
import React, { Component } from 'react'
import axios from 'axios';
// Styles
import './App.css';

//Components 
import Routes from './Routes';
import NavigationBar from './pages/NavigationBar';

// APP CLASS
export class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       isLoggedIn: false,
       user: {},
       isInList: false,
       deleteListId: '',
    }
  }

  componentDidMount = () => {
    // Searches for user data on load
    this.getUser()
  }

  // Searches for user data in order to allow for dynamic Navbar and routes.
  getUser = async () => {
    const res = await axios.get('/api/users/getUser');
    if (res.data.user) {
      this.setState({
        user: res.data.user,
        isLoggedIn: true,
      })
    } else {
      this.setState({ isLoggedIn: false })
    }
  }
  // Will be called once logged out.
  removeUser = () => {
    this.setState({ user: {}, isLoggedIn: false})
  }


  // Checks if the Component showing is the List component.
  // Is passed down through props on Routes then on to the individual list component.
  enteredList = (deleteListId) => {
    console.log('is in a list route')
    this.setState({ isInList: true, deleteListId })
  }
  exitedList = () => {
    console.log('exited list')
    this.setState({ isInList: false, deleteListId: '' })
  }
  
  render() {
    return (
      <div className='App'>
        <NavigationBar {...this.state} removeUser={this.removeUser} />
        <Routes enteredList={ this.enteredList } exitedList={ this.exitedList } {...this.state} />
      </div>
    )
  }
}

export default App

