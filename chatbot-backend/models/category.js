const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: {type: String},
    subCategoryId: [{type: mongoose.Schema.Types.ObjectId,ref: 'Category'}],
    hasSubCategory: {type: Boolean},
    faqId: [{type: mongoose.Schema.Types.ObjectId,ref: 'Faq'}],
})

exports.Category = mongoose.model('Category',categorySchema,'categories');