const express = require('express');
const cors = require("cors");
const { SaveRegistrationForm, GetAllRegistrationDocuments, GetRegistrationusername} = require('./services/registrationformservice');
const { CreateAccountdetails } = require('./services/accountservice');
const { CheckLoginfields } = require('./services/loginservice');


const app = express();
app.use(express.json());
app.use(cors('*'));

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log("Node server started", PORT);
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
       var clientusername=request.query.username;
       var usernameexists=await GetRegistrationusername(clientusername);
        response.json(usernameexists);
       }
    catch (error) {
        response.status(500).send(error);
    }
});