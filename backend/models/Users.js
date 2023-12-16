const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { uuid } = require("../utils/constants");
var Double = require("mongodb").Double;

const UsersSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      // default: uuid.v4()
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "email must be unique"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    age: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
      enum: ["M", "F"],
    },
    birthDate: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    university: {
      type: String,
      default: "",
    },
    contact: {
      type: String,
      default: "",
    },
    emergencyContact: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    goals: {
      type: String,
      default: "",
    },
    personalInterest: {
      type: String,
      default: "",
    },
    music: {
      type: String,
      default: "",
    },
    academicYear: {
      type: String,
      default: "",
    },
    profileImageUrl: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: "",
    },
    forgotPassToken: {
      type: String,
      default: "",
    },
    forgotPassTime: {
      type: String,
      default: "",
    },
    avgRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Users", UsersSchema);
