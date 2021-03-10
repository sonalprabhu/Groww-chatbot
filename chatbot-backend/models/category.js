const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: {type: String},
})

exports.Category = mongoose.model('Category',categorySchema,'categories');