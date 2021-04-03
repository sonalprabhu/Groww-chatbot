const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: {type: String},
    subCategoryId: [{type: mongoose.Schema.Types.ObjectId,ref: 'Category'}],
    hasSubCategory: {type: Boolean},
    faqId: [{type: mongoose.Schema.Types.ObjectId,ref: 'Faq'}],
},{
    id: false,
    versionKey: false,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
});

categorySchema.virtual('faqs',{
    ref: 'Faq',
    localField: 'faqId',
    foreignField: '_id',
    justOne: false,
});

categorySchema.virtual('subCategories',{
    ref: 'Category',
    localField: 'subCategoryId',
    foreignField: '_id',
    justOne: false,
});

exports.Category = mongoose.model('Category',categorySchema,'categories');