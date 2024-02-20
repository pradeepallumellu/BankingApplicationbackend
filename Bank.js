const express = require('express');
const cors = require("cors");
const { SaveRegistrationForm, GetAllRegistrationDocuments, GetRegistrationusername, GetRegistrationFormDocumentFromUsername } = require('./services/registrationformservice');
const { CreateAccountdetails, Accountusername, Accountnumber, AccountbalUpdate, AccountUseridExists } = require('./services/accountservice');
const { CheckLoginfields } = require('./services/loginservice');
const { SaveBeneficiarydetails, NameandAccountUserIdExists, GetdocumentsUsingAccuserid, GetdocumentUsingAccountnumber, BeneficiaryAccDeletion } = require('./services/beneficiaryservice');
const { DepositedAmount } = require('./services/depositservice');
const { TransferAmount } = require('./services/transferservice');
const { ProfileUpDate } = require('./services/profileupdate');

const app = express();
app.use(express.json());
app.use(cors('*'));

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log("Node server started", PORT);
});

app.get("/test", async (request, response) => {
    response.json("Test Successfull");
});

app.get("/getregistrationform", async (request, response) => {
    var y = await GetAllRegistrationDocuments();
    try {
        response.json(y);
    }
    catch (error) {
        response.status(500).send(error);
    }
});

app.post("/createregistrationform", async (req, res) => {

    try {
        // find if there is a doc already with same username, 
        //then only proceed to save reg and create account details
        var useraccname = await GetRegistrationusername(req.body.username);
        if (useraccname) {
            var x = await SaveRegistrationForm(req);
            // create account details call chey
            var acc = CreateAccountdetails(x.userId, x.username);
            res.json('Account Created Successfully');

        }
        else {
            res.json('User Name Already exists');
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});

app.post("/createloginform", async (request, response) => {
    try {
        var requiredlogin = await CheckLoginfields(request.body.username, request.body.password);
        response.json(requiredlogin);

    }
    catch (error) {
        response.status(500).send(error);
    }
});

app.get("/checkifusernameexists", async (request, response) => {
    try {
        var clientusername = request.query.username;
        var usernameexists = await GetRegistrationusername(clientusername);
        response.json(usernameexists);
    }
    catch (error) {
        response.status(500).send(error);
    }
});

app.post("/accountdetails", async (request, response) => {

    try {
        var accusername = await Accountusername(request.body.username);

        response.json(accusername);
    }
    catch (error) {
        response.status(500).send(error);
    }
})

app.post("/beneficiarycreation", async (request, response) => {
    try {
        var nameanduseridexists = await NameandAccountUserIdExists(request.body.Name, request.body.Accuserid);
        if (nameanduseridexists) {
            var beneficiarycreation = await SaveBeneficiarydetails(request);
            response.json("Beneficiarycreated successfully");
        }

        else {
            response.json("Beneficiary Alredy Exists");
        }
    }
    catch (error) {
        response.status(500).send(error);
    }
});

app.post("/deposits", async (request, response) => {
    try {
        const accountnumberdocument = await Accountnumber(request.body.AccNo);
        // response.json(accountnumberdocument);
        const accbal = DepositedAmount(request.body.depositamount, accountnumberdocument.accountBalance);
        const Accbalanceupdate = await AccountbalUpdate(request.body.AccNo, accbal);

        var resposeObj = { message: "deposited successfully", Accountbalance: Accbalanceupdate.accountBalance };
        response.json(resposeObj);

    }
    catch (error) {
        response.status(500).send(error);
    }
});

app.post("/getbeneficiaries", async (request, response) => {
    try {
        const useridaccount = await GetdocumentsUsingAccuserid(request.body.Accuserid);

        response.json(useridaccount);
    }
    catch (error) {
        response.status(500).send(error);
    }
});

app.post("/transferamount", async (request, response) => {
    try {
        const accountnumberdocument = await Accountnumber(request.body.AccNo);
        const transferAmount = TransferAmount(request.body.Amounttransfer, accountnumberdocument.accountBalance);
        // response.json(transferAmount);
        const AccbalanceupdateafterTransferAmount = await AccountbalUpdate(request.body.AccNo, transferAmount);
        // response.json(AccbalanceupdateafterTransferAmount);
        const beneficiaryAccnumberdocument = await GetdocumentUsingAccountnumber(request.body.AccNumber);
        const BeneficiaryAccountdocument = await Accountnumber(request.body.AccNumber);
        const depositamounttoBeneficiary = DepositedAmount(request.body.Amounttransfer, BeneficiaryAccountdocument.accountBalance);
        const Aftertransferaccupdate = await AccountbalUpdate(BeneficiaryAccountdocument.AccNo, depositamounttoBeneficiary);
        var transferObj = { message: "transfersuccessfully", Accountbalanceaftertransfer: AccbalanceupdateafterTransferAmount.accountBalance }
        response.json(transferObj);

    }

    catch (error) {
        response.status(500).send(error);
    }
});

app.get("/logout", async (request, response) => {
    try {
        var userid = request.query.userId;
        var existuserid = await AccountUseridExists(userid);
        response.json(existuserid);
    }
    catch (error) {
        response.status(500).send(error);
    }
});

app.delete("/beneficiarydeletion", async (request, response) => {
    try {
        var delebybenes = request.query.AccNumber;
        var accbensdeletion = await BeneficiaryAccDeletion(delebybenes);
        // response.json(accbensdeletion);
        var accuserid = request.body.Accuserid
        var getbenesdoc = await GetdocumentsUsingAccuserid(accuserid);
        response.json(getbenesdoc);
    }
    catch (error) {
        response.status(500).send(error);
    }
});

app.post("/profileupdate", async (request, response) => {
    try {
        var username = request.body.username;
        var usermono = request.body.mobileno;
        var useremail = request.body.email;

        var userprofile = await ProfileUpDate(username, usermono, useremail);
        var updateduserprofile = await GetRegistrationFormDocumentFromUsername(username);
        var resobj = { message: "updatedsuccessifully", mobileno: updateduserprofile.mobileno, email: updateduserprofile.email }
        response.json(resobj);
    }
    catch (error) {
        response.status(500).send(error);
    }
});
