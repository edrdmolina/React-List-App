// Libraries
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import axios from 'axios';

// Components
import Item from '../Components/Item';
import AddItemForm from '../Components/AddItemForm';

// Styles
const useStyles = createUseStyles({
    list: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#FCFCFC',
        padding: '5rem 0 5rem 0',

        '& h1': {
            textTransform: 'uppercase',
            marginBottom: '1rem',
            textAlign: 'center',
            fontSize: '3rem',
            backgroundColor: '#F25C05',
            padding: '0.5rem',
            borderRadius: '10px',
            color: '#0A0805'
        }
    },
    table: {
        backgroundColor: '#0388A6C8',
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
        backgroundColor: '#F28705',
        padding: '0.25rem 0.75rem',
        borderRadius: '15px',
        
        '&:active': {
            backgroundColor: '#F25C05',
        }
    }
})

function Lists(props) {
        const classes = useStyles();
        const { data, updateData } = props;
        
        const { listId } = props.match.params;
        const listData = data.filter(l => l._id === listId)[0];

        const [sort, updateSort] = useState(0);
        const [items, updateItems] = useState([]);

        // REDIRECTS if there is no data.
        if(!data.length) window.location.href = '/error';

        useEffect(() => {
            updateItems([...listData.items])
        }, [listData])

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
        async function deleteItems() {
            // Remove from frontend
            const newItems = items.filter(i => !i.checked);
            const checkedItems = items.filter(i => i.checked);
            if (!checkedItems.length) return;
            updateItems([...newItems]);
            // Remove from backend
            try {
                const input = { items: [...checkedItems] };
                axios.post(`/api/removeItems/${listId}`, input)
            } catch (error) {
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
                <h1>{listData.title}</h1>
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
                            <button className={classes.deleteItemsButton} onClick={deleteItems} >CLEAR CHECKED ITEMS</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    
}

export default Lists