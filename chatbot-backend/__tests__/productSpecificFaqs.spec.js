const {Category} = require('../models/category');
const {User} = require('../models/user');
const {Product} = require('../models/product');
const {app} = require('../app');
const {fetchUserKycFaqs,getFaqsFromCategory} = require("../api_config/ResponseMapper");
const supertest = require('supertest');
const mongoose = require('mongoose');
const {productArr} = require('../mock_data/data');

describe("Testing '/product-specific-questions' API",()=> {

    it(`tests '/product-specific-questions' ,product is valid and user is empty`,async (done) => {
        const productName = productArr[Math.floor(Math.random()*productArr.length)].productName;
        const productDoc = await Product.findOne({productName}).exec();
        const productGeneralCategory = await Category.findOne({categoryName: (productDoc.productName+' General')}).exec();
        const expectedFaqs = await getFaqsFromCategory(productGeneralCategory);
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
        const response = await supertest(app).get('/product-specific-questions').query({
            product: productDoc._id.toString(),
            user: 'some random user',
        });
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/product-specific-questions' ,product is valid and user is valid KYC user`,async (done) => {
        const productName = productArr[Math.floor(Math.random()*productArr.length)].productName;
        const productDoc = await Product.findOne({productName}).exec();
        const kycUsers = await User.find({'userKyc.status': 'Completed'}).exec();
        const productCategory = await Category.findOne({categoryName: productDoc.productName}).exec();
        const expectedFaqs = await getFaqsFromCategory(productCategory);
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
        const nonKycUsers = await User.find({'userKyc.status': 'Not completed'}).populate('faqs').exec();
        const productCategory = await Category.findOne({categoryName: productDoc.productName}).exec();
        const expectedFaqs = (await fetchUserKycFaqs(nonKycUsers[0])).concat(await getFaqsFromCategory(productCategory));
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