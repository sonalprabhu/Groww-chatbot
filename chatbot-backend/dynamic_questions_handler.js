const { Order } = require('./models/order');
const { Product } = require('./models/product');

const dynamicQuestions = 
{
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
        const userOrders = await Order.find().exec();
        //const userOrders = await Order.find({$and: [{userId: context.user},{orderStatus: 'Completed'}]}).exec();
        let countAvailability = 0;
        let countAvailabilityIncompleteStatus = 0;
        for(const order of userOrders){
            if(order.products.filter((pId)=>(pId.toString()===context.product)).length !== 0){
                if(order.userId.toString() === context.user.toString())
                {
                    if(order.orderStatus === 'Completed'){
                        countAvailability++;
                    }
                    else if(order.orderStatus === 'Pending'){
                        countAvailabilityIncompleteStatus++;
                    } 
                }
            }
        }
        if(countAvailability>0)
            return [`Yes! you have already ordered for ${product.productName}.`,`You have ${countAvailability} such orders.`];
        if(countAvailabilityIncompleteStatus>0)
            return [`No! you don't have any previously completed orders for ${product.productName}.`,`You have ${countAvailabilityIncompleteStatus} pending orders for this product.`,`Move to orders page to place your order soon!`];
        return [`Sorry! you haven't used ${product.productName} ${product.productCategory} previously or your orders were cancelled.`,`Buy the product to get more benefits.`,`Raise a ticket if you find above information incorrect.`]
    }
}
exports.dynamicQuestions = dynamicQuestions;