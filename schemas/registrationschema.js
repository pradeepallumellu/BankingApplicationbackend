const mongoose = require("mongoose");

const userFieldsSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    DOB: {
        type: Date,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    password:{
      type:String,
      required:true,
    },
    gender: {
        type: String,
        required: true,
    },
    mobileno: {
        type: Number,
        default: 0,
    },
    country: {
        type: String,
        required: true,
    },
    checkbox: {
        type: Boolean,
        required: true
    },
});

const Registrationform = mongoose.model("Registrationform", userFieldsSchema);
module.exports = Registrationform; 