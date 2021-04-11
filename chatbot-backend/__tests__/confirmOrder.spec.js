const {app} = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const { Order } = require('../models/order');

describe("Testing '/confirmOrder' API",()=> {

    it(`tests '/confirmOrder'`,async (done)=>{
        const samplePendingOrder = await Order.findOne({orderStatus: 'Pending'}).exec();
        const response = await supertest(app).patch(`/confirmOrder`).query({
            user: samplePendingOrder.userId.toString(),
        }).send({
            orderDate: "25/03/2021",
            orderId: samplePendingOrder._id.toString(),
        });
        const fetchOrderAgain = await Order.findById(samplePendingOrder._id.toString()).exec();
        expect(fetchOrderAgain.orderStatus).toBe('Completed');
        expect(response.status).toBe(204);
        done();
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
});