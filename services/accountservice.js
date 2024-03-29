const Accdetails = require('../schemas/accountdetailsschema');
const mongoose = require("mongoose");
const configuration = require('../config')


mongoose.connect(configuration.mangoDbConnectionString);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully to Mongo DB AccountServices");
});

async function CreateAccountdetails(uniqueId, name) {
    var accnumber = Date.now();

    const newAccount = new Accdetails({
        Bankname: 'MiruBank',
        Branch: 'KTDM Branch',
        IFSCcode: 'IFSC000023',
        accountBalance: 0,
        AccNo: accnumber,
        userId: uniqueId,
        username: name
    });
    const newAcc = await newAccount.save();
    return newAcc;
}

async function Accountusername(name) {
    const accountusername = await Accdetails.findOne({ username: name });
    return accountusername;
}
async function Accountnumber(accno) {
    const accountno = await Accdetails.findOne({ AccNo: accno });
    return accountno;
}
async function AccountbalUpdate(accno, balofacc) {

    const TotalAmount = await Accdetails.findOneAndUpdate({ AccNo: accno }, { accountBalance: balofacc });
    // return TotalAmount;
    const updatedbalancedocument = await Accountnumber(accno);
    return updatedbalancedocument;

}
async function AccountUseridExists(userid){
const useridexists=await Accdetails.exists({userId:userid});

if(useridexists){
    return true;
}
else{
    return false;
}
}

module.exports = { CreateAccountdetails, Accountusername, Accountnumber, AccountbalUpdate, AccountUseridExists };