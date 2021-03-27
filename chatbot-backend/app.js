require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const Iron = require('@hapi/iron');
const cors = require('cors');
const mongoose = require('mongoose');
const {Faq} = require('./models/faqs');
const {User} = require('./models/user');
const {Order} = require('./models/order');
const {Product} = require('./models/product');
const {Category} = require('./models/category');
const {populateBackend} = require('./populate_backend');
const {getAnswerDynamicQuestion} = require('./dynamic_answer_mapper');
const app = express();

const PORT = process.env.PORT_NO || 8081;//default port set to 8081
//put ur MONGODB_URI in .env
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true,useUnifiedTopology: true});

mongoose.connection.once('open',async () => {
    console.log('connected to mongodb');
    //populateBackend();//this function call to be used only when db clean up or refilling of data required.
});
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());


async function fetchUserKycFaqs(userId){
    let userKycFaqs = new Set();
    try{
        if(userId !== null){
            let userObj = await User.findById(userId).exec();
            if(userObj !== null && userObj !== undefined){
                if(userObj.userKyc.status !== 'Completed'){
                    let kycFaqs = await Faq.find({faqCategoryPath: {$all: ['My Account','KYC']}}).exec();
                    for(const faq of kycFaqs){
                        userKycFaqs.add({QuestionId: faq._id.toString(),QuestionText: faq.faqQuestionText});
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
async function checkProductPreviousOrders(userDoc,productDoc){
    for(const orderId of userDoc.userOrders){
        const orderObj = await Order.findById(orderId).exec();
        const findMatchingProducts = orderObj.products.filter((pId)=>pId.toString()===productDoc._id.toString());
        if(findMatchingProducts.length!==0){
            return true;
        }
    }
    return false;
}

function productResponseMap(products,category){//all response mappers will be in a different file.
    let filteredProducts = (products instanceof Array)?[]:{};
    switch(category){
        case 'Stocks':
            {
                if(products instanceof Array){
                    filteredProducts = products.map((p)=>{
                        const {faqId,productPrice,...fp} = p;
                        const {_id,...productPriceExceptId} = p.productPrice.stockPrice;
                        return {...fp,productPrice: {stockPrice: productPriceExceptId}} 
                    });
                }
                else{
                    const {faqId,productPrice,...fp} = products;
                    const {_id,...productPriceExceptId} = products.productPrice.stockPrice;
                    filteredProducts = {...fp,productPrice: {stockPrice: productPriceExceptId}};
                }  
            };
            break;
        case 'Mutual Funds':
            {
                if(products instanceof Array){
                    filteredProducts = products.map((p)=>{
                        const {faqId,productPrice,...fp} = p;
                        const {_id,...productPriceExceptId} = p.productPrice.fundReturns;
                        return {...fp,productPrice: {fundReturns: productPriceExceptId}};
                    }); 
                }
                else{
                    const {faqId,productPrice,...fp} = products;
                    const {_id,...productPriceExceptId} = products.productPrice.fundReturns;
                    filteredProducts = {...fp,productPrice: {fundReturns: productPriceExceptId}};
                } 
            };
            break;
        case 'FDs':
            {
                if(products instanceof Array){
                    filteredProducts = products.map((p)=>{
                        const {faqId,productPrice,...fp} = p;
                        const {_id,...productPriceExceptId} = p.productPrice.fd;
                        return {...fp,productPrice: {fd: productPriceExceptId}}
                    });
                }
                else{
                    const {faqId,productPrice,...fp} = products;
                    const {_id,...productPriceExceptId} = products.productPrice.fd;
                    filteredProducts = {...fp,productPrice: {fd: productPriceExceptId}};
                }  
            };
            break;
        case 'Gold':
            {
                if(products instanceof Array){
                    filteredProducts = products.map((p)=>{
                        const {faqId,productPrice,...fp} = p;
                        return {...fp,productPrice: {purity: p.productPrice.purity}};
                    });
                }
                else{
                    const {faqId,productPrice,...fp} = products;
                    filteredProducts = {...fp,productPrice: {purity: productPrice.purity}};
                } 
            };
            break;
        default:
            {
                //do nothing  
            }
    }
    return filteredProducts;
}

app.get('/',()=>{
    console.log('Welcome to Groww pilot backend');
});

/**Basic Routes */
app.get('/login',async (req,res)=>{
    try{
        let user = await User.findOne({$and: [{userName: req.query.userName},{userPass: req.query.userPass}]}).exec();
        if(user !== null && user !== undefined){
            const sealed = await Iron.seal(user,process.env.SESSION_SECRET,Iron.defaults);
            res.status(200).cookie(process.env.AUTH_TOKEN_NAME,sealed,{
                expires: new Date(Date.now()+900000),//available only for 15 minutes
                sameSite: 'lax',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
            }).json({userId: user._id,userName: user.userName});
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(err){
        console.log(err);
        res.sendStatus(404);
    }
});

app.get('/logout',async (req,res) => {
    try{
        res.status(200).clearCookie(process.env.AUTH_TOKEN_NAME).json({logout: true});
    }
    catch(err){
        res.status(401).json({logout: false});
    }
})

app.get('/checkAuth',async (req,res)=>{
    try{
        const sealed = req.cookies[process.env.AUTH_TOKEN_NAME];
        const userId = req.query.user;
        const unsealed = await Iron.unseal(sealed,process.env.SESSION_SECRET,Iron.defaults);
        const user = await User.findById(userId).exec();
        res.status((user._id.toString() === unsealed._id.toString())?200:401).json({auth: true});
    }
    catch(err){
        res.status(401).json({auth: false});
    }
});

app.get('/getUserDetails/:userId',async (req,res)=>{
   try{
       const userId = req.params.userId;
       const user = await User.findById(userId).exec();
       if(user === null || user === undefined){
           res.sendStatus(404);
       } 
       else{
           res.status(200).json({
               userName: user.userName,
               userDOB: user.userDOB,
               userMob: user.userMob,
               userMaritalStatus: user.userMaritalStatus,
               userGender: user.userGender,
           });
       }
   }
   catch(err){
       res.sendStatus(404);
   }
});

app.get('/getAllProducts',async (req,res)=>{
    let category = req.query.category;
    try{
        let products = await Product.find({productCategory: category}).exec();
        products = products.map((p)=>p.toJSON());
        if(products !== null && products !== undefined && products.length !==0){
            res.status(200).json(productResponseMap(products,category));
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(err){
        res.sendStatus(404);
    }
});

app.get('/getProductDetails/:productId',async (req,res)=>{
    let productId = req.params.productId;
    try{
        let product = await Product.findById(productId).exec();
        product= product.toJSON();
        if(product !== null && product !== undefined){
            //console.log(productResponseMap(product,product.productCategory));
            res.status(200).json(productResponseMap(product,product.productCategory));
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(err){
        res.sendStatus(404);
    }
});

app.get('/getAllOrders',async (req,res)=> {//user Id also required
    let category = req.query.category;
    let userId = req.query.user;
    try{
        const allOrders = await Order.find({$and: [{category},{userId}]}).exec();
        if(allOrders!==null && allOrders!==undefined && allOrders.length!==0){
            res.status(200).json(allOrders);//need to filter for fields to be returned
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(err){
        res.sendStatus(404);
    }
});

app.get('/getOrderDetails/:orderId',async (req,res) => {//user Id also required
    let orderId = req.params.orderId;
    let userId = req.query.user;
    try{
        let order = await Order.findOne({$and: [{_id: orderId},{userId}]}).exec();
        if(order !== null && order !== undefined){
            res.status(200).json(order);//need for the filter on the fileds to be returned
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(err){
        res.sendStatus(404);
    }
});

app.post('/placeOrder',async (req,res) => {//orderStatus will be in Not completed state

    const updateUserPromise = (userId,orderId)=> {
        return new Promise((resolve,reject)=> {
            User.updateOne({_id: userId},{$push: {userOrders: orderId}}).exec().then((res)=>{
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

    try{
        const userId = req.query.user;
        const user = await User.findById(userId).exec();
        if(user === null || user === undefined){
            res.sendStatus(404);
        }
        else{
            const orderFromFrontend = req.body;
            let faqsToBeLinked = await Faq.find({faqCategoryPath: {$all: ['Orders','Not completed']}}).exec();
            faqsToBeLinked = faqsToBeLinked.map((faq)=>faq._id);
            const newOrder = new Order({
                orderStatus: 'Not completed',
                faqId: faqsToBeLinked,
                userId,
                ...orderFromFrontend
            });
            const newOrderDoc = await newOrder.save();
            const linkOrderToUser = await updateUserPromise(userId,newOrderDoc._id);
            res.sendStatus(201);
        }
    }
    catch(err){
        res.sendStatus(404);
    }
})

app.patch('/confirmOrder',async (req,res)=>{

    const updateOrderPromise = (orderDetails,faqsToBeLinked)=> {
        return new Promise((resolve,reject)=>{
            Order.updateOne({_id: orderDetails.orderId},{$set: {orderStatus: 'Completed',orderDate: orderDetails.orderDate,faqId:faqsToBeLinked}}).exec().then((res)=>{
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

    try{
        const userId = req.query.user;
        const user = await User.findById(userId).exec();
        if(user === null || user === undefined){
            res.sendStatus(404);
        }
        else{
            const orderDetails = req.body;
            let faqsToBeLinked = await Faq.find({faqCategoryPath: {$all: ['Orders','Completed']}}).exec();
            faqsToBeLinked = faqsToBeLinked.map((faq)=>faq._id);
            let updateOrder = await updateOrderPromise(orderDetails,faqsToBeLinked);
            res.sendStatus(204);
        }
    }
    catch(err){
        res.sendStatus(404);

    }
});

app.delete('/cancelOrder/:orderId',async (req,res)=>{
    const updateOrdersUserPromise = (userId,orderId) => {
        return new Promise((resolve,reject)=>{
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
    try{
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId).exec();
        if(order === null || order === undefined){
            res.sendStatus(404);
        }
        else if(order.orderStatus === 'Completed'){
            res.sendStatus(403);
        }
        else{
            if(order.userId.toString() === req.query.user.toString()){
                const updateUserOrders = await updateOrdersUserPromise(order.userId,orderId);
                let deleteOrder = await Order.deleteOne({_id: orderId}).exec();
                res.sendStatus(200);
            }
            else{
                res.sendStatus(403);
            }
        }
    }
    catch(err){
        res.sendStatus(404);
    }
});

/**Chatbot Specific Routes */
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
            if(faqsFetched === null || faqsFetched === undefined || faqsFetched.length === 0){
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

app.get('/product-specific-questions',async (req,res)=>{
    let userId = req.query.user;
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
                try{
                    const user = await User.findById(userId).exec();
                    if(user !== null && user!== undefined){
                        const isLinkedWithPreviousOrders = await checkProductPreviousOrders(user,product);
                        if(isLinkedWithPreviousOrders){
                            for(const productFaqId of product.faqId){
                                let faqFetched = await Faq.findById(productFaqId).exec();
                                faqs.add({QuestionId: faqFetched._id.toString(),QuestionText: faqFetched.faqQuestionText});
                            }
                        }
                        else{
                            for(const productFaqId of product.faqId){
                                let faqFetched = await Faq.findById(productFaqId).exec();
                                if(faqFetched.faqCategoryPath[faqFetched.faqCategoryPath.length-1] === (product.productName+' General'))
                                    faqs.add({QuestionId: faqFetched._id.toString(),QuestionText: faqFetched.faqQuestionText});
                            }
                        }
                    }
                    else{
                        for(const productFaqId of product.faqId){
                            let faqFetched = await Faq.findById(productFaqId).exec();
                            if(faqFetched.faqCategoryPath[faqFetched.faqCategoryPath.length-1] === (product.productName+' General'))
                                faqs.add({QuestionId: faqFetched._id.toString(),QuestionText: faqFetched.faqQuestionText});
                        }
                    }
                }
                catch(err){
                    for(const productFaqId of product.faqId){
                        let faqFetched = await Faq.findById(productFaqId).exec();
                        if(faqFetched.faqCategoryPath[faqFetched.faqCategoryPath.length-1] === (product.productName+' General'))
                            faqs.add({QuestionId: faqFetched._id.toString(),QuestionText: faqFetched.faqQuestionText});
                    }
                }
                finally{
                    let userKycFaqs = await fetchUserKycFaqs(userId);
                    faqs = [...faqs];
                    if(userKycFaqs.length !==0)
                        faqs = userKycFaqs.concat(faqs);
                    res.status(200).json(faqs);
                }
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
    const context = req.query;
    console.log(context);
    if(questionId === null || questionId === undefined){
        res.sendStatus(404);
    }
    else{
        try{
            let faq = await Faq.findById(questionId).exec();
            if(faq !== null && faq !== undefined){
                if(faq.faqIsDynamic){
                    let answer = await getAnswerDynamicQuestion(faq.faqQuestionText,context);
                    if(answer === [] || answer === null || answer === undefined || answer.length===0){
                        throw new Error('Answer cannot be mapped');
                    }
                    res.status(200).json({Answer: answer});
                }
                else{
                    res.status(200).json({Answer: faq.faqAnswerText});
                }
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


exports.app = app
exports.fetchUserKycFaqs = fetchUserKycFaqs;