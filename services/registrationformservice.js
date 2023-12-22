const userSchema = require('../schemas/registrationschema');
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

mongoose.connect('mongodb://localhost:27017/Bank');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully to Mongo DB RegistrationServices");
});

function Id(){
    var x=uuidv4();
    return x;
}

  async function Userfields(request) {
    const userid = Id();
    const Fname = request.body.firstname;
    const Lname = request.body.lastname;
    const Date = request.body.DOB;
    const Email = request.body.email;
    const Gender = request.body.gender;
    const phno = request.body.mobileno;
    const cty = request.body.country;
    const check = request.body.checkbox;
    const name = request.body.username;
    const pwd=request.body.password;

    const userFields = new userSchema({
        firstname: Fname,
        lastname: Lname,
        username: name,
        userId: userid,
        DOB: Date,
        email: Email,
        gender: Gender,
        mobileno: phno,
        country: cty,
        checkbox: check,
        password:pwd,
    });
   
        const newUser = await userFields.save();
        //const allUsers = await userSchema.find({});
        return newUser;
    }

   async function test(){
        const userget = await userSchema.find({});
        return userget;
    }
module.exports={Userfields,test,Id};