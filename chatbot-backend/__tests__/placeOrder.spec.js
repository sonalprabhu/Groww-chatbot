const {app} = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const { Order } = require('../models/order');
const { User} = require('../models/user');
const { Product } = require('../models/product');

describe("Testing '/placeOrder' API",()=> {

    it(`tests '/placeOrder'`,async (done)=>{
        const sampleUser = await User.findOne({}).exec();
        const sampleProduct = await Product.findOne({}).exec();
        const response = await supertest(app).post(`/placeOrder`).query({
            user: sampleUser._id.toString(),
        }).send({
            orderDate: "20/03/2021",
            category:  sampleProduct.productCategory,
            products: [sampleProduct._id.toString()],
            units: [1],
        });
        const newOrderId = response.body.orderId;
        const updateUserPromise = (userId,orderId)=> {
            return new Promise((resolve,reject)=> {
                User.updateOne({_id: userId},{$pull: {userOrders: orderId}}).exec().then((res)=>{
                    resolve({
                        ...res
                    })
                }).catch((err)=>{
                    reject({
                        ...err
                    })
                })
            })
        }
        await updateUserPromise(sampleUser._id,newOrderId);
        await Order.deleteOne({_id: newOrderId}).exec();
        expect(response.status).toBe(201);
        expect(response.type).toBe('application/json');
        done();
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
});