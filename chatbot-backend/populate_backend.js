const {addCategories,addFaqs,addUsers,addProducts,addOrders,linkUsersToOrders} = require('./fill_data_db');

async function populateBackend(){
    let faqsAdded = await addFaqs();
    let categoriesAdded = await addCategories();
    let usersAdded = await addUsers();
    let productsAdded = await addProducts();
    let ordersAdded = await addOrders();
    let userLinkedWithOrders = await linkUsersToOrders();
}

exports.populateBackend = populateBackend;