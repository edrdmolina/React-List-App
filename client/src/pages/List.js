// Libraries
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import axios from 'axios';

// Components
import Item from './components/Item';
import AddItemForm from './components/AddItemForm';

// Styles
const useStyles = createUseStyles({
    list: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#FCFCFC',
        padding: '3rem 0',

        '& h2': {
            textTransform: 'uppercase',
            marginBottom: '2rem',
            width: '100%',
            textAlign: 'center',
        }
    },
    table: {
        backgroundColor: '#FCFCFC1f',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px #00000052',
        width: '90%',
        maxWidth: '576px',
        overflow: 'hidden',
    },
    tableHead: {
        width: '100%',
        height: '50px',
        margin: 'auto',
        borderBottom: '1px solid #FCFCFC',

        '& div': {
            padding: '0 2.5%',
        }
    },
    tableRow: {
        height: '3rem',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    tableBody: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    sort: {
        cursor: 'pointer',
    },
    deleteItemsButton: {
        margin: '0 auto',
        color: '#FCFCFC',
        backgroundColor: '#4F51BC',
        padding: '0.25rem 0.75rem',
        borderRadius: '15px',
        
        '&:active': {
            backgroundColor: '#4F51BC32',
        }
    }
})

function Lists(props) {
    const classes = useStyles();
    const { data, updateData, getData } = props;
    const { listId } = props.match.params;
    const listData = data.filter(l => l._id === listId)[0];

    const [sort, updateSort] = useState(0);
    const [items, updateItems] = useState([...listData.items]);

    useEffect(() => {
      getData();
    }, [getData])
    
    async function sortItems() {
        if (sort === 3) updateSort(0);
        else updateSort(sort + 1);
        const input = { sort };
        const result = await axios.put(`/api/sort/${listId}`, input);
        updateItems([...result.data.list.items])
    }

    async function checkItem(itemId) {
        const newItems = items.map(i => {
            if (i._id === itemId) i.checked = !i.checked;
            return i;
        })
        updateItems([...newItems]);
        await axios.put(`api/check/${itemId}`);

    }

    async function deleteItem(itemId) {
        const newItems = items.filter(i => i._id !== itemId);
        updateItems(newItems);
        try {
            await axios.delete(`/api/delete-item/${itemId}`)
        }   
        catch (error) {
            console.error(error)
        }
    }

    async function editItem(itemId, itemTitle, itemQty) {
        const input = { title: itemTitle, quantity: itemQty, _id: itemId};
        const result = await axios.put('/api/update-item', input);
        const newItems = items.map(i => {
            if (i._id === itemId) return result.data.item;
            else return i;
        })
        updateItems([...newItems]);
    }

    async function addItem(itemTitle, itemQty) {
        const input = { name: itemTitle, qty: itemQty, listId };
        const result = await axios.post(`/api/${listId}`, input);
        updateItems([...items, result.data.item]);
    }

    const itemComponents = items.map(item => {
        return (
            <Item 
                key={item._id} {...item} 
                updateData={updateData} checkItem={checkItem} 
                deleteItem={deleteItem} editItem={editItem}
            />
        )
    })

    return (
        <div className={classes.list}>
            <h2>{listData.title}</h2>
            <div className={classes.table}>
                <div className={classes.tableHead}>
                    <div className={classes.tableRow}>
                        <div className={classes.sort} onClick={sortItems}>
                            ITEMS
                            <i className="fas fa-sort" style={{ paddingLeft: '10px' }} />
                        </div>
                        <div>
                            QTY
                        </div>
                    </div>
                </div>
                <div className={classes.tableBody}>
                    { itemComponents }
                </div>
                <div>
                    <div className={classes.tableRow}>
                        <AddItemForm listId={listId} addItem={addItem} />
                    </div>
                    <div className={classes.tableRow}>
                        <button className={classes.deleteItemsButton} /* onClick={this.deleteItems} */ >CLEAR CHECKED ITEMS</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lists