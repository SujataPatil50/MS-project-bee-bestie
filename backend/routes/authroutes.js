const express = require('express')
const Routes = express.Router();

const { loginUsers, logoutUsers, forgotPasswort, resetPassword } = require('../controllers/AuthController');

Routes.post('/login-user', loginUsers);
Routes.post('/logout-user', logoutUsers);
Routes.post('/forgot-pass', forgotPasswort);
Routes.post('/reset-pass', resetPassword);

module.exports = Routes;


