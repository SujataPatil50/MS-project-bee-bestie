const express = require('express')
const Routes = express.Router();

const { createChatRoom, getUserChatRooms, getSingleChatRoom } = require('../controllers/ChatRoomsController');

Routes.post('/create-chat', createChatRoom);
Routes.get('/get-chat-list', getUserChatRooms);
Routes.get('/get-chat', getSingleChatRoom);

module.exports = Routes;


