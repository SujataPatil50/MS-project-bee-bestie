const express = require('express')
const Routes = express.Router();

const { createMessage, getChatRoomWiseMessage, markAsRead, deleteChat } = require('../controllers/MessageController');

Routes.post('/add-message', createMessage);
Routes.get('/message-listing', getChatRoomWiseMessage);
Routes.put('/delete-chat', deleteChat);
Routes.put('/message-read', markAsRead);

module.exports = Routes;


