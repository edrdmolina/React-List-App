const express = require('express');
const router = express.Router();

// Controller modules
const users= require('../controller/users.js')

// Middleware
const {
    catchAsync, isValidPassword, changePassword, isLoggedIn
} = require('../middleware')


// POST Login User /login
router.post('/login', catchAsync(users.postLogin));

// POST Logout User /logout
router.get('/logout', catchAsync(users.getLogout));

// POST Register User /register
router.post('/register', catchAsync(users.registerUser));
// GET User data /getUser
router.get('/getUser', isLoggedIn, catchAsync(users.getUserData));

// PUT User info /user
router.put('/updateUser', 
    isLoggedIn, 
    catchAsync(isValidPassword), 
    catchAsync(changePassword), 
    catchAsync(users.updateUser)
);

// DELETE user /user
router.put('/delete', 
    isLoggedIn, 
    catchAsync(isValidPassword),
    catchAsync(users.deleteUser)
)

// POST req reset token /forgot-pw
router.post('/forgot-pw', catchAsync(users.reqResetToken))

// POST reset password /reset-pw
router.put('/reset-pw', catchAsync(users.resetPw))

module.exports = router;