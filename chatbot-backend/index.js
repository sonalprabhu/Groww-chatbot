require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const {Faq} = require('./models/faqs');
const {User} = require('./models/user');
const {Order} = require('./models/order');
const {Product} = require('./models/product');
const {Category} = require('./models/category');
const {populateBackend} = require('./populate_backend');
const app = express();

const PORT = process.env.PORT_NO || 8081;//default port set to 8081
//put ur MONGODB_URI in .env
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true,useUnifiedTopology: true});

mongoose.connection.once('open',async () => {
    console.log('connected to mongodb');
    populateBackend();//this function call to be used only when db clean up or refilling of data required.
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

async function fetchUserKycFaqs(userId){
    let userKycFaqs = new Set();
    try{
        if(userId !== null){
            let userObj = await User.findById(userId).exec();
            if(userObj !== null && userObj !== undefined){
                if(userObj.userKyc.status !== 'Completed'){
                    let kycFaqs = await Faq.find({faqCategoryPath: {$all: ['My Account','KYC']}}).exec();
                    for(const faq of kycFaqs){
                        userKycFaqs.add({QuestionId: faq._id,QuestionText: faq.faqQuestionText});
                    }
                }
            }
        }
    }
    catch(err){
        //do nothing
    }
    finally{
        return [...userKycFaqs];
    }
}

app.get('/',()=>{
    console.log('Welcome to Groww pilot backend');
});


app.get('/search-on-category',async (req,res)=>{
    const categoryName = req.query.categoryName;
    const userId = req.query.user;
    if(categoryName === null || categoryName === undefined){
        res.sendStatus(404);
    }
    else{
        try
        {
            let faqsFetched =  await Faq.find({faqCategoryPath: categoryName}).exec();
            if(faqsFetched === null || faqsFetched === undefined){
                res.sendStatus(404);
            }
            else{
                let response = faqsFetched.map((faq)=> {
                    return ({QuestionId: faq._id,QuestionText: faq.faqQuestionText});
                });
                let userKycFaqs = await fetchUserKycFaqs(userId);
                if(userKycFaqs.length !== 0)
                    response = userKycFaqs.concat(response);
                res.status(200).json(response);
            }
        }
        catch(err){
            res.sendStatus(404);
        }
    }
});

app.get('/user-specific-order-details',async (req,res)=>{
    let userId = req.query.user;
    if(userId === null || userId === undefined){
        res.sendStatus(404);
    }
    else{
        try{
            let user = await User.findById(userId).exec();
            if(user === null || user === undefined)
                res.sendStatus(404);
            else{
                let faqs = new Set();
                let faqFetchedOrdersGeneral = await Faq.find({faqCategoryPath: {$all: ['Orders','General']}}).exec();
                for(const faq of faqFetchedOrdersGeneral){
                    faqs.add({QuestionId: faq._id,QuestionText: faq.faqQuestionText});
                }
                let userKycFaqs = await fetchUserKycFaqs(userId);
                faqs = [...faqs];
                if(userKycFaqs.length !==0)
                    faqs = userKycFaqs.concat(faqs);
                res.status(200).json(faqs);
            }
        }
        catch(err){
            res.sendStatus(404);
        }
    }   
});


app.get('/user-account-questions',async (req,res)=> {
    let userId = req.query.user;
    if(userId === null || userId === undefined){
        res.sendStatus(404);
    }
    else{
        try{
            let faqs = new Set();
            let user = await User.findById(userId).exec();
            if(user === null || user === undefined){
                res.sendStatus(404);
            }
            else{
                for(const userAccountFaqId of user.faqId){
                    let faqFetched = await Faq.findById(userAccountFaqId).exec();
                    faqs.add({QuestionId: faqFetched._id,QuestionText: faqFetched.faqQuestionText});
                }
                faqs = [...faqs];
                res.status(200).json(faqs);
            }
        }
        catch(err){
            res.sendStatus(404);
        }
    }
});
//Read the TODO for this API. This is the alpha version of this API.
app.get('/product-specific-questions',async (req,res)=>{
    let userId = req.query.user; //TODO: used for previous order dynamic questions/answers
    let productId = req.query.product;
    if(productId === null || productId === undefined){
        res.sendStatus(404);
    }
    else{
        try{
            let faqs = new Set();
            let product = await Product.findById(productId).exec();
            if(product === null || product === undefined){
                res.sendStatus(404);
            }
            else{
                for(const productFaqId of product.faqId){
                    let faqFetched = await Faq.findById(productFaqId).exec();
                    faqs.add({QuestionId: faqFetched._id,QuestionText: faqFetched.faqQuestionText});
                }
                let userKycFaqs = await fetchUserKycFaqs(userId);
                faqs = [...faqs];
                if(userKycFaqs.length !==0)
                    faqs = userKycFaqs.concat(faqs);
                res.status(200).json(faqs);
            }
        }
        catch(err){
            res.sendStatus(404);
        }
    } 
});

app.get('/order-specific-questions',async (req,res)=>{
    let userId = req.query.user;
    let orderId = req.query.order;
    if(userId === null || orderId === null){
        res.sendStatus(404);
    }
    else{
        try{
            let faqs = new Set();
            let user = await User.findById(userId).exec();
            if(user === null || user === undefined){
                res.sendStatus(404);
            }
            else{
                let checkOrderPresent = user.userOrders.find((userOrderId)=>(userOrderId.toString() === orderId));
                if(checkOrderPresent !== null && checkOrderPresent !== undefined){
                    let order = await Order.findById(orderId).exec();
                    for(const faqFetchedId of order.faqId){
                        let faq = await Faq.findById(faqFetchedId).exec();
                        faqs.add({QuestionId: faq._id,QuestionText: faq.faqQuestionText});
                    }
                    let userKycFaqs = await fetchUserKycFaqs(userId);
                    faqs = [...faqs];
                    if(userKycFaqs.length !==0)
                        faqs = userKycFaqs.concat(faqs);
                    res.status(200).json(faqs);
                }
                else{
                    res.sendStatus(404);
                }
            }
        }
        catch(err){
            res.sendStatus(404);
        }
    }
});

app.get('/get-answer-by-questionId/:questionId',async (req,res)=>{
    const questionId = req.params.questionId.toString();
    if(questionId === null || questionId === undefined){
        res.sendStatus(404);
    }
    else{
        try{
            let faq = await Faq.findById(questionId).exec();
            if(faq !== null && faq !== undefined){
                res.status(200).json({Answer: faq.faqAnswerText});
            }
            else{
                res.sendStatus(404);
            }
        }
        catch(err){
            res.sendStatus(404);
        }
    }
});

app.get('/get-all-categories',async (req,res)=> {
    const categoryId = req.query.id;
    const userId = req.query.user;
    if(categoryId === null || categoryId === undefined){
        let allCategories = [];
        try{
            let user = await User.findById(userId).exec();
            if(user === null || user === undefined){
                throw new Error('Invalid user details');
            }
            let rootCategory = await Category.findOne({categoryName: 'root'}).exec();
            for(const subCategoryId of rootCategory.subCategoryId){
                let subCategory = await Category.findById(subCategoryId).exec();
                if(subCategory.categoryName !== 'Orders' && subCategory.categoryName !=='Products'){
                    allCategories.push({
                        categoryId: subCategory._id,
                        Name: subCategory.categoryName,
                        hasSubCategory: subCategory.hasSubCategory,
                    })
                }
            }
        }
        catch(err){
            let rootCategory = await Category.findOne({categoryName: 'root'}).exec();
            for(const subCategoryId of rootCategory.subCategoryId){
                let subCategory = await Category.findById(subCategoryId).exec();
                if(subCategory.categoryName !== 'Orders' && subCategory.categoryName !=='Products' && subCategory.categoryName !=='My Account'){
                    allCategories.push({
                        categoryId: subCategory._id,
                        Name: subCategory.categoryName,
                        hasSubCategory: subCategory.hasSubCategory,
                    })
                }
            }
        }
        finally{
            res.status(200).json(allCategories);
        }
    }
    else{
        try{
            let category = await Category.findById(categoryId).exec();
            let allSubCategories = [];
            for(const subCategoryIds of category.subCategoryId){
                let subCategory = await Category.findById(subCategoryIds).exec();
                allSubCategories.push({
                    categoryId: subCategory._id,
                    Name: subCategory.categoryName,
                    hasSubCategory: subCategory.hasSubCategory,
                })
            }
            res.status(200).json(allSubCategories);
        }
        catch(err){
            res.sendStatus(404);
        }
    }
});
app.get('/get-question-by-category/:categoryId',async (req,res)=>{
    const categoryId = req.params.categoryId.toString();
    if(categoryId === null || categoryId === undefined){
        res.sendStatus(404);
    }
    else{
        try{
            let category = await Category.findById(categoryId).exec();
            let faqs = new Set();
            for(const faqId of category.faqId){
                let faq = await Faq.findById(faqId).exec();
                faqs.add({QuestionId: faq._id,QuestionText: faq.faqQuestionText});
            }
            res.status(200).json([...faqs]);
        }
        catch(err){
            res.sendStatus(404);
        }
    }
})

app.listen(PORT,()=>{
    console.log(`Server listening at port ${PORT}`);
});