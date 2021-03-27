const {Faq} = require('../models/faqs');
const {User} = require('../models/user');
const {Order} = require('../models/order');
const {Product} = require('../models/product');
const {Category} = require('../models/category');
const {populateBackend} = require('../populate_backend');
const {getAnswerDynamicQuestion} = require('../dynamic_answer_mapper');
const {app,fetchUserKycFaqs} = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');

describe("Testing backend APIs",()=> {

    /**tests for '/search-on-category' begins*/
    it(`tests '/search-on-category' and categoryName as 'Mutual Funds'`,async (done)=>{
        const response = await supertest(app).get('/search-on-category').query({
            categoryName: 'Mutual Funds'
        });
        expect(response.status).toBe(200);
        done();
    });

    it(`tests '/search-on-category' and categoryName as 'Stocks'`,async (done)=>{
        const response = await supertest(app).get('/search-on-category').query({
            categoryName: 'Stocks'
        });
        expect(response.status).toBe(200);
        done();
    });

    it(`tests '/search-on-category' and categoryName as 'Gold'`,async (done)=>{
        const response = await supertest(app).get('/search-on-category').query({
            categoryName: 'Gold'
        });
        expect(response.status).toBe(200);
        done();
    });

    it(`tests '/search-on-category' and categoryName as 'FDs'`,async (done)=>{
        const response = await supertest(app).get('/search-on-category').query({
            categoryName: 'FDs'
        });
        expect(response.status).toBe(200);
        done();
    });

    it(`tests '/search-on-category' and categoryName to be empty`,async (done)=>{
        const response = await supertest(app).get('/search-on-category');
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/search-on-category' and categoryName as invalid category`,async (done)=>{
        const response = await supertest(app).get('/search-on-category').query({
            categoryName: 'some random category'
        });
        expect(response.status).toBe(404);
        done();
    });
    /**tests for search-on-category ends*/

    /**tests for user-specific-order-details starts */
    it(`tests '/user-specific-order-details' and a valid userId from DB`,async (done)=>{
        let sampleUsers = await User.find().exec();
        const response = await supertest(app).get('/user-specific-order-details').query({
            user: sampleUsers[0]._id.toString()
        });
        expect(response.status).toBe(200);
        done();
    });

    it(`tests '/user-specific-order-details' and an invalid userId`,async (done)=>{

        const response = await supertest(app).get('/user-specific-order-details').query({
            user: 'some random id'
        });
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/user-specific-order-details' and an empty userId`,async (done)=>{

        const response = await supertest(app).get('/user-specific-order-details');
        expect(response.status).toBe(404);
        done();
    });
    /**tests for user-specific-order-details ends*/

    /**tests for /user-account-questions starts */
    it(`tests '/user-account-questions' and a valid userId from DB`,async (done)=>{
        
        let sampleUsers = await User.find().exec();
        const response = await supertest(app).get('/user-account-questions').query({
            user: sampleUsers[0]._id.toString()
        });
        expect(response.status).toBe(200);
        done();
    });

    it(`tests '/user-account-questions' and an invalid userId`,async (done)=>{
        
        const response = await supertest(app).get('/user-account-questions').query({
            user: 'some random id'
        });
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/user-account-questions' and an empty userId`,async (done)=>{
        
        const response = await supertest(app).get('/user-account-questions').query();
        expect(response.status).toBe(404);
        done();
    });
    /**tests for /user-account-questions ends*/

    /**tests for /product-specific-questions starts*/
    it(`tests '/product-specific-questions', valid non-KYC user, valid product, product not in previous orders`,async (done)=>{
        const sampleUser = await User.findOne({'userKyc.status':'Not completed'}).exec();
        let sampleProducts = await Product.find().exec();
        for(const orderId of sampleUser.userOrders){//virtual fields to be used here
            const order = await Order.findById(orderId).exec();
            sampleProducts = sampleProducts.filter((sp)=>{
                const filterOrderProducts = order.products.filter((pId)=>pId.toString()===sp._id.toString());
                return filterOrderProducts.length === 0;
            });
        };
        const sampleProduct = sampleProducts[0];
        const response = await supertest(app).get('/product-specific-questions').query({
            user: sampleUser._id.toString(),
            product: sampleProduct._id.toString()
        });
        let expectedFaqs = new Set();
        for(const productFaqId of sampleProduct.faqId){//virtual fields to be used here
            let faqFetched = await Faq.findById(productFaqId).exec();
            if(faqFetched.faqCategoryPath[faqFetched.faqCategoryPath.length-1] === (sampleProduct.productName+' General'))
                expectedFaqs.add({QuestionId: faqFetched._id.toString(),QuestionText: faqFetched.faqQuestionText});
        }
        const userKycFaqs = await fetchUserKycFaqs(sampleUser._id.toString());
        expectedFaqs = [...expectedFaqs];
        if(userKycFaqs.length !==0)
            expectedFaqs = userKycFaqs.concat(expectedFaqs);

        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/product-specific-questions', valid KYC user, valid product, product not in previous orders`,async (done)=>{
        const sampleUser = await User.findOne({'userKyc.status':'Completed'}).exec();
        let sampleProducts = await Product.find().exec();
        for(const orderId of sampleUser.userOrders){//virtual fields to be used here
            const order = await Order.findById(orderId).exec();
            sampleProducts = sampleProducts.filter((sp)=>{
                const filterOrderProducts = order.products.filter((pId)=>pId.toString()===sp._id.toString());
                return filterOrderProducts.length === 0;
            });
        };
        const sampleProduct = sampleProducts[0];
        const response = await supertest(app).get('/product-specific-questions').query({
            user: sampleUser._id.toString(),
            product: sampleProduct._id.toString()
        });
        let expectedFaqs = new Set();
        for(const productFaqId of sampleProduct.faqId){//virtual fields to be used here
            let faqFetched = await Faq.findById(productFaqId).exec();
            if(faqFetched.faqCategoryPath[faqFetched.faqCategoryPath.length-1] === (sampleProduct.productName+' General'))
                expectedFaqs.add({QuestionId: faqFetched._id.toString(),QuestionText: faqFetched.faqQuestionText});
        }
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual([...expectedFaqs]);
        done();
    });

    it(`tests '/product-specific-questions', valid non-KYC user, valid product, product in previous orders`,async (done)=>{
        
        const sampleUser = await User.findOne({'userKyc.status':'Not completed'}).exec();
        const sampleOrder = await Order.findById(sampleUser.userOrders[0]).exec();
        const sampleProduct = await Product.findById(sampleOrder.products[0]).exec();

        const response = await supertest(app).get('/product-specific-questions').query({
            user: sampleUser._id.toString(),
            product: sampleProduct._id.toString()
        });
        let expectedFaqs = new Set();
        for(const productFaqId of sampleProduct.faqId){//virtual fields to be used here
            let faqFetched = await Faq.findById(productFaqId).exec();
            expectedFaqs.add({QuestionId: faqFetched._id.toString(),QuestionText: faqFetched.faqQuestionText});
        }
        const userKycFaqs = await fetchUserKycFaqs(sampleUser._id.toString());
        expectedFaqs = [...expectedFaqs];
        if(userKycFaqs.length !==0)
            expectedFaqs = userKycFaqs.concat(expectedFaqs);

        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/product-specific-questions', valid KYC user, valid product, product in previous orders`,async (done)=>{
        
        const sampleUser = await User.findOne({'userKyc.status':'Completed'}).exec();
        const sampleOrder = await Order.findById(sampleUser.userOrders[0]).exec();
        const sampleProduct = await Product.findById(sampleOrder.products[0]).exec();

        const response = await supertest(app).get('/product-specific-questions').query({
            user: sampleUser._id.toString(),
            product: sampleProduct._id.toString()
        });
        let expectedFaqs = new Set();
        for(const productFaqId of sampleProduct.faqId){//virtual fields to be used here
            let faqFetched = await Faq.findById(productFaqId).exec();
            expectedFaqs.add({QuestionId: faqFetched._id.toString(),QuestionText: faqFetched.faqQuestionText});
        }
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual([...expectedFaqs]);
        done();
    });

    it(`tests '/product-specific-questions', valid KYC user, invalid product`,async (done)=>{
        
        const sampleUser = await User.findOne({'userKyc.status':'Completed'}).exec();
        const response = await supertest(app).get('/product-specific-questions').query({
            user: sampleUser._id.toString(),
            product: 'some random id'
        });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
        done();
    });

    it(`tests '/product-specific-questions', valid KYC user, no product`,async (done)=>{
        
        const sampleUser = await User.findOne({'userKyc.status':'Completed'}).exec();
        const response = await supertest(app).get('/product-specific-questions').query({
            user: sampleUser._id.toString()
        });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
        done();
    });

    it(`tests '/product-specific-questions', valid non-KYC user, invalid product`,async (done)=>{
        
        const sampleUser = await User.findOne({'userKyc.status':'Not completed'}).exec();
        const response = await supertest(app).get('/product-specific-questions').query({
            user: sampleUser._id.toString(),
            product: 'some random id'
        });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
        done();
    });

    it(`tests '/product-specific-questions', valid non-KYC user, no product`,async (done)=>{
        
        const sampleUser = await User.findOne({'userKyc.status':'Not completed'}).exec();
        const response = await supertest(app).get('/product-specific-questions').query({
            user: sampleUser._id.toString()
        });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
        done();
    });

    it(`tests '/product-specific-questions', invalid user, valid product`,async (done)=>{
        
        const sampleProducts = await Product.find().exec();
        const sampleProduct = sampleProducts[0];
        const response = await supertest(app).get('/product-specific-questions').query({
            user: 'some random id',
            product: sampleProduct._id.toString(),
        });
        let expectedFaqs = new Set();
        for(const productFaqId of sampleProduct.faqId){
            let faqFetched = await Faq.findById(productFaqId).exec();
            if(faqFetched.faqCategoryPath[faqFetched.faqCategoryPath.length-1] === (sampleProduct.productName+' General'))
                expectedFaqs.add({QuestionId: faqFetched._id.toString(),QuestionText: faqFetched.faqQuestionText});
        }
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual([...expectedFaqs]);
        done();
    });

    it(`tests '/product-specific-questions', no user, valid product`,async (done)=>{
        
        const sampleProducts = await Product.find().exec();
        const sampleProduct = sampleProducts[0];
        const response = await supertest(app).get('/product-specific-questions').query({
            product: sampleProduct._id.toString(),
        });
        let expectedFaqs = new Set();
        for(const productFaqId of sampleProduct.faqId){
            let faqFetched = await Faq.findById(productFaqId).exec();
            if(faqFetched.faqCategoryPath[faqFetched.faqCategoryPath.length-1] === (sampleProduct.productName+' General'))
                expectedFaqs.add({QuestionId: faqFetched._id.toString(),QuestionText: faqFetched.faqQuestionText});
        }
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual([...expectedFaqs]);
        done();
    });

    it(`tests '/product-specific-questions', no user, invalid product`,async (done)=>{
        
        const response = await supertest(app).get('/product-specific-questions').query({
            product: 'some random id',
        });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
        done();
    });

    it(`tests '/product-specific-questions', no user, no product`,async (done)=>{
        
        const response = await supertest(app).get('/product-specific-questions');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
        done();
    });

    /** tests for /product-specific-questions ends*/


    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
});