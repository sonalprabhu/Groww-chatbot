const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    pageName: {type: String},
    pageCategory: {type: String},
    faqId: [{type: mongoose.Schema.Types.ObjectId,ref: 'Faq'}],
});

exports.Page = mongoose.model('Page',pageSchema,'pages');