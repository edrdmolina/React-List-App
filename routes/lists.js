// Libraries
const express = require('express');
const router = express.Router();

// Controller modules
const lists = require('../controller/list.js')

// Middleware
const {
    catchAsync, isLoggedIn
} = require('../middleware')

// GET Lists /lists
router.get('/lists', isLoggedIn, catchAsync(lists.getLists));

// POST Create new list /addList
router.post('/addList', isLoggedIn, catchAsync(lists.addList));

// GET Items from list /:listId
router.get('/:listId', isLoggedIn, catchAsync(lists.getItems));

// PUT Sort items /sort/:listId
router.put('/sort/:listId', isLoggedIn, catchAsync(lists.sortItems));

// DELETE List /:listId
router.delete('/:listId', isLoggedIn, catchAsync(lists.deleteList));

// POST New item to lists /:listId
router.post('/:listId', isLoggedIn, catchAsync(lists.addItem));

// Post Check items /:itemId
router.put('/check/:itemId', isLoggedIn, catchAsync(lists.checkItem));

// DELETE item from lists /removeItem
router.post('/removeItems/:listId', isLoggedIn, catchAsync(lists.deleteItems))

module.exports = router;