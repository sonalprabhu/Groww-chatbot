const {app} = require('../app');
const {productResponseMap} = require("../api_config/ResponseMapper");
const supertest = require('supertest');
const mongoose = require('mongoose');
const { Product } = require('../models/product');

describe("Testing '/getAllProducts' API",()=> {

    it(`tests '/getAllProducts' , valid category`,async (done)=>{
        const validProductCategories = ['Stocks','Mutual Funds','FDs','Gold'];
        const sampleCategory = validProductCategories[Math.floor(Math.random()*validProductCategories.length)];
        let products = await Product.find({productCategory: sampleCategory}).exec();
        products = products.map((p)=>{
            return {...p.toJSON(),_id: p._id.toString()};
        });
        const response = await supertest(app).get(`/getAllProducts`).query({
            category: sampleCategory,
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(productResponseMap(products,sampleCategory));
        done();
    });

    it(`tests '/getAllProducts' , invalid category`,async (done)=>{
        const response = await supertest(app).get(`/getAllProducts`).query({
            category: 'some random category',
        });
        expect(response.status).toBe(404);
        done();
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
});