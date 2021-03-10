const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderStatus: {type: String},
    orderDate: {type: String},
    category: {type: String},
    products: [{type: mongoose.Schema.Types.ObjectId,ref: 'Product'}],
    userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    faqId: [{type: mongoose.Schema.Types.ObjectId,ref: 'Faq'}],
})

exports.Order = mongoose.model('Order',orderSchema,'orders');