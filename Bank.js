const express = require('express');
const cors = require("cors");
const { Userfields, test } = require('./services/registrationformservice');
const { Accountdetails } = require('./services/accountservice');

const app = express();
app.use(express.json());
app.use(cors('*'));

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log("Node server started", PORT);
});

app.get("/getregistrationform", async (request, response) => {
    var y = await test();
    try {
        response.json(y);
    }
    catch (error) {
        response.status(500).send(error);
    }
});

app.post("/createregistrationform", async (req, res) => {
    var x = await Userfields(req);
    // create account details call chey
    var acc=Accountdetails(x.userId,x.username);
    try {
        res.json('Account Created Successfully');
    }
    catch (error) {
        res.status(500).send(error);
    }
});