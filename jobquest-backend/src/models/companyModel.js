const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    companyType: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Company', CompanySchema);
