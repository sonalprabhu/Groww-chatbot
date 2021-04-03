const {app} = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const { Order } = require('../models/order');
const { User} = require('../models/user');
const { Product } = require('../models/product');

describe("Testing '/cancelOrder' API",()=> {

    it(`tests '/cancelOrder'`,async (done)=>{
        const sampleCompletedOrder = await Order.findOne({orderStatus: 'Completed'}).exec();
        const response = await supertest(app).patch(`/cancelOrder`).query({
            user: sampleCompletedOrder.userId.toString(),
        }).send({
            orderDate: "12/12/2022",
            orderId: sampleCompletedOrder._id.toString(),
        });
        const fetchOrderAgain = await Order.findById(sampleCompletedOrder._id.toString()).exec();
        expect(fetchOrderAgain.orderStatus).toBe('Cancelled');
        expect(response.status).toBe(204);
        done();
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
});