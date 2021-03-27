import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';
import { useSelector } from 'react-redux'
import SubHeader from './SubHeader';
import {  Link} from 'react-router-dom';

export default function Orders(props) {
    const [orders,setOrders] = useState([]);
    const userId=useSelector(state => state.users.userId)
    var mapper={
        "stocks":'Stocks',
        "fd":'FDs',
        "gold":'Gold',
        "mutualfund":'Mutual Funds'
      }
    function tabClicked(loc){
        const location = mapper[loc.split('/')[3]]
        async function fetchData(){   
            var order = await axios.get(`http://localhost:8081/getAllOrders`,{params:{category:location,user:userId}})
          .then(res => {
            return res.data;
          })
          .catch((err)=>[]);
            setOrders(order);
        }
        fetchData();
    }
    
    useEffect(() => {
        const location = mapper[document.location.pathname.split('/')[3]]

        async function fetchData(){   
        var order = await axios.get(`http://localhost:8081/getAllOrders`,{params:{category:location,user:userId}})
      .then(res => {
        return res.data;
      })
      .catch((err)=>[]);
        setOrders(order);
    }
    fetchData();
  
    }, []);
    return (
        <div>
        <SubHeader link="/dashboard/orders" onClick={tabClicked}/>
        <div className="container-fluid web-align wrapper">
        <div className="row d-flex justify-content-center">
        {orders.length==0 && <div className="item-card">No Orders in this category</div>}
        {orders.map((order)=>{
            return(
                <Link to={{
                    pathname:"/dashboard/orders/"+props.location.pathname.split('/')[3]+'/'+order._id
                }}  className="clickable" key={order._id}>
            <div className="item-card">
             <div >{order.productName||"This is a product name"} </div>
             <div >{order.productPrice ||10000} </div>
             <div >{order.orderDate} </div>
             </div>
             </Link>
            );
        })}
        </div>
        </div>
        </div>
    )
}
