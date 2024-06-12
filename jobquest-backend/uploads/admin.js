const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    adminId: {type:String,required:true, unique: true },
    username: { type: String, required: true },
    contact: {type:Number,required:true},
    email: { type: String, required: true},
    password: { type: String, required: true },
});

module.exports = mongoose.model('Admin', adminSchema);