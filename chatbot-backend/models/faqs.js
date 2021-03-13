const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: This is the alpha version of faq schema.More variables need to be added for showing dynamic answers.
const faqSchema = new Schema({
    faqQuestionText: {type: String},
    faqCategoryPath: [{type: String}],
    faqAnswerText: [{type: String}],
    faqIsDynamic: {type: Boolean},
})

exports.Faq = mongoose.model('Faq',faqSchema,'faqs');