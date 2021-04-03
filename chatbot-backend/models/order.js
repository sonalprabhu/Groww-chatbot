const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderStatus: {type: String},
    orderDate: {type: String},
    category: {type: String},
    products: [{type: mongoose.Schema.Types.ObjectId,ref: 'Product'}],
    userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    faqId: [{type: mongoose.Schema.Types.ObjectId,ref: 'Faq'}],
},{
    id: false,
    versionKey: false,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
})

orderSchema.virtual('faqs',{
    ref: 'Faq',
    localField: 'faqId',
    foreignField: '_id',
    justOne: false,
});

orderSchema.virtual('user',{
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});

orderSchema.virtual('productDocs',{
    ref: 'Product',
    localField: 'products',
    foreignField: '_id',
    justOne: false
});

exports.Order = mongoose.model('Order',orderSchema,'orders');