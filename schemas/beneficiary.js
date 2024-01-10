const mongoose = require("mongoose");

const beneficiarydetailsSchema = new mongoose.Schema({
    Bankname: {
        type: String,
        required: true,
    },
    Branch: {
        type: String,
        required: true,
    },
    IFSCcode: {
        type: String,
        required: true,
    },
    AccNumber: {
        type: Number,
        required:true,
    },
    Name: {
        type: String,
        required: true,
    },
    Accuserid:{
        type: String,
        required: true,
    }
});

const Beneficiarydetails = mongoose.model("Beneficiarydetails", beneficiarydetailsSchema);
module.exports = Beneficiarydetails;