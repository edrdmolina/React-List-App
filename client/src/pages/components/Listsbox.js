//  Libraries
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Styles
import '../../styles/Listsbox.css';

export class Listsbox extends Component {

    render() {
        const { _id, title, items } = this.props

        const preview = items.map(i => {
            return (
                <li key={i._id} className={`Preview-item ${
                    i.checked ? 'checked' : ''
                }`}>
                    {i.title}
                </li>
            )
        })
        return (
            <Link to={`/${_id}`} className='Listbox' >
                <h3 className='Title'>{ title }</h3>
                <ul className='Preview'>
                    {preview}
                </ul>
            </Link>
        )
    }
}

export default Listsbox
