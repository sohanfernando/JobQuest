const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    companyName: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: String,
    industry: String,
    applicants: [{
        applicant: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        cvURL: String,
        applicationDate: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending'
        }
    }],
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Job', JobSchema);