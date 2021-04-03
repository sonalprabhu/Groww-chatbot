const {Faq} = require('../models/faqs');
const {User} = require('../models/user');
const {app,fetchUserKycFaqs} = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');

describe("Testing '/user-specific-order-details' API",()=> {

    it(`tests '/user-specific-order-details' and user is valid KYC user`,async (done) => {
        const kycUsers = await User.find({'userKyc.status': 'Completed'}).exec();
        let expectedFaqs = await Faq.find({faqCategoryPath: {$all: ['Orders','General']}}).exec();
        expectedFaqs = expectedFaqs.map((faq)=>faq.toJSON());
        expectedFaqs = expectedFaqs.flatMap((faqDoc)=>{
            const faqResponse = faqDoc.faqQuestionText.map((q,idx)=>{
                return {QuestionId: faqDoc._id.toString(),QuestionPos: idx,QuestionText: q};
            });
            return faqResponse;
        });
        const response = await supertest(app).get('/user-specific-order-details').query({
            user: kycUsers[0]._id.toString(),
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/user-specific-order-details' and user is valid non-KYC user`,async (done) => {
        const nonKycUsers = await User.find({'userKyc.status': 'Not completed'}).populate('faqs').exec();
        let expectedFaqs = await Faq.find({faqCategoryPath: {$all: ['Orders','General']}}).exec();
        expectedFaqs = expectedFaqs.map((faq)=>faq.toJSON());
        expectedFaqs = expectedFaqs.flatMap((faqDoc)=>{
            const faqResponse = faqDoc.faqQuestionText.map((q,idx)=>{
                return {QuestionId: faqDoc._id.toString(),QuestionPos: idx,QuestionText: q};
            });
            return faqResponse;
        });
        expectedFaqs = fetchUserKycFaqs(nonKycUsers[0]).concat(expectedFaqs);
        const response = await supertest(app).get('/user-specific-order-details').query({
            user: nonKycUsers[0]._id.toString(),
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/user-specific-order-details' and user is invalid`,async (done) => {
        const response = await supertest(app).get('/user-specific-order-details').query({
            user: 'some random user',
        });
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/user-specific-order-details' and user is empty`,async (done) => {
        const response = await supertest(app).get('/user-specific-order-details');
        expect(response.status).toBe(404);
        done();
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
});