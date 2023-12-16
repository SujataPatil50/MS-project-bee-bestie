const express = require('express')
const Routes = express.Router();

const { createUser, getUserById, deleteUserById, updateUser, addEditProfileImage, userListing, checkExist } = require('../controllers/UserController');

Routes.post('/add-user', createUser);
Routes.get('/get-user-by-id', getUserById);
Routes.delete('/delete-user', deleteUserById);
Routes.put('/edit-user', updateUser);
Routes.put('/edit-image', addEditProfileImage);
Routes.get('/user-list', userListing);
Routes.post('/check-exist', checkExist);

module.exports = Routes;


