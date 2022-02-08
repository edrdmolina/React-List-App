// Libraries
import React, { Component } from 'react';
import { Swiper } from 'swiper/react/swiper';
import { SwiperSlide } from 'swiper/react/swiper-slide';

import 'swiper/swiper.min.css';
import '../../styles/Item.css'

class Item extends Component {
    handleClick = e => {
        this.props.checkItem(e.target.id);
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
                <SwiperSlide className='table-row'>
                    edit
                </SwiperSlide>
            </Swiper>
        )
    }
}

export default Item