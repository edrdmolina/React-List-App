// Libraries
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { createUseStyles } from 'react-jss';
import "swiper/css";

// Styles
const useStyles = createUseStyles({
    item: {
        width: '100%',
        height: '3rem',
        borderBottom: '1px solid #FCFCFC',
    },
    checked: {
        textDecoration: 'line-through',
        textDecorationThickness: '3px',
    },
    itemRow: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        '& div': {
            height: '50%'
        },

        '& input': {
            width: '55%',
            textAlign: 'center',
            borderRadius: '5px',
            color: '#FCFCFC',
            boxShadow: '0 0 5px #4F51BC',
        },
        '& input:focus': {
            boxShadow: '0 0 5px #FCFCFC',
        }
    },
    itemTitle: {
        width: '85%',
        marginLeft: '5%',
        cursor: 'pointer',
    },
    itemQty: {
        width: '15%',
        textAlign: 'center'
    },
    editForm: {
        justifyContent: 'space-around',

        '& button': {
            color: '#FCFCFC',
            backgroundColor: '#4F51BC',
            padding: '0.25rem 0.75rem',
            borderRadius: '15px',

            '&:active': {
                backgroundColor: '#4F51BC32',
            }
        }
    },
    editButtons: {
        justifyContent: 'space-evenly',
        '& i': {
            cursor: 'pointer',

            '&:active': {
                transform: 'translate(1px,1px)'
            }
        }
    },
    editQty: {
        width: '20%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '1.75rem',

        '& i': {
            cursor: 'pointer',

            '&:active': {
                transform: 'translate(1px,1px)'
            }
        }
    },
    inputError: {
        position: 'relative',
        animation: '$shake 0.05s linear infinite alternate',
        boxShadow: '0 0 5px #C03546 !important',
    },
    '@keyframes shake': {
        from: {
            left: '3px',
        },
        to: {
            right: '3px',
        }
    }
})

function Item(props) {
    const classes = useStyles();
    const { 
        title, _id, checked, quantity, 
        checkItem, deleteItem, editItem,
    } = props;

    const [titleInput, updateTitleInput] = useState(title);
    const [quantityInput, updateQuantityInput] = useState(quantity);
    const [isEdit, toggleIsEdit] = useState(false);
    const [inputError, updateInputError] = useState(false);

    const handleTitleInputChange = e => updateTitleInput(e.target.value);
    const handleQtyIncrement = () => updateQuantityInput(quantityInput + 1);
    const handleQtyDecrement = () => {
        if (quantityInput === 1) return;
        updateQuantityInput(quantityInput - 1);
    }

    const handleIsEditToggle = () => toggleIsEdit(!isEdit);

    const handleCheck= () => checkItem(_id);
    
    const handleDeleteItem = () => deleteItem(_id)

    function handleSaveChanges() {
        if(titleInput.length === 0) {
            updateInputError(true);
            setTimeout(() => updateInputError(false), 300);
            return;
        }
        editItem(_id, titleInput, quantityInput);
        toggleIsEdit(!isEdit);
    }

    return (
        <Swiper className={classes.item} slidesPerView={1} >
            <SwiperSlide>
                <div className={classes.itemRow}>
                    <div 
                        className={`${checked ? classes.checked : null} ${classes.itemTitle}`} 
                        onClick={handleCheck}>
                        {title}
                    </div>
                    <div className={classes.itemQty} >
                        {quantity}
                    </div>
                </div>
            </SwiperSlide>
            { isEdit ? (
                <SwiperSlide>
                    <div className={`${classes.itemRow} ${classes.editForm}`}>
                        <input 
                            type='text' 
                            value={titleInput} 
                            onChange={handleTitleInputChange} 
                            className={inputError ? classes.inputError : null} 
                        />
                        <div className={classes.editQty}>
                            <i className='far fa-minus-square minus' onClick={handleQtyDecrement} />
                            {quantityInput}
                            <i className='far fa-plus-square plus' onClick={handleQtyIncrement} />
                        </div>
                        <button onClick={handleSaveChanges}>SAVE</button>
                    </div>
                </SwiperSlide>
            ) : (
                <SwiperSlide>
                    <div className={`${classes.itemRow} ${classes.editButtons}`}>
                        <i className="far fa-trash-alt fa-2x" onClick={handleDeleteItem} />
                        <i className="far fa-edit fa-2x" onClick={handleIsEditToggle} />
                    </div>
                </SwiperSlide>
            ) }
        </Swiper>
    )
}

export default Item