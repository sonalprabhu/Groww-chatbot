const {Faq} = require('../models/faqs');
const {User} = require('../models/user');
const {Order} = require('../models/order');
const {Product} = require('../models/product');
const {Category} = require('../models/category');
const {Admin} = require('../models/admin');
const {createCategoriesGraph} = require('./categoriesGraph');
const {faqArr,userArr,ordersArr,productArr,adminArr} = require('./data');
const Iron = require('@hapi/iron');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//DB seeding procedure for adding faqs after cleanup
async function addFaqs(){
    console.log('Deleting all the data in the faqs collection...');
    await Faq.deleteMany().exec();
    console.log('All faqs deleted. Total faq size '+faqArr.length+'...Adding faqs...');

    for(const faq of faqArr){
        const faqDecryptedQuestionAnswers = await Promise.all(faq.faqQuestionAnswer.map(async (questionAnswer)=>{
            const faqDynamicKeyEncrypted = await Iron.seal({'answerFunc': questionAnswer.faqDynamicKey},process.env.DYNAMIC_ANSWER_SECRET,Iron.defaults);
            return {...questionAnswer,faqDynamicKey: faqDynamicKeyEncrypted};
        }));
        const faqObj = new Faq({
            ...faq,
            faqQuestionAnswer: faqDecryptedQuestionAnswers
        });
        let faqSaved = await faqObj.save();
        console.log('Faq saved with id: '+faqSaved._id);
    }
    console.log('Faqs added successfully');
    return true;
}

//DB seeding procedure for adding categories from category graph after cleanup
async function addCategories(){
    console.log('Deleting all categories');
    await Category.deleteMany().exec();
    console.log('All categories deleted. Creating new categories...');

    let updateCategoryPromise = (categoryObj,subCategoryIds) => {
        return new Promise((resolve,_)=>{
            Category.updateOne({_id: categoryObj._id},{$set: {hasSubCategory: true,subCategoryId: subCategoryIds}},{upsert: true}).exec().then((res)=>{
                resolve({
                    ...res
                })
            })
        })
    }
    
    let updateFaqCategory = (categoryObj,faqIds) => {
        return new Promise((resolve,_)=>{
            Category.updateOne({_id: categoryObj._id},{$set: {faqId: faqIds}},{upsert: true}).exec().then((res)=>{
                resolve({
                    ...res
                })
            })
        })
    }
    let categoriesGraph = createCategoriesGraph();
    let rootCategory = new Category({
        categoryName: 'root',
        subCategoryId: [],
        hasSubCategory: false,
        faqId: [],
    });
    let rootSaved = await rootCategory.save();
    let queue = [rootSaved];
    while(queue.length != 0){
        let s = queue.shift();
        try{
            let subCategories = categoriesGraph[s.categoryName];
            let subCategoryIds = [];
            for(const subCategory of subCategories){
                let subCategoryObj = new Category({
                    categoryName: subCategory,
                    subCategoryId: [],
                    hasSubCategory: false,
                    faqId: [],
                })
                let subCategorySaved = await subCategoryObj.save();
                queue.push(subCategorySaved);
                subCategoryIds.push(subCategorySaved._id);
            }
            await updateCategoryPromise(s,subCategoryIds);
        }
        catch(err){
            let faqsToBeLinked = await Faq.find({faqCategoryName: s.categoryName}).exec();
            if(faqsToBeLinked.length !== 0)
            {
                faqsToBeLinked = faqsToBeLinked.map((faq)=>{
                    return faq._id
                });
                await updateFaqCategory(s,faqsToBeLinked);
            }
        }
    }
    console.log('All categories created...');
    return true;
}

//DB seeding procedure for adding mock users after cleanup
async function addUsers(){
    console.log('Deleting all the users in the user collection...');
    await User.deleteMany().exec();
    console.log('All users deleted. Total users size: '+userArr.length+'...Adding users');

    for(const user of userArr){
        let userObj = new User({...user,userPass: bcrypt.hashSync(user.userPass,saltRounds)});
        let userSaved = await userObj.save();
        console.log('User saved with id: '+userSaved._id);
    }
    console.log('All users added successfully');
    return true;
}

//DB seeding procedure for adding products after cleanup
async function addProducts(){
    console.log('Deleting all previous products');
    await Product.deleteMany().exec();
    console.log('All products deleted..Creating new products of size: '+productArr.length);
    for(const product of productArr){
        let productObj = new Product({...product});
        let productSaved = await productObj.save();
        console.log('Product saved with id: '+productSaved._id);
    }
    console.log('All products added successfully');
    return true;
}

//DB seeding procedure for adding orders after cleanup
async function addOrders(){

    console.log('Deleting all previous orders');
    await Order.deleteMany().exec();
    console.log('All orders deleted...Creating new orders of size: '+ordersArr.length);
    let allUsers = await User.find().exec();
    let i=0;
    for(const order of ordersArr){
        let productsToBeLinked = await Product.find({productCategory: order.category}).exec();
        for(const product of productsToBeLinked){
            order.products.push(product._id);
            break;
        }
        order.userId = allUsers[i]._id;
        order.units=[1];
        i++;
        if(i == allUsers.length){
            i=0;
        }
        let orderObj = new Order({...order});
        let orderSaved = await orderObj.save();
        console.log('Order saved with id: '+orderSaved._id);
    }
    console.log('All orders added successfully');
    return true;
}

//DB seeding procedure for linking mock users with their orders after cleanup
async function linkUsersToOrders(){
    console.log('Linking users with their orders...');
    let allOrders = await Order.find().exec();
    for(const order of allOrders){
        let user = await User.findById(order.userId).exec();
        user.userOrders.push(order._id);
        let updateUserPromise = () => {
            return new Promise((resolve,_)=> {
                User.updateOne({_id: user._id},{$set: {userOrders: user.userOrders}},{upsert: true}).exec().then((res)=>{
                    resolve({
                        ...res
                    })
                });
            })
        }
        await updateUserPromise();
        console.log('User with id '+user._id+' is successfully updated');
    }
    console.log('All users linked with orders');
    return true;
}

//DB seeding procedure for adding superusers for chatbot-admin
async function addAdmins(){
    console.log('Deleting all the superusers in the admins collection...');
    let deleteAllUsers = await Admin.deleteMany().exec();
    console.log('All superusers deleted. Total superusers array size: '+adminArr.length+'...Adding superusers');

    for(const admin of adminArr){

        const adminobj  = new Admin({...admin,userPass: bcrypt.hashSync(admin.userPass,saltRounds)});
        const adminSaved = await adminobj.save();
        console.log('Superuser saved with id: '+adminSaved._id);
    }
    console.log('All superusers added successfully');
    return true;
}
exports.addFaqs = addFaqs;
exports.addCategories = addCategories;
exports.addUsers = addUsers;
exports.addProducts = addProducts;
exports.addOrders = addOrders;
exports.addAdmins = addAdmins;
exports.linkUsersToOrders = linkUsersToOrders;