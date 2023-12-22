const mongoose = require("mongoose");

const accdetailsSchema=new mongoose.Schema({
Bankname:{
    type:String,
    required:true,
},
Branch:{
    type:String,
    required:true,
},
IFSCcode:{
    type:String,
    required:true,
},
AccNo:{
    type:Number,
    required:true,
},
userId:{
    type:String,
    required:true,
},
username:{
    type:String,
    required:true,
},
});

const Accdetails=mongoose.model("Accdetails",accdetailsSchema);
module.exports=Accdetails;

