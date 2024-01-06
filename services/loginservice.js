
const { GetRegistrationFormDocumentFromUsername } = require('./registrationformservice');

async function CheckLoginfields(username, pwd) {
    var registrationformdocument = await GetRegistrationFormDocumentFromUsername(username);
    console.log(registrationformdocument);
    if (registrationformdocument.password == pwd) {
        return true;
    }
    else {
        return false;

    }
}
module.exports = { CheckLoginfields };