const {app} = require('../app');
const {productResponseMap} = require("../api_config/ResponseMapper");
const supertest = require('supertest');
const mongoose = require('mongoose');
const { Order } = require('../models/order');
const { User} = require('../models/user');

describe("Testing '/getOrderDetails' API",()=> {

    it(`tests '/getOrderDetails' , valid order id and a valid user id`,async (done)=>{
        const allOrders = await Order.find({}).exec();
        let sampleOrder = await Order.populate(allOrders[Math.floor(Math.random()*allOrders.length)],{path: 'productDocs'});
        sampleOrder = sampleOrder.toJSON();
        const products = productResponseMap(sampleOrder.productDocs,sampleOrder.category);
        delete sampleOrder.productDocs;
        const sampleUser = sampleOrder.userId.toString();
        delete sampleOrder.userId;
        sampleOrder = {...sampleOrder,_id: sampleOrder._id.toString(),products: products};
        const response = await supertest(app).get(`/getOrderDetails/${sampleOrder._id}`).query({
            user: sampleUser,
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(sampleOrder);
        done();
    });

    it(`tests '/getOrderDetails' , invalid order id and a valid user Id`,async (done)=>{
        const sampleUser = await User.findOne({}).exec();
        const response = await supertest(app).get(`/getOrderDetails/invalidid`).query({
            user: sampleUser._id.toString(),
        });
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/getOrderDetails' , invalid order id and invalid user Id`,async (done)=>{
        const response = await supertest(app).get(`/getOrderDetails`).query({
            user: 'some random user',
        });
        expect(response.status).toBe(404);
        done();
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
});