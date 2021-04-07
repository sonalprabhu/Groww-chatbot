const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    userName: {type: String, required: true,unique: true},
    userPass: {type: String, required: true},
});

exports.Admin = mongoose.model('Admin',adminSchema,'admins');