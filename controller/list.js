const User = require('../models/user');
const List = require('../models/list');
const Item = require('../models/item');
const item = require('../models/item');

module.exports = {
    // LISTS
    async addList(req, res, next) {
        console.log('PINGED POST NEW LIST ROUTE');
        const { title } = req.body;
        const { _id } = req.user;
        // Create new list
        const newList = await new List({ title });
        // add user to list
        newList.user = _id;
        // find user
        const user = await User.findById({ _id })
        // add new list to user
        user.lists.push(newList);
        // save changes
        await newList.save();
        await user.save();

        return res.status(200).json({
            newList
        })
    },
    async getLists(req, res, next) {
        console.log('PINGED GET LISTS ROUTE');
        const { _id } = req.user;
        const lists = await List.find({ user: { _id } })
            .populate('user')
            .populate({
                path: 'items',
                options: {
                    limit: 5,
                    sort: { created: -1 },
                },
            }).exec()
        return res.status('200').json({
            lists
        })
    },
    async deleteList(req, res, next) {
        console.log('PINGED DELETE LIST ROUTE');
        const { listId } = req.params;
        await List.findByIdAndDelete({ _id: listId })
        return res.status(200).json({ redirectUrl: '/' })
    },
    // ITEMS
    async addItem(req, res, next) {
        console.log('PINGED POST NEW ITEM ROUTE');
        // Declare variables
        const { name, qty, listId } = req.body;
        const { _id } = req.user;
        // find list
        const list = await List.findById({_id: listId});
        // Add Item
        const item = await new Item({ title: name, quantity: qty });
        // Tag user id to item
        item.user = _id;
        // Add item to list
        list.items.push(item);
        // Save changes
        await item.save();
        await list.save();
        return res.status(200).json({
            item, list
        });
    },
    async getItems(req, res, next) {
        console.log('PINGED GET ITEMS ROUTE')
        const { listId } =  req.params;

        const list = await List.findById({ _id: listId })
            .populate({ 
                path: 'items',
            })
        if (!list) {
            return res.status(200).json({
                error: 'List not found.'
            })
        }
        return res.status(200).json({
            list
        });
    },
    async sortItems(req, res, next) {
        console.log('PINGED SORTING GET ITEMS');
        const { listId } = req.params;
        const { sort } = req.body;
        let list = {};
        switch(sort) {
            case 0:
                list = await List.findById({ _id: listId })
                    .populate({ 
                        path: 'items',
                        options: {
                            sort: { created: -1 },
                        },
                    });
                break;
            case 1:
                list = await List.findById({ _id: listId })
                    .populate({ 
                        path: 'items',
                        options: {
                            sort: { created: 1 },
                        },
                    });
                break;
            case 2:
                list = await List.findById({ _id: listId })
                    .populate({ 
                        path: 'items',
                        options: {
                            sort: { title: 1 },
                        },
                    });
                break;
            case 3:
                list = await List.findById({ _id: listId })
                    .populate({ 
                        path: 'items',
                        options: {
                            sort: { title: -1 },
                        },
                    });
                break;
            default:
                console.log('Sort error')
        }
        if (!list) {
            return res.status(200).json({
                error: 'List not found.'
            });
        }
        res.status(200).json({
            list
        });
        return;
    },
    async checkItem(req, res, next) {
        const message = 'PINGED CHECKOFF ITEM';
        console.log(message)
        const { itemId } = req.params;
        const item = await Item.findById(itemId);
        item.checked = !item.checked;
        item.save()
        return res.status(200).json({ message })
    },
    async updateItem(req, res, next) {
        const message = 'PINGED UPDATE ITEM ROUTE'
        console.log(message)
        const { title, quantity, _id } = req.body;
        const item = await Item.findById(_id);
        item.title = title;
        item.quantity = quantity;
        item.save();
        res.status(200).json({ message, item })
    },
    async deleteItems(req, res, next) {
        console.log('PINGED DELETE ITEMS')
        const { listId } = req.params;
        const { items } = req.body;

        for (let i = 0; i < items.length; i++) {
            await List.findByIdAndUpdate(listId, {
                $pull: { items: items[i]._id }
            });
            await Item.findByIdAndDelete(items[i]._id)
        }
        
        return res.status(200).json({ message: 'deleting items'});
    },
    async deleteItem(req, res, next) {
        console.log('PINGED DELETE SINGLE ITEM');
        await Item.findByIdAndDelete(req.params.itemId);
        return res.status(200);
    }
}