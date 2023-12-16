const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        senderId: {
            type: String,
            required: true,
            ref: "Users", // Reference to the Users model
        },
        chatRoomId: {
            type: String,
            required: true,
        },
        readBy: {
            type: Array
        },
        deletedBy: {
            type: Array
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("messages", MessageSchema);
