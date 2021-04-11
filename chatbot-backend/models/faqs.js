const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faqAnswerSchema = new Schema({
    faqAnswerText: {type: String},
    faqAnswerType: {type: String}
});

const faqQuestionAnswerSchema = new Schema({
    faqQuestion: {type: String,unique: true},
    faqAnswer: [{type: faqAnswerSchema}],
    faqIsDynamic: {type: Boolean},
    faqDynamicKey: {type: String,select: false},
    faqUpvoteCount: {type: Number},
    faqDownvoteCount: {type: Number}
});

const faqSchema = new Schema({
    faqQuestionAnswer: [{type: faqQuestionAnswerSchema}],
    faqCategoryName: {type: String}
},{
    id: false,
    versionKey: false,
});

exports.Faq = mongoose.model('Faq',faqSchema,'faqs');