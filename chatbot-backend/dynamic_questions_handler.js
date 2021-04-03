const { Order } = require('./models/order');
const { Product } = require('./models/product');
const mongoose = require('mongoose');

const dynamicQuestions = 
{
    browseSimilarProducts: (context) => {
        return new Promise((resolve,reject)=>{
            try{
                Order.findById(context.order).exec(function(err,orderFound){
                    if( err || 
                        orderFound === null || 
                        orderFound === undefined || 
                        Object.keys(orderFound.toJSON()).length === 0 || 
                        orderFound.userId.toString() !== context.user){
                        
                        reject({'resCode': 404,'res': [`Order is invalid or obsolete`]});
                    }
                    else if(orderFound.orderStatus !== 'Completed'){
                        reject({'resCode': 403,'res': [`First complete the order to view similar products`]});
                    }
                    else{
                        Product.find({productCategory: orderFound.category}).exec(function(err,products){
                            if(err || products === null || products === undefined || products.length === 0){
                                reject({'resCode':404,'res': [`No product of the similar category found`]});
                            }
                            else{
                                products = products.map((p)=> p.productName);
                                resolve(products);
                            }
                        })
                    }
                });
            }
            catch(err){
                reject({'resCode':404,'res':'Query is invalid'});
            }
        });
    },
    getCurrentStockHolding: (context) => {
        return new Promise((resolve,_)=> {
            try{
                Order.find({$and: [{userId: context.user},{orderStatus: 'Completed'},{products: mongoose.Types.ObjectId(context.product.toString())}]}).populate('productDocs').exec(function(err,orders){
                    if(err || orders === null || orders === undefined || orders.length === 0){
                        resolve([`You don't have any previous stock holding on the asked product`]);
                    }
                    else{
                        let nse = 0,bse = 0;
                        for(const order of orders){
                            const matchedProducts = order.toJSON().productDocs.filter((productDoc)=>productDoc._id.toString() === context.product.toString());
                            nse += matchedProducts.length*parseFloat(matchedProducts[0].productPrice.stockPrice.nse);
                            bse += matchedProducts.length*parseFloat(matchedProducts[0].productPrice.stockPrice.bse);
                        }
                        if(nse===0 && bse===0){
                            resolve([`You don't have any previous stock holding on the asked product`]);
                        }
                        else{
                            resolve([`NSE: Rs.${nse.toFixed(2)}`,`BSE: Rs.${bse.toFixed(2)}`]);
                        }
                    }
                })
            }
            catch(err){
                resolve([`You don't have any previous stock holding on the asked product`]);
            }
        });
    },
    checkAvailabilityPreviousOrders: (context) => {
        return new Promise((resolve,_)=>{
            try{
                Order.find({$and: [{userId: context.user},{$or: [{orderStatus: 'Completed'},{orderStatus: 'Pending'}]},{products: mongoose.Types.ObjectId(context.product.toString())}]}).exec(function(err,orders){
                    if(err || orders === null || orders === undefined || orders.length === 0){
                        resolve([`Sorry! you haven't used the asked product previously or your orders were cancelled which includes the product.`,`Buy the product to get more benefits.`,`Raise a ticket if you find above information incorrect.`]);
                    }
                    else{
                        let countCompleted = 0;
                        let countPending = 0;
                        for(const order of orders){
                            if(order.orderStatus === 'Completed'){
                                countCompleted++;
                            }
                            else{
                                countPending++;
                            }
                        }
                        if(countCompleted > 0){
                            resolve([`Yes! you already have ${countCompleted} completed orders for the asked product.`]);
                        }
                        else{
                            resolve([`No! you don't have any previously completed orders for the asked product.`,`You have ${countPending} pending orders for this product.`,`Move to orders page to place your order soon!`]);
                        } 
                    }  
                });              
            }
            catch(err){
                resolve([`Sorry! you haven't used the asked product previously or your orders were cancelled which includes the product.`,`Buy the product to get more benefits.`,`Raise a ticket if you find above information incorrect.`]);
            }
        });
    }
}
exports.dynamicQuestions = dynamicQuestions;