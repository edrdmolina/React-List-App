const User = require('../models/user');
const util = require('util');
const sgMail = require('@sendgrid/mail');
const { verify } = require('crypto');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    // USERS
    async getUserData(req, res, next) {
        console.log('PINGED GET USER DATA ROUTE')
        return res.status(200).json({
            user: req.user,
            message: 'PINGED GET USER DATA ROUTE'
        })
    },
    async registerUser(req, res, next) {
        console.log('PINGED POST FOR REGISTER ROUTE')

        // Register new user
        const user = await User.register(new User(req.body), req.body.password);
        req.login(user, error => {
            if(error) return res.status(200).json({
                error
            })
            delete req.session.returnTo;
        })
        return res.status(200).json({
            success: true,
        })
    },
    async updateUser(req, res, next) {
        console.log('PINGED UPDATE USER ROUTE')
        const { user } = res.locals;
        const { username, email } = req.body;
        if (username) user.username = username;
        if (email) user.email = email;
        await user.save();
        const login = util.promisify(req.login.bind(req));
        await login(user);
                
        return res.status(200).json({
            message: 'Updated user information.', 
        })
    },
    async deleteUser(req, res, next) {
        const message = 'PINGED DELETE USER ROUTE';
        console.log(message);
        const { user } = req.body;
        await User.findByIdAndDelete({ _id: user._id })
        
        const redirectUrl = '/';
        return res.status(200).json({
            message, redirectUrl
        })
    },
    async postLogin(req, res, next) {
        console.log('PINGED LOGIN ROUTE')
        const { username, password } = req.body;
        const { user, error } = await User.authenticate()(username, password)
        if (!user && error) {
            return res.status(200).json({ error })
        }
        req.login(user, function(err) {
            if (err) {
                return res.status(200).json({ error })
            }
            return res.status(200).json({
                success: true,
                redirectUrl: '/',
            })
        })
    },
    async getLogout(req, res, next) {
        console.log('PINGED LOGOUT ROUTE');
        req.logout();
        return res.status(200).json({
            message: 'PINGED BACKEND LOGOUT ROUTE',
        })
    },
    async reqResetToken(req, res, next) {
        const message = 'PINGED REQ RESET TOKEN ROUTE';
        console.log(message);
        const { email } = req.body;
        // Search for user
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(200).json({
                message, error: `Email does not exist.`
            })
        }
        // Create secret token
        let token = '';
        for (let i = 0; i < 6; i++) {
            token += String(Math.floor(Math.random() * 10));
        }
        // Add token to user
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 1800000;
        await user.save()

        // SEND EMAIL
        const msg = {
            to: email,
            from: 'React-List Admin<edrdmolina11@gmail.com>',
            subject: 'React-List App - Forgot / Reset Password',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
            Please use the following token to unlock a password reset.
            ${token}
            `.replace(/    /g, ''),
        }
        await sgMail.send(msg);
        return res.status(200).json({
            message, success: `Sent an email with a link to reset password`
        })
    },
    async verifyResetToken(req, res, next) {
        console.log('PINGED VERIFY RESET TOKEN');
        const { token } = req.body;

        // Find user with token
        const user = await User.findOne({ 
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        // If no user return
        if (!user) {
            return res.status(200).json({
                error: `Token does not exist or has expired`
            })
        }

        return res.status(200).json({
            token,
            user
        })
    },
    async resetPw(req, res, next) {
        const message = 'PINGED RESET PASSWORD ROUTE'
        // Set variables
        const { id, newPassword, confirmNewPassword } = req.body;

        // Verify passwords match
        if (newPassword !== confirmNewPassword) {
            return res.status(200).json({
                message, error: 'Passwords do not match!'
            })
        }

        // Find user with token
        const user = await User.findById(id);
        if (!user) {
            return res.status(200).json({
                error: `User not found`
            })
        }

        await user.setPassword(newPassword);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        const login = util.promisify(req.login.bind(req));

        await login(user);

        const msg = {
            to: user.email,
            from: 'React-List Admin<edrdmolina11@gmail.com>',
            subject: 'React-List App - Forgot / Reset Password',
            text: `This email is to confirm that the password of your account has been changed.
            If you did not make this change please reply and notify us at once!`.replace(/                    /g, ''),
        }
        await sgMail.send(msg);

        return res.status(200).json({ 
            message, success: 'Successfully changed password.',
            redirectUrl: '/'
        });
    },
}