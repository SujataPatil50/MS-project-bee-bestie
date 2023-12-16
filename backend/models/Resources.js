const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResourceSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        type: {
            type: String,
        },
        image: {
            type: String,
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("resources", ResourceSchema);
