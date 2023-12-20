const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors('*'));


mongoose.connect('mongodb://localhost:27017/Bank');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully to Mongo DB");
});

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log("Node server started", PORT);
});

const userSchema = require('./registrationschema');

app.get("/getregistrationform", async (request, response) => {
    try {
        const userget = userSchema.find({});
        response.json(userget);
    }
    catch (error) {
        response.status(500).send(error);
    }
});

app.post("/createregistrationform", async (request, response) => {
    const Fname = request.body.firstname;
    const Lname = request.body.lastname;
    const Date=request.body.DOB;
    const Email = request.body.email;
    const Gender = request.body.gender;
    const phno = request.body.mobileno;
    const cty=request.body.country;
    const check=request.body.checkbox;


    const userFields=new userSchema({
        firstname: Fname,
        lastname: Lname,
        DOB:Date,
        email: Email,
        gender: Gender,
        mobileno: phno,
        country:cty,
        checkbox:check,
    });

    try {
        const newUser = await userFields.save();
        const allUsers=await userSchema.find({});
        response.json(allUsers);
    }
    catch (error) {
        response.status(500).send(error);
    }
});