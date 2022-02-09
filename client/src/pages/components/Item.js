// Libraries
import React, { Component } from 'react';
import { Swiper } from 'swiper/react/swiper';
import { SwiperSlide } from 'swiper/react/swiper-slide';
import '../../styles/Item.css'
import axios from 'axios';

import 'swiper/swiper.min.css';

class Item extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        title: '',
        quantity: 0,
        edit: false,
      }
    }

    componentDidMount() {
        this.setState({
            title: this.props.title,
            quantity: this.props.quantity
        })
    }

    handleClick = e => {
        this.props.checkItem(e.target.id);
    }

    handleEditToggle = () => {
        this.setState(cs => ({
            edit: !cs.edit,
        }))
    }

    handleInputChange = e => {
        this.setState({
            title: e.target.value
        })
    }

    handleQtyIncrement = () => {
        this.setState(cs => ({
            quantity: cs.quantity + 1
        }))
    }

    handleQtyDecrement = () => {
        if(this.state.quantity === 1) return;
        this.setState(cs => ({
            quantity: cs.quantity - 1
        }))
    }

    handleEditSave = async () => {
        const { _id } = this.props;
        const { title, quantity } = this.state;
        const input = { title, quantity, _id };
        try {
            const res = await axios.put(`/api/update-item`, input)
            this.setState({
                title: res.data.item.title,
                quantity: res.data.item.quantity
            })
            this.props.getData();
            this.handleEditToggle();
        } catch (err) {
            return console.error(err)
        }
    }

    handleDeleteItem = async () => {
        const { _id } = this.props;
        try {
            this.props.getData();
            await axios.delete(`/api/delete-item/${_id}`);
        } catch (err) {
            return console.error(err);
        }
    }

    render() {
        const { _id, checked, title, quantity } = this.props
        return (
            <Swiper className='item'>
                <SwiperSlide className='table-row'>
                    <div className='item-data-row'>
                        <div 
                            className={`item-data item-name ${checked ? 'checked' : ''}`} 
                            id={_id} onClick={this.handleClick}>
                            { title }
                        </div>
                        <div className='item-data'>
                            { quantity }
                        </div>
                    </div>
                </SwiperSlide>
                { this.state.edit ? (
                    <SwiperSlide className='table-row-edit-form'>
                        <input type='text' value={this.state.title} onChange={this.handleInputChange} />
                        <div className='edit-qty'>
                            <i className='far fa-minus-square minus' onClick={this.handleQtyDecrement} />
                            <div className='qty'>{this.state.quantity}</div>
                            <i className='far fa-plus-square plus' onClick={this.handleQtyIncrement} />
                        </div>
                        <button onClick={this.handleEditSave}>SAVE</button>
                    </SwiperSlide>
                ) : (
                    <SwiperSlide className='table-row-edit-btn'>
                        <i className="far fa-trash-alt" onClick={this.handleDeleteItem} />
                        {/* <i className="far fa-check-square" id={_id} onClick={this.handleClick} /> */}
                        <i className="far fa-edit" onClick={this.handleEditToggle} />
                    </SwiperSlide>
                ) }
                
            </Swiper>
        )
    }
}

export default Item