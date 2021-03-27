import React from 'react';
import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';
import SubHeader from './SubHeader';

export default function ProductPage(props) {
    const [product,setProduct] = useState([]);
    
    useEffect(() => {
        async function fetchData(){ 
        var item = await axios.get(`http://localhost:8081/getProductDetails/${props.match.params.id}`)
      .then(res => {
        return res.data;
      });
        setProduct(item);
    }
    fetchData();
  
    }, []);


    return (
        <div>
        <SubHeader/>
        <div className="container web-align wrapper">
             {product.productCategory !== 'FDs' && 
                   <div className="item-card col-4" key={product._id}>
                       {(product.productCategory === 'Stocks' || product.productCategory === 'Mutual Funds')  && <img src="https://assets-netstorage.groww.in/stock-assets/logos/INE397D01024.png" alt="Product" width="36" height="36"/>}
                       <div className="item-name">{product.productName}</div>
                       {(product.productCategory === 'Stocks') && <div className="item-price">₹{product.productPrice.stockPrice.bse}</div>}
                       {(product.productCategory === 'Mutual Funds') && <div className="price-change">{product.productPrice.fundReturns.threeYear} (3Y)</div>}
                       {(product.productCategory === 'Stocks') && <div className="price-change">5.90(1.2%)</div>}
                   </div>}
                   {product.productCategory === 'FDs' && <div className="item-card col-4" key={product._id}>
                   <div className="item-price">{product.productPrice.fd.rateOfInterest}</div>
                   <div className="item-name">{(product.productName.split(' ').slice(1,).join(' '))}</div>
                   </div>}
            
            
             
        </div>
        </div>
    )
}
/*
<div className="item-card col-4">
                       <img src={product.icon} alt="Product" width="36" height="36"/>
                       <div className="item-name">{product.name}</div>
                       <div className="item-price">{product.price}</div>
                       <div className="price-change">{product.change}</div>
                   </div>
*/