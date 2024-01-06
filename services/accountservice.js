const Accdetails=require('../schemas/accountdetailsschema');
const mongoose = require("mongoose");
const{Id}=require('./registrationformservice');

mongoose.connect('mongodb://localhost:27017/Bank');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully to Mongo DB AccountServices");
});

async function CreateAccountdetails(uniqueId,name){
    var accnumber=Date.now();

const newAccount= new Accdetails({
    Bankname:'MiruBank',
    Branch:'KTDM Branch',
    IFSCcode: 'IFSC000023',
    AccNo:accnumber,
    userId:uniqueId,
    username:name
});
const newAcc=await newAccount.save();
return newAcc;
}


module.exports={CreateAccountdetails};