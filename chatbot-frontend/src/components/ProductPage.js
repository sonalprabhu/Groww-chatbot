import React from 'react';
import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';

export default function ProductPage(props) {
    const [product,setProduct] = useState([]);
    console.log(props)
    
    useEffect(async () => {
        var item = await axios.get(`http://localhost:8081/products/${props.match.params.id}`)
      .then(res => {
        return res.data.item[0];
      });

        setProduct(item);
  
    }, []);


    return (
        <div>
            
            <div className="item-card col-4">
                       <img src={product.icon} width="36" height="36"/>
                       <div className="item-name">{product.name}</div>
                       <div className="item-price">{product.price}</div>
                       <div className="price-change">{product.change}</div>
                   </div>
             
        </div>
    )
}
