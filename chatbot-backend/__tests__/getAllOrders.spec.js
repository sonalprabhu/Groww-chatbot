const {app,productResponseMap} = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const { Order } = require('../models/order');
const { User} = require('../models/user');

describe("Testing '/getAllOrders' API",()=> {

    it(`tests '/getAllOrders' , valid category and a valid user`,async (done)=>{
        const allUsers = await User.find({}).populate('userOrdersDocs').exec();
        const sampleUser = allUsers[Math.floor(Math.random()*allUsers.length)];
        let sampleOrderList = sampleUser.userOrdersDocs.filter((order)=>order.category === sampleUser.userOrdersDocs[0].category);
        let answers = [];
        for(let order of sampleOrderList){
            order = await Order.populate(order,{path: 'productDocs'});
            order = order.toJSON();
            const products = productResponseMap(order.productDocs,order.category);
            delete order.productDocs;
            delete order.faqId;
            delete order.userId;
            answers.push({...order,_id: order._id.toString(),products: products});
        }
        const response = await supertest(app).get(`/getAllOrders`).query({
            category: sampleUser.userOrdersDocs[0].category,
            user: sampleUser._id.toString(),
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(answers);
        done();
    });

    it(`tests '/getAllOrders' , invalid category and a valid user`,async (done)=>{
        const sampleUser = await User.findOne({}).exec();
        const response = await supertest(app).get(`/getAllOrders`).query({
            category: 'some random category',
            user: sampleUser._id.toString(),
        });
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/getAllOrders' , invalid category and a invalid user`,async (done)=>{
        const response = await supertest(app).get(`/getAllOrders`).query({
            category: 'some random category',
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