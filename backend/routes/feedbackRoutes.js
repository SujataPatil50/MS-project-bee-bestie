const express = require('express')
const Routes = express.Router();

const { addFeedback, getUserReviews } = require('../controllers/FeedbackController');

Routes.post('/add-feedback', addFeedback);
Routes.get('/get-user-feedback', getUserReviews);


module.exports = Routes;


