const userSchema = require('../schemas/registrationschema');
const { GetRegistrationFormDocumentFromUsername } = require('./registrationformservice');

async function ProfileUpDate(clientname, mono, mailid) {
    var profile = await userSchema.findOneAndUpdate({ username: clientname }, { mobileno: mono }, { email: mailid });
    var updatedprofile = await GetRegistrationFormDocumentFromUsername(clientname);
    return updatedprofile;
}
module.exports = { ProfileUpDate };