const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        members: [
            {
                type: Schema.Types.String,
                ref: "Users",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("chatRooms", ChatSchema);
