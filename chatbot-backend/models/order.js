const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderStatus: {type: String},
    orderDate: {type: String},
    category: {type: String},
    products: [{type: mongoose.Schema.Types.ObjectId,ref: 'Product'}],
    units: [{type: Number}],
    userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User'}
},{
    id: false,
    versionKey: false,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
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