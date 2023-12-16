const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { uuid } = require('../utils/constants');

const FeedbackSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
            // default: uuid.v4()
        },
        reviewFor: {
            type: String,
        },
        reviewBy: {
            type: String,
        },
        name: { //review giver name
            type: String,
        },
        listenerName: { //review from name
            type: String,
        },
        dateOfService: {
            type: String,
        },
        review: {
            type: String,
        },
        rating: {
            type: Number,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("feedback", FeedbackSchema);
