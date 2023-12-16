const uuid = require("uuid");
const Bcrypt = require("bcrypt")
const Multer = require("multer");
const JWT = require('jsonwebtoken');

const SALTROUNDS = process.env.SALT_ROUNDS;
const JwtSecrate = process.env.JWT_SECRET;

const generateToken = (obj) => {
    return JWT.sign(obj, JwtSecrate);
}


const ResourcesTypes = {
    MentalHealth: "mentalHealth",
    WellnessEducation: "wellnessEducation",
    CommunicationResources: "communicationResources",
    MeetUs: "meetUs",
    CounsellingServices: 'counsellingServices',
    DiscussionFormus: 'discussionFormus',
    HealthAlerts: 'healthAlerts',
}

const StaticHealthAssessmentAns = {
    Never: 0,
    Rarely: 0,
    Sometimes: 0,
    Frequently: 0,
}
module.exports = {
    uuid,
    Bcrypt,
    Multer,
    JWT,
    SALTROUNDS,
    generateToken,
    ResourcesTypes,
    StaticHealthAssessmentAns
}