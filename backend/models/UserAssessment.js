const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserAssessmentSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        questionId: {
            type: String,
            ref: "healthAssessment", // Reference to the HealthAssessment model
        },
        answerDetails: {
            type: String,
        },
        userId: {
            type: String,
            ref: "Users", // Reference to the Users model
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("userAssessment", UserAssessmentSchema);
