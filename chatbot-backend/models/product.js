const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productReturnsSchema = new Schema({ //only eligible for mutual funds
    sixMonths: {type: String},
    oneYear: {type: String},
    threeYear: {type: String},
    fiveYear: {type: String},
    all: {type: String},
});
const productFDSchema = new Schema({ //only eligible for FDs
    rateOfInterest: {type: String},
    minAmount: {type: String},
    compounding: {type: String},
    prematureWithdrawal: {type: String},
});
const stockPriceSchema = new Schema({
    nse: {type: String},
    bse: {type: String},
})

const priceSchema = new Schema({
    stockPrice: {type: stockPriceSchema},
    fundReturns: {type: productReturnsSchema},
    fd: {type: productFDSchema},
    purity: {type: String},//only for gold
});

const productSchema = new Schema({
    productCategory: {type: String},
    productPrice: {type: priceSchema},
    productName: {type: String},
    faqId: [{type: mongoose.Schema.Types.ObjectId,ref: 'Faq'}],
});

exports.Product = mongoose.model('Product',productSchema,'products');