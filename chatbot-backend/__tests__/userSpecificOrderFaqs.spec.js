const {User} = require('../models/user');
const {Category} = require('../models/category');
const {app} = require('../app');
const {fetchUserKycFaqs,getFaqsFromCategory} = require("../api_config/ResponseMapper");
const supertest = require('supertest');
const mongoose = require('mongoose');

describe("Testing '/user-specific-order-details' API",()=> {

    it(`tests '/user-specific-order-details' and user is valid KYC user`,async (done) => {
        const kycUsers = await User.find({'userKyc.status': 'Completed'}).exec();
        const orderGeneralCategory = await Category.findOne({categoryName: 'General'}).exec();
        const expectedFaqs = await getFaqsFromCategory(orderGeneralCategory);
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
        const orderGeneralCategory = await Category.findOne({categoryName: 'General'}).exec();
        const expectedFaqs = (await fetchUserKycFaqs(nonKycUsers[0])).concat(await getFaqsFromCategory(orderGeneralCategory));
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