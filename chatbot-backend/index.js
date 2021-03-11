require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const {Faq} = require('./models/faqs');
const {User} = require('./models/user');
const {Order} = require('./models/order');
const {Product} = require('./models/product');
//const {addFaqs,addUsers,addProducts,addOrders,linkUsersToOrders} = require('./fill_data_db');
const app = express();
//put ur MONGODB_URI in .env
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true,useUnifiedTopology: true});

mongoose.connection.once('open',async () => {
    console.log('connected to mongodb');
    // let faqsAdded = await addFaqs();
    // let usersAdded = await addUsers();
    // let productsAdded = await addProducts();
    // let ordersAdded = await addOrders();
    // let userLinkedWithOrders = await linkUsersToOrders();
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
                    let kycFaqs = await Faq.find({faqQuestionCategory: 'My Account',faqQuestionSubCategoryL1: 'KYC'}).exec();
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
    if(categoryName === null){
        res.sendStatus(404);
    }
    else{
        try
        {
            let faqsFetched =  await Faq.find({faqQuestionCategory: categoryName}).exec();
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
    if(userId === null){
        res.sendStatus(404);
    }
    else{
        try{
            let user = await User.findById(userId).exec();
            if(user === null || user === undefined)
                res.sendStatus(404);
            else{
                let faqs = new Set();
                let faqFetchedOrdersGeneral = await Faq.find({faqQuestionCategory: 'Orders',faqQuestionSubCategoryL1: 'General'}).exec();
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
    if(userId === null){
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
    if(productId === null){
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
            console.error(err);
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
                        if(faq.faqQuestionSubCategoryL1 !== 'General'){
                            faqs.add({QuestionId: faq._id,QuestionText: faq.faqQuestionText});
                        }
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
})
//Chatbot specific APIs
// app.post('/getAllQuestions',async (req,res)=>{
//     const context = await req.body.context;
//     let questions = new Set();
//     if(context.userId !== null){
//         User.findById(userId,async function(err,userFound){
//             if(err){
//                 res.sendStatus(404);
//             }
//             else{
//                 if(userFound.userKyc.status !== 'Completed'){
//                     await Question.find({$and: [{questionCategory: 'my-account'},{questionSubCategoryL1: 'ma-kyc'}]},async function(err,questionsFound){
//                         if(!err){
//                             await questionsFound.forEach((question)=>{
//                                 questions.add(question.questionText);
//                             });
//                         }
//                     });
//                 }
//                 if(context.orders !== null && context.orders.length !== 0){
//                     await context.orders.forEach(async (order)=>{
//                         await Order.findById(order.orderId,async function(err,orderFound){
//                             if(!err){
//                                 await orderFound.questionId.forEach(async (questionId)=>{
//                                     await Question.findById(questionId,async function(err,questionFound){
//                                         if(!err){
//                                             await questions.add(questionFound.questionText);
//                                         }
//                                     })
//                                 });
//                             }
//                         })
//                     })
//                 }
//                 if(context.productId !== null){
//                     await Product.findById(productId).exec(async function(err,productFound){
//                         if(!err){
//                             await productFound.questionId.forEach(async (qId)=>{
//                                 Question.findById(qId, async function(err,questionFound){
//                                     if(!err){
//                                         questions.add(questionFound.questionText);
//                                     }
//                                 })
//                             })
//                         }
//                     })
//                 }
//             }
//         })
//     }
//     if(context.pageId !== null){
//         await Page.findById(pageId).exec(async function(err,pageFound){
//             if(!err){
//                 await pageFound.questionId.forEach(async (qId)=>{
//                     Question.findById(qId, async function(err,questionFound){
//                         if(!err){
//                             questions.add(questionFound.questionText);
//                         }
//                     })
//                 })
//             }
//         })
//     }
//     if(questions.size === 0){
//         res.sendStatus(404);
//     }
//     else{
//         res.status(200).json(questions);
//     }
// })

// app.post('/getAnswerToQuestion',async (req,res)=> {
//     let context = req.body.context;
//     let questionAsked = req.body.question;
//     if(context.userId !== null){
//         await Answer.findOne({questionId: questionAsked._id}).exec(async function(err,answerFound){
//             if(err){
//                 res.sendStatus(404);
//             }
//             else{
//                 res.status(200).json(answerFound.answerText);
//             }
//         })
//     }
//     else{
//         res.status(404);
//     }
// })

app.listen(8081,()=>{
    console.log('Server listening at port 8081');
});