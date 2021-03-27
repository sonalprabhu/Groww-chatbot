import React from 'react';
import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';
import { useSelector} from 'react-redux'
import SubHeader from './SubHeader';

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
        <SubHeader/>
        <div className="container web-align wrapper">
        <div className="row d-flex justify-content-center">
            <div className="item-card order-card">
             <div >{order.productName||"This is a product name"} </div>
             <div >{order.productPrice ||10000} </div>
             <div >{order.orderDate} </div>
             </div>
        </div>
        </div>
        </div>
    )
}
