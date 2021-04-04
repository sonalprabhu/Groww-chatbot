import React from 'react';
import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';
import SubHeader from './SubHeader';
import growthGraph from '../assets/graph.JPG';

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
        <SubHeader remove={true}/>
        <div className="container web-align wrapper">
             {product.productCategory !== 'FDs' && 
                   <div className="specific-card" key={product._id}>
                      <div className="card-top">
                       <div>
                       {(product.productCategory === 'Stocks' || product.productCategory === 'Mutual Funds')  && <img src="https://assets-netstorage.groww.in/stock-assets/logos/INE397D01024.png" alt="Product" width="36" height="36"/>}
                       <div className="item-name">{product.productName}</div>
                       </div>
                       <div className="item-details">
                       {(product.productCategory === 'Stocks') && <div className="item-price">₹{product.productPrice.stockPrice.bse}</div>}
                       {(product.productCategory === 'Mutual Funds') && <div className="price-change">{product.productPrice.fundReturns.threeYear} (3Y)</div>}
                       {(product.productCategory === 'Stocks') && <div className="price-change">5.90(1.2%)</div>}
                       {(product.productCategory === 'Gold') && <div className="item-price">{product.productPrice.purity}</div>}
                       </div>
                      </div>
                      <img src={growthGraph} alt="Graph" width="600px" height="400px"/>
                   </div>}
                   {product.productCategory === 'FDs' && 
                   <div className="specific-card" key={product._id}>
                   <div className="card-top">
                   <div>
                   <img src="https://assets-netstorage.groww.in/stock-assets/logos/INE397D01024.png" alt="Product" width="36" height="36"/>
                   <div className="item-name">Equitas {(product.productName.split(' ').slice(1,).join(' '))}</div>
                   </div>
                   <div className="item-price">{product.productPrice.fd.rateOfInterest}</div>
                   </div>
                   <img src={growthGraph} alt="Graph" width="600px" height="400px"/>
                   </div>}
            
            
             
        </div>
        </div>
    )
}
