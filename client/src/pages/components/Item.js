// Libraries
import React, { Component } from 'react'


export class Item extends Component {
    handleClick = e => {
        this.props.checkItem(e.target.id);
    }
    render() {
        const { _id, checked, title, quantity } = this.props
        return (
            <tr>
                <td id={_id} onClick={this.handleClick}
                    className={`Item indent ${checked ? 'checked' : ''}`}
                >
                    {title}
                </td>
                <td className='Qty'>
                    {quantity}
                </td>
            </tr>
        )
    }
}

export default Item