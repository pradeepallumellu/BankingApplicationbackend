const beneficiarySchema = require('../schemas/beneficiary');
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/Bank');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully to Mongo DB BeneficiaryServices");
});

async function SaveBeneficiarydetails(request) {
    const detailsofbeneficiaery = new beneficiarySchema({
        Bankname: request.body.Bankname,
        Branch: request.body.Branch,
        IFSCcode: request.body.IFSCcode,
        AccNumber: request.body.AccNumber,
        Name: request.body.Name,
        Accuserid: request.body.Accuserid
    });
    const beneficiarydetails = await detailsofbeneficiaery.save();
    return beneficiarydetails;
}
    async function NameandAccountUserIdExists(name,accuserid){
        var ifnameanduseridexists=await beneficiarySchema.exists({Name:name,Accuserid:accuserid});
      if(ifnameanduseridexists){
        return false
      }
      else{
        return true
      }
    }

module.exports = { SaveBeneficiarydetails,NameandAccountUserIdExists };