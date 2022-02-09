// Libraries
import React, { Component } from 'react';
import { Swiper } from 'swiper/react/swiper';
import { SwiperSlide } from 'swiper/react/swiper-slide';

import 'swiper/swiper.min.css';
import '../../styles/Item.css'

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
                        <button>SAVE</button>
                    </SwiperSlide>
                ) : (
                    <SwiperSlide className='table-row-edit-btn'>
                        <i className="far fa-trash-alt" />
                        <i className="far fa-check-square" id={_id} onClick={this.handleClick} />
                        <i className="far fa-edit" onClick={this.handleEditToggle} />
                    </SwiperSlide>
                ) }
                
            </Swiper>
        )
    }
}

export default Item