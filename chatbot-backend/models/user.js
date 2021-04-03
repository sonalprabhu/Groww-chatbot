const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    pan: {type: String},
    addressProof: {type: String}
});
const kycSchema = new Schema({
    status: {type: String},
    documents: {type: documentSchema}
});

const userSchema = new Schema({
    userName: {type: String},
    userPass: {type: String, select: false},
    userDOB: {type: String},
    userMob: {type: String},
    userMaritalStatus: {type: String},
    userGender: {type: String},
    userKyc: {type: kycSchema},
    userOrders: [{type: mongoose.Schema.Types.ObjectId,ref: 'Order'}],
    faqId: [{type: mongoose.Schema.Types.ObjectId,ref: 'Faq'}],
},{
    id: false,
    versionKey: false,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
});

userSchema.virtual('faqs',{
    ref: 'Faq',
    localField: 'faqId',
    foreignField: '_id',
    justOne: false,
});

userSchema.virtual('userOrdersDocs',{
    ref: 'Order',
    localField: 'userOrders',
    foreignField: '_id',
    justOne: false,
})

exports.User = mongoose.model('User',userSchema,'users');