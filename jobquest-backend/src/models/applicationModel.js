const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema({
    applicant: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    companyId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    jobRole: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
