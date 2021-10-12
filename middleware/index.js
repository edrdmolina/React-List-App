const User = require('../models/user');

const middleware = {
    catchAsync: (fn) => 
        (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                .catch(next);
        },
    isValidPassword: async (req, res, next) => {
        console.log('VERIFYING PASSWORD')
        const { user } = await User.authenticate()(req.user.username, req.body.password);
        if (user) {
            res.locals.user = user;
            next();
        } else {
            return res.status(200).json({
                error: 'Password is incorrect'
            })
        }
    },
    changePassword: async (req, res, next) => {
        const { newPassword, confirmNewPassword } = req.body;
        if (newPassword && !confirmNewPassword) {
            return res.status(200).json({
                error: 'Missing new password confirmation'
            })
        } else if (newPassword && confirmNewPassword) {
            const { user } = res.locals;
            if (newPassword === confirmNewPassword) {
                await user.setPassword(newPassword);
                next();
            } else {
                return res.status(200).json({
                    error: 'New Password and Password Confirmation do not match.'
                })
            }
        } else {
            next();
        }
    },
    isLoggedIn: (req, res, next) => {
        if(!req.isAuthenticated()) {
            return res.status(200).json({ error: 'User not logged in', redirectUrl: '/login'})
        } 
        next();
    },
    registrationValidation: async (req, res, next) => {
        const { email, username, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match'
            })
        }

        // Check if email already exist
        const emailValidation = await User.find({ email });
        if (emailValidation.length) {
            return res.status(200).json({
                error: 'Email already exist!'
            })
        }

        // Check if username already exist
        const usernameValidation = await User.find({ username });
        if (usernameValidation.length) {
            return res.status(200).json({
                error: 'Username already exist!'
            })
        }
        next();
    }
}

module.exports = middleware;