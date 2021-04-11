const {app} = require('../app');
const {productResponseMap} = require("../api_config/ResponseMapper");
const supertest = require('supertest');
const mongoose = require('mongoose');
const { Product } = require('../models/product');

describe("Testing '/getProductDetails' API",()=> {

    it(`tests '/getProductDetails' , valid product id`,async (done)=>{
        const validProducts = await Product.find({}).exec();
        let sampleProduct = validProducts[Math.floor(Math.random()*validProducts.length)];
        sampleProduct = {...sampleProduct.toJSON(),_id: sampleProduct._id.toString()};
        const response = await supertest(app).get(`/getProductDetails/${sampleProduct._id}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(productResponseMap(sampleProduct,sampleProduct.productCategory));
        done();
    });

    it(`tests '/getProductDetails' , invalid product id`,async (done)=>{
        const response = await supertest(app).get(`/getProductDetails/invalidid`);
        expect(response.status).toBe(404);
        done();
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
});