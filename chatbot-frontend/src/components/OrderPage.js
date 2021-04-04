import React from 'react';
import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';
import { useSelector} from 'react-redux'
import SubHeader from './SubHeader';
import Button from 'react-bootstrap/Button';

export default function OrderPage(props) {
    const [order,setOrder] = useState([]);
    const userId=useSelector(state=>state.users.userId);
    
    useEffect(() => {
        async function fetchData(){ 
        var item = await axios.get(`http://localhost:8081/getOrderDetails/${props.match.params.id}`,{params:{user:userId}})
      .then(res => {
        return res.data;
      });
        setOrder(item);
    }
    fetchData();
  
    }, []);


    return (
        <div>
        
        <div className="container web-align wrapper">
        <div className="row d-flex justify-content-center">
        <div className="order-card col-12" key={order._id}>
            <div className="order-date">{order.orderDate} </div>
            <div className="order-details">
             <div className="order-name">{order.products?( order.products[0]?order.products[0].productName:"This is a product name"):"This is a product name"} </div>
             <div className="item-price">₹{order.productPrice ||10000} </div>
             <Button className="order-status">{order.orderStatus} </Button>
             </div>
             </div>
        </div>
        </div>
        </div>
    )
}
