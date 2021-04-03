const {Faq} = require('../models/faqs');
const {User} = require('../models/user');
const {Product} = require('../models/product');
const {app,fetchUserKycFaqs} = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const {productArr} = require('../data');

describe("Testing '/product-specific-questions' API",()=> {

    it(`tests '/product-specific-questions' ,product is valid and user is empty`,async (done) => {
        const productName = productArr[Math.floor(Math.random()*productArr.length)].productName;
        const productDoc = await Product.findOne({productName}).exec();
        let expectedFaqs = await Faq.find({faqCategoryPath: {$all: ['Products',productName,productName+' General']}}).exec();
        expectedFaqs = expectedFaqs.map((faq)=>faq.toJSON());
        expectedFaqs = expectedFaqs.flatMap((faqDoc)=>{
            const faqResponse = faqDoc.faqQuestionText.map((q,idx)=>{
                return {QuestionId: faqDoc._id.toString(),QuestionPos: idx,QuestionText: q};
            });
            return faqResponse;
        });
        const response = await supertest(app).get('/product-specific-questions').query({
            product: productDoc._id.toString(),
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/product-specific-questions' ,product is valid and user is invalid`,async (done) => {
        const productName = productArr[Math.floor(Math.random()*productArr.length)].productName;
        const productDoc = await Product.findOne({productName}).exec();
        let expectedFaqs = await Faq.find({faqCategoryPath: {$all: ['Products',productName,productName+' General']}}).exec();
        expectedFaqs = expectedFaqs.map((faq)=>faq.toJSON());
        expectedFaqs = expectedFaqs.flatMap((faqDoc)=>{
            const faqResponse = faqDoc.faqQuestionText.map((q,idx)=>{
                return {QuestionId: faqDoc._id.toString(),QuestionPos: idx,QuestionText: q};
            });
            return faqResponse;
        });
        const response = await supertest(app).get('/product-specific-questions').query({
            product: productDoc._id.toString(),
            user: 'some random user',
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/product-specific-questions' ,product is valid and user is valid KYC user`,async (done) => {
        const productName = productArr[Math.floor(Math.random()*productArr.length)].productName;
        const productDoc = await Product.findOne({productName}).exec();
        const kycUsers = await User.find({'userKyc.status': 'Completed'}).exec();
        let expectedFaqs = await Faq.find({faqCategoryPath: {$all: ['Products',productName]}}).exec();
        expectedFaqs = expectedFaqs.map((faq)=>faq.toJSON());
        expectedFaqs = expectedFaqs.flatMap((faqDoc)=>{
            const faqResponse = faqDoc.faqQuestionText.map((q,idx)=>{
                return {QuestionId: faqDoc._id.toString(),QuestionPos: idx,QuestionText: q};
            });
            return faqResponse;
        });
        const response = await supertest(app).get('/product-specific-questions').query({
            product: productDoc._id.toString(),
            user: kycUsers[0]._id.toString(),
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/product-specific-questions' ,product is valid and user is valid non-KYC user`,async (done) => {
        const productName = productArr[Math.floor(Math.random()*productArr.length)].productName;
        const productDoc = await Product.findOne({productName}).exec();
        const nonKycUsers = await User.find({'userKyc.status': 'Not completed'}).populate('faqs').exec();;
        let expectedFaqs = await Faq.find({faqCategoryPath: {$all: ['Products',productName]}}).exec();
        expectedFaqs = expectedFaqs.map((faq)=>faq.toJSON());
        expectedFaqs = expectedFaqs.flatMap((faqDoc)=>{
            const faqResponse = faqDoc.faqQuestionText.map((q,idx)=>{
                return {QuestionId: faqDoc._id.toString(),QuestionPos: idx,QuestionText: q};
            });
            return faqResponse;
        });
        expectedFaqs = fetchUserKycFaqs(nonKycUsers[0]).concat(expectedFaqs);
        const response = await supertest(app).get('/product-specific-questions').query({
            product: productDoc._id.toString(),
            user: nonKycUsers[0]._id.toString(),
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/product-specific-questions' ,product is invalid`,async (done) => {
        const response = await supertest(app).get('/product-specific-questions').query({
            product: 'some random product'
        });
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/product-specific-questions' ,product is empty`,async (done) => {
        const response = await supertest(app).get('/product-specific-questions');
        expect(response.status).toBe(404);
        done();
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
});