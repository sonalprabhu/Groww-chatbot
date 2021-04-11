const {Category} = require('../models/category');
const {User} = require('../models/user');
const {app} = require('../app');
const {fetchUserKycFaqs,getFaqsFromCategory} = require("../api_config/ResponseMapper");
const supertest = require('supertest');
const mongoose = require('mongoose');

describe("Testing '/search-on-category' API",()=> {

    it(`tests '/search-on-category' and categoryName as 'Mutual Funds' and no user information`,async (done)=>{
        const categoryDoc = await Category.findOne({categoryName: 'Mutual Funds'}).exec();
        const expectedFaqs = await getFaqsFromCategory(categoryDoc);
        const response = await supertest(app).get('/search-on-category').query({
            categoryName: 'Mutual Funds'
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/search-on-category' and categoryName as 'Mutual Funds' and KYC completed user`,async (done)=>{
        const kycUsers = await User.find({'userKyc.status': 'Completed'}).exec();
        const categoryDoc = await Category.findOne({categoryName: 'Mutual Funds'}).exec();
        const expectedFaqs = await getFaqsFromCategory(categoryDoc);
        const response = await supertest(app).get('/search-on-category').query({
            categoryName: 'Mutual Funds',
            user: kycUsers[0]._id.toString(),
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/search-on-category' and categoryName as 'Mutual Funds' and non-KYC user`,async (done)=>{
        const nonKycUsers = await User.find({'userKyc.status': 'Not completed'}).populate('faqs').exec();
        const categoryDoc = await Category.findOne({categoryName: 'Mutual Funds'}).exec();
        const expectedFaqs = (await fetchUserKycFaqs(nonKycUsers[0])).concat(await getFaqsFromCategory(categoryDoc));
        const response = await supertest(app).get('/search-on-category').query({
            categoryName: 'Mutual Funds',
            user: nonKycUsers[0]._id.toString(),
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/search-on-category' and categoryName as 'Stocks' and no user information`,async (done)=>{
        const categoryDoc = await Category.findOne({categoryName: 'Stocks'}).exec();
        const expectedFaqs = await getFaqsFromCategory(categoryDoc);
        const response = await supertest(app).get('/search-on-category').query({
            categoryName: 'Stocks'
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/search-on-category' and categoryName as 'Stocks' and KYC completed user`,async (done)=>{
        const kycUsers = await User.find({'userKyc.status': 'Completed'}).exec();
        const categoryDoc = await Category.findOne({categoryName: 'Stocks'}).exec();
        const expectedFaqs = await getFaqsFromCategory(categoryDoc);
        const response = await supertest(app).get('/search-on-category').query({
            categoryName: 'Stocks',
            user: kycUsers[0]._id.toString(),
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/search-on-category' and categoryName as 'Stocks' and non-KYC user`,async (done)=>{
        const nonKycUsers = await User.find({'userKyc.status': 'Not completed'}).populate('faqs').exec();
        const categoryDoc = await Category.findOne({categoryName: 'Stocks'}).exec();
        const expectedFaqs = (await fetchUserKycFaqs(nonKycUsers[0])).concat(await getFaqsFromCategory(categoryDoc)); 
        const response = await supertest(app).get('/search-on-category').query({
            categoryName: 'Stocks',
            user: nonKycUsers[0]._id.toString(),
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/search-on-category' and categoryName as 'Gold' and no user information`,async (done)=>{
        const categoryDoc = await Category.findOne({categoryName: 'Gold'}).exec();
        const expectedFaqs = await getFaqsFromCategory(categoryDoc);
        const response = await supertest(app).get('/search-on-category').query({
            categoryName: 'Gold'
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/search-on-category' and categoryName as 'Gold' and KYC completed user`,async (done)=>{
        const kycUsers = await User.find({'userKyc.status': 'Completed'}).exec();
        const categoryDoc = await Category.findOne({categoryName: 'Gold'}).exec();
        const expectedFaqs = await getFaqsFromCategory(categoryDoc);
        const response = await supertest(app).get('/search-on-category').query({
            categoryName: 'Gold',
            user: kycUsers[0]._id.toString(),
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/search-on-category' and categoryName as 'Gold' and non-KYC user`,async (done)=>{
        const nonKycUsers = await User.find({'userKyc.status': 'Not completed'}).populate('faqs').exec();
        const categoryDoc = await Category.findOne({categoryName: 'Gold'}).exec();
        const expectedFaqs = (await fetchUserKycFaqs(nonKycUsers[0])).concat(await getFaqsFromCategory(categoryDoc)); 
        const response = await supertest(app).get('/search-on-category').query({
            categoryName: 'Gold',
            user: nonKycUsers[0]._id.toString(),
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/search-on-category' and categoryName as 'FDs' and no user information`,async (done)=>{
        const categoryDoc = await Category.findOne({categoryName: 'FDs'}).exec();
        const expectedFaqs = await getFaqsFromCategory(categoryDoc);
        const response = await supertest(app).get('/search-on-category').query({
            categoryName: 'FDs'
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/search-on-category' and categoryName as 'FDs' and KYC completed user`,async (done)=>{
        const kycUsers = await User.find({'userKyc.status': 'Completed'}).exec();
        const categoryDoc = await Category.findOne({categoryName: 'FDs'}).exec();
        const expectedFaqs = await getFaqsFromCategory(categoryDoc);
        const response = await supertest(app).get('/search-on-category').query({
            categoryName: 'FDs',
            user: kycUsers[0]._id.toString(),
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/search-on-category' and categoryName as 'FDs' and non-KYC user`,async (done)=>{
        const nonKycUsers = await User.find({'userKyc.status': 'Not completed'}).populate('faqs').exec();
        const categoryDoc = await Category.findOne({categoryName: 'FDs'}).exec();
        const expectedFaqs = (await fetchUserKycFaqs(nonKycUsers[0])).concat(await getFaqsFromCategory(categoryDoc));
        const response = await supertest(app).get('/search-on-category').query({
            categoryName: 'FDs',
            user: nonKycUsers[0]._id.toString(),
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/search-on-category' and categoryName to be empty and no user information`,async (done)=>{
        const response = await supertest(app).get('/search-on-category');
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/search-on-category' and categoryName as invalid category and no user information`,async (done)=>{
        const response = await supertest(app).get('/search-on-category').query({
            categoryName: 'some random category'
        });
        expect(response.status).toBe(404);
        done();
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
});