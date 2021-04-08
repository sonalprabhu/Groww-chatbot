const {addCategories,addFaqs,addUsers,addProducts,addOrders,linkUsersToOrders,addAdmins} = require('./fill_data_db');

async function populateBackend(){
    await addFaqs();
    await addCategories();
    await addUsers();
    await addProducts();
    await addOrders();
    await linkUsersToOrders();
    await addAdmins();
}

exports.populateBackend = populateBackend;