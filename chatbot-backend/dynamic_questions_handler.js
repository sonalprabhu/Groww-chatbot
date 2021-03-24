const { Order } = require('./models/order');
const { Product } = require('./models/product');

module.exports = {
    browseSimilarProducts:async (context) => {
        try{
            const order = await Order.findById(context.order).exec();
            if(order.userId.toString() !== context.user){
                throw new Error('Invalid user and order details');
            }
            const similarProducts = await Product.find({productCategory: order.category}).exec();
            let answers = similarProducts.map((p)=>p.productName);//TODO: more information required to be sent
            return answers;
        }
        catch(err){
            return [];
        }
    },
    getCurrentStockHolding: async (context) => {
        const product = await Product.findById(context.product).exec();
        let count = 0;
        const userOrders = await Order.find({$and: [{userId: context.user},{orderStatus: 'Completed'}]}).exec();
        for(const order of userOrders){
            count += order.products.filter((pId)=>(pId.toString()===context.product)).length;
        }
        return [`NSE: Rs.${count * product.productPrice.stockPrice.nse}`,`BSE: Rs.${count * product.productPrice.stockPrice.bse}`];
    },
    checkAvailabilityPreviousOrders: async (context) => {
        const product = await Product.findById(context.product).exec();
        const userOrders = await Order.find({$and: [{userId: context.user},{orderStatus: 'Completed'}]}).exec();
        let availability = false;
        for(const order of userOrders){
            if(order.products.filter((pId)=>(pId.toString()===context.product)).length !== 0){
                availability = true;
                break;
            }
        }
        if(availability)
            return [`Yes! you have already ordered for ${product.productName}`];
        return [`No! you don't have any previous orders for ${product.productName}`];
    }
}