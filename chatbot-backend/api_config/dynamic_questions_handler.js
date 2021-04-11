const { Order } = require('../models/order');
const { Product } = require('../models/product');
const mongoose = require('mongoose');

//Dynamic functions used for rendering answers whose faqIsDynamic flag is set to true
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
                        
                        reject({'resCode': 404,'res': [{faqAnswerText: `Order is invalid or obsolete`,faqAnswerType: 'text'}]});
                    }
                    else if(orderFound.orderStatus !== 'Completed'){
                        reject({'resCode': 403,'res': [{faqAnswerText: `First complete the order to view similar products`,faqAnswerType: 'text'}]});
                    }
                    else{
                        Product.find({productCategory: orderFound.category}).exec(function(err,products){
                            if(err || products === null || products === undefined || products.length === 0){
                                reject({'resCode':404,'res': [{faqAnswerText: `No product of the similar category found`,faqAnswerType: 'text'}]});
                            }
                            else{
                                products = products.map((p)=> {
                                    return {faqAnswerText: p.productName,faqAnswerType: 'text'};
                                });
                                resolve(products);
                            }
                        })
                    }
                });
            }
            catch(err){
                reject({'resCode':404,'res':[{faqAnswerText: 'Query is invalid',faqAnswerType: 'text'}]});
            }
        });
    },
    getCurrentStockHolding: (context) => {
        return new Promise((resolve,_)=> {
            try{
                Order.find({$and: [{userId: context.user},{orderStatus: 'Completed'},{products: mongoose.Types.ObjectId(context.product.toString())}]}).populate('productDocs').exec(function(err,orders){
                    if(err || orders === null || orders === undefined || orders.length === 0){
                        resolve([{faqAnswerText: `You don't have any previous stock holding on the asked product`,faqAnswerType: 'text'}]);
                    }
                    else{
                        let nse = 0,bse = 0;
                        for(const order of orders){
                            const allProductsOfOrder = order.toJSON().productDocs;
                            for(let idx=0;idx<allProductsOfOrder.length;idx++){
                                if(allProductsOfOrder[idx]._id.toString() === context.product.toString()){
                                    nse += parseFloat(allProductsOfOrder[idx].productPrice.stockPrice.nse)*order.units[idx];
                                    bse += parseFloat(allProductsOfOrder[idx].productPrice.stockPrice.bse)*order.units[idx];
                                }
                            }
                        }
                        if(nse===0 && bse===0){
                            resolve([{faqAnswerText: `You don't have any previous stock holding on the asked product`,faqAnswerType: 'text'}]);
                        }
                        else{
                            resolve([
                                {
                                    faqAnswerText: `NSE: Rs.${nse.toFixed(2)}`,
                                    faqAnswerType: 'text'
                                },
                                {
                                    faqAnswerText: `BSE: Rs.${bse.toFixed(2)}`,
                                    faqAnswerType: 'text'
                                }
                            ]);
                        }
                    }
                })
            }
            catch(err){
                resolve([{faqAnswerText: `You don't have any previous stock holding on the asked product`,faqAnswerType: 'text'}]);
            }
        });
    },
    checkAvailabilityPreviousOrders: (context) => {
        return new Promise((resolve,_)=>{
            try{
                Order.find({$and: [{userId: context.user},{$or: [{orderStatus: 'Completed'},{orderStatus: 'Pending'}]},{products: mongoose.Types.ObjectId(context.product.toString())}]}).exec(function(err,orders){
                    if(err || orders === null || orders === undefined || orders.length === 0){
                        resolve([
                            {
                                faqAnswerText: `Sorry! you haven't used the asked product previously or your orders were cancelled which includes the product.`,
                                faqAnswerType: 'text'
                            },
                            {
                                faqAnswerText: `Buy the product to get more benefits.`,
                                faqAnswerType: 'text'
                            },
                            {
                                faqAnswerText: `Raise a ticket if you find above information incorrect.`,
                                faqAnswerType: 'text'
                            }
                        ]);
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
                            resolve([{faqAnswerText: `Yes! you already have ${countCompleted} completed orders for the asked product.`,faqAnswerType: 'text'}]);
                        }
                        else{
                            resolve([
                                {
                                    faqAnswerText: `No! you don't have any previously completed orders for the asked product.`,
                                    faqAnswerType: 'text'
                                },
                                {
                                    faqAnswerText: `You have ${countPending} pending orders for this product.`,
                                    faqAnswerType: 'text'
                                },
                                {
                                    faqAnswerText: `Move to orders page to place your order soon!`,
                                    faqAnswerType: 'text'
                                }
                            ]);
                        } 
                    }  
                });              
            }
            catch(err){
                resolve([
                    {
                        faqAnswerText: `Sorry! you haven't used the asked product previously or your orders were cancelled which includes the product.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Buy the product to get more benefits.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Raise a ticket if you find above information incorrect.`,
                        faqAnswerType: 'text'
                    }
                ]);
            }
        });
    }
}
exports.dynamicQuestions = dynamicQuestions;