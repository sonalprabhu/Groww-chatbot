const {Category} = require('../models/category');
const {User} = require('../models/user');
const {app} = require('../app');
const {getFaqsFromCategory} = require("../api_config/ResponseMapper");
const supertest = require('supertest');
const mongoose = require('mongoose');

describe("Testing '/user-account-questions' API",()=> {

    it(`tests '/user-account-questions' and user is valid`,async (done) => {
        const validUser = await User.findOne({}).exec();
        const myAccountCategory = await Category.findOne({categoryName: 'My Account'}).exec();
        const expectedFaqs = await getFaqsFromCategory(myAccountCategory);
        const response = await supertest(app).get('/user-account-questions').query({
            user: validUser._id.toString(),
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });


    it(`tests '/user-account-questions' and user is invalid`,async (done) => {
        const response = await supertest(app).get('/user-account-questions').query({
            user: 'some random user',
        });
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/user-account-questions' and user is empty`,async (done) => {
        const response = await supertest(app).get('/user-account-questions');
        expect(response.status).toBe(404);
        done();
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
});