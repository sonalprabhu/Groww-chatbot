const {Faq} = require('../models/faqs');
const {User} = require('../models/user');
const {Order} = require('../models/order');
const {Product} = require('../models/product');
const {app,fetchUserKycFaqs} = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const {productArr} = require('../data');

describe("Testing '/order-specific-questions' API",()=> {

    it(`tests '/order-specific-questions', order is completed and valid user`,async (done) => {
        const completedOrders = await Order.find({orderStatus: 'Completed'}).populate('user').exec();
        const sampleOrder = completedOrders[Math.floor(Math.random()*completedOrders.length)];
        let expectedFaqs = await Faq.find({faqCategoryPath: {$all: ['Orders','Completed']}}).exec();
        expectedFaqs = expectedFaqs.map((faq)=>faq.toJSON());
        expectedFaqs = expectedFaqs.flatMap((faqDoc)=>{
            const faqResponse = faqDoc.faqQuestionText.map((q,idx)=>{
                return {QuestionId: faqDoc._id.toString(),QuestionPos: idx,QuestionText: q};
            });
            return faqResponse;
        });
        if(sampleOrder.user.userKyc.status !== 'Completed'){
            let userKycFaqs = await Faq.find({faqCategoryPath: {$all: ['My Account','KYC']}}).exec();
            userKycFaqs = userKycFaqs
                            .flatMap((faqDoc)=>{
                                const faqResponse = faqDoc.faqQuestionText.map((q,idx)=>{
                                    return {QuestionId: faqDoc._id.toString(),QuestionPos: idx,QuestionText: q};
                                });
                                return faqResponse;      
                            });
            expectedFaqs = userKycFaqs.concat(expectedFaqs);
        }
        const response = await supertest(app).get('/order-specific-questions').query({
            order: sampleOrder._id.toString(),
            user: sampleOrder.user._id.toString()
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });   

    it(`tests '/order-specific-questions', order is cancelled and valid user`,async (done) => {
        const completedOrders = await Order.find({orderStatus: 'Cancelled'}).populate('user').exec();
        const sampleOrder = completedOrders[Math.floor(Math.random()*completedOrders.length)];
        let expectedFaqs = await Faq.find({faqCategoryPath: {$all: ['Orders','Cancelled']}}).exec();
        expectedFaqs = expectedFaqs.map((faq)=>faq.toJSON());
        expectedFaqs = expectedFaqs.flatMap((faqDoc)=>{
            const faqResponse = faqDoc.faqQuestionText.map((q,idx)=>{
                return {QuestionId: faqDoc._id.toString(),QuestionPos: idx,QuestionText: q};
            });
            return faqResponse;
        });
        if(sampleOrder.user.userKyc.status !== 'Completed'){
            let userKycFaqs = await Faq.find({faqCategoryPath: {$all: ['My Account','KYC']}}).exec();
            userKycFaqs = userKycFaqs
                            .flatMap((faqDoc)=>{
                                const faqResponse = faqDoc.faqQuestionText.map((q,idx)=>{
                                    return {QuestionId: faqDoc._id.toString(),QuestionPos: idx,QuestionText: q};
                                });
                                return faqResponse;      
                            });
            expectedFaqs = userKycFaqs.concat(expectedFaqs);
        }
        const response = await supertest(app).get('/order-specific-questions').query({
            order: sampleOrder._id.toString(),
            user: sampleOrder.user._id.toString()
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/order-specific-questions', order is pending and valid user`,async (done) => {
        const completedOrders = await Order.find({orderStatus: 'Pending'}).populate('user').exec();
        const sampleOrder = completedOrders[Math.floor(Math.random()*completedOrders.length)];
        let expectedFaqs = await Faq.find({faqCategoryPath: {$all: ['Orders','Pending']}}).exec();
        expectedFaqs = expectedFaqs.map((faq)=>faq.toJSON());
        expectedFaqs = expectedFaqs.flatMap((faqDoc)=>{
            const faqResponse = faqDoc.faqQuestionText.map((q,idx)=>{
                return {QuestionId: faqDoc._id.toString(),QuestionPos: idx,QuestionText: q};
            });
            return faqResponse;
        });
        if(sampleOrder.user.userKyc.status !== 'Completed'){
            let userKycFaqs = await Faq.find({faqCategoryPath: {$all: ['My Account','KYC']}}).exec();
            userKycFaqs = userKycFaqs
                            .flatMap((faqDoc)=>{
                                const faqResponse = faqDoc.faqQuestionText.map((q,idx)=>{
                                    return {QuestionId: faqDoc._id.toString(),QuestionPos: idx,QuestionText: q};
                                });
                                return faqResponse;      
                            });
            expectedFaqs = userKycFaqs.concat(expectedFaqs);
        }
        const response = await supertest(app).get('/order-specific-questions').query({
            order: sampleOrder._id.toString(),
            user: sampleOrder.user._id.toString()
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/order-specific-questions', order is valid and valid user , order not in user orders or vice-versa`,async (done) => {
        const validOrders = await Order.find({}).exec();
        const sampleOrder = validOrders[Math.floor(Math.random()*validOrders.length)];
        const user = await User.findOne({$nor: [{_id: sampleOrder.userId}]}).exec();
        const response = await supertest(app).get('/order-specific-questions').query({
            order: sampleOrder._id.toString(),
            user: user._id.toString()
        });
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/order-specific-questions', order is valid and invalid user`,async (done) => {
        const validOrders = await Order.find({}).exec();
        const sampleOrder = validOrders[Math.floor(Math.random()*validOrders.length)];
        const response = await supertest(app).get('/order-specific-questions').query({
            order: sampleOrder._id.toString(),
            user: 'some random user',
        });
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/order-specific-questions', order is valid and user is empty`,async (done) => {
        const validOrders = await Order.find({}).exec();
        const sampleOrder = validOrders[Math.floor(Math.random()*validOrders.length)];
        const response = await supertest(app).get('/order-specific-questions').query({
            order: sampleOrder._id.toString(),
        });
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/order-specific-questions', order is invalid and user is invalid`,async (done) => {
        const response = await supertest(app).get('/order-specific-questions').query({
            order: 'some random order',
            user: 'some random user'
        });
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/order-specific-questions', order is invalid and user is empty`,async (done) => {
        const response = await supertest(app).get('/order-specific-questions').query({
            order: 'some random order'
        });
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/order-specific-questions', order is invalid and user is valid`,async (done) => {
        const sampleUser = await User.findOne({}).exec();
        const response = await supertest(app).get('/order-specific-questions').query({
            order: 'some random order',
            user: sampleUser._id.toString(),
        });
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/order-specific-questions', order is empty and user is invalid`,async (done) => {
        const response = await supertest(app).get('/order-specific-questions').query({
            user: 'some random user'
        });
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/order-specific-questions', order is empty and user is empty`,async (done) => {
        const response = await supertest(app).get('/order-specific-questions');
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/order-specific-questions', order is empty and user is valid`,async (done) => {
        const sampleUser = await User.findOne({}).exec();
        const response = await supertest(app).get('/order-specific-questions').query({
            user: sampleUser._id.toString(),
        });
        expect(response.status).toBe(404);
        done();
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
});