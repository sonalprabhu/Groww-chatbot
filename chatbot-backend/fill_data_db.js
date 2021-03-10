const {Faq} = require('./models/faqs');
const {User} = require('./models/user');
const {Order} = require('./models/order');
const {Product} = require('./models/product');
const {faqArr,userArr,ordersArr,productArr} = require('./data');

async function addFaqs(){
    console.log('Deleting all the data in the faqs collection...');
    let deleteAllQuestions = await Faq.deleteMany().exec();
    console.log('All faqs deleted. Total faq size '+faqArr.length+'...Adding faqs...');

    for(const faq of faqArr){
        let faqObj = new Faq({...faq});
        let faqSaved = await faqObj.save();
        console.log('Faq saved with id: '+faqSaved._id);
    }
    console.log('Faqs added successfully');
    return true;
}
async function addUsers(){
    console.log('Deleting all the users in the user collection...');
    let deleteAllUsers = await User.deleteMany().exec();
    console.log('All users deleted. Total users size: '+userArr.length+'...Adding users');

    for(const user of userArr){
        let faqsToBeLinked = await Faq.find({faqQuestionCategory: 'My Account'}).exec();
        for(const faq of faqsToBeLinked){
            user.faqId.push(faq._id);
        }
        let userObj  = new User({...user});
        let userSaved = await userObj.save();
        console.log('User saved with id: '+userSaved._id);
    }
    console.log('All users added successfully');
    return true;
}
async function addProducts(){
    console.log('Deleting all previous products');
    let deleteAllProducts = await Product.deleteMany().exec();
    console.log('All products deleted..Creating new products of size: '+productArr.length);
    for(const product of productArr){
        let productFaqs = await Faq.find({$and: [{faqQuestionCategory: 'Products'},{faqQuestionSubCategoryL1: product.productName}]}).exec();
        for(const faq of productFaqs){
            product.faqId.push(faq._id);
        }
        let productObj = new Product({...product});
        let productSaved = await productObj.save();
        console.log('Product saved with id: '+productSaved._id);
    }
    console.log('All products added successfully');
    return true;
}
async function addOrders(){

    console.log('Deleting all previous orders');
    let deleteAllOrders = await Order.deleteMany().exec();
    console.log('All orders deleted...Creating new orders of size: '+ordersArr.length);
    let allUsers = await User.find().exec();
    let i=0;
    for(const order of ordersArr){
        let productsToBeLinked = await Product.find({productCategory: order.category}).exec();
        for(const product of productsToBeLinked){
            order.products.push(product._id);
        }
        order.userId = allUsers[i]._id;
        i++;
        if(i == allUsers.length){
            i=0;
        }
        let faqsToBeLinked = await Faq.find(
                                                {$and: [
                                                    {faqQuestionCategory: 'Orders'},
                                                    {$or: [
                                                            {faqQuestionSubCategoryL1: order.orderStatus},
                                                            {faqQuestionSubCategoryL1: 'General'}
                                                        ]
                                                    }
                                                ]}).exec();
        for(const faq of faqsToBeLinked){
            order.faqId.push(faq._id);
        }
        let orderObj = new Order({...order});
        let orderSaved = await orderObj.save();
        console.log('Order saved with id: '+orderSaved._id);
    }
    console.log('All orders added successfully');
    return true;
}
async function linkUsersToOrders(){
    console.log('Linking users with their orders...');
    let allOrders = await Order.find().exec();
    for(const order of allOrders){
        let user = await User.findById(order.userId).exec();
        user.userOrders.push(order._id);
        //let updateUser = await User.updateOne({_id: user._id},{$set: {userOrders: user.userOrders}},{upsert: true}).then((res)=>res);
        let updateUserPromise = () => {
            return new Promise((resolve,reject)=> {
                User.updateOne({_id: user._id},{$set: {userOrders: user.userOrders}},{upsert: true}).exec().then((res)=>{
                    resolve({
                        ...res
                    })
                });
            })
        }
        let updateUser = await updateUserPromise();
        console.log('User with id '+user._id+' is successfully updated');
    }
    console.log('All users linked with orders');
    return true;
}
exports.addFaqs = addFaqs;
exports.addUsers = addUsers;
exports.addProducts = addProducts;
exports.addOrders = addOrders;
exports.linkUsersToOrders = linkUsersToOrders;