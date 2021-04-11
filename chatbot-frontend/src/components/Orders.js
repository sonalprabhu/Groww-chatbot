import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import {close} from '../app/reducers/chatbotToggle';
import SubHeader from './SubHeader';
import {  Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import actionProvider from '../chatbot/ActionProvider';

export default function Orders(props) {
    const dispatch = useDispatch()
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
            var order = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAllOrders`,{params:{category:location,user:userId}})
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
        var order = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAllOrders`,{params:{category:location,user:userId}})
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
        <div className="row justify-content-center">
        {orders.length===0 && <div className="item-card">No Orders in this category</div>}
        {orders.map((order)=>{
            return(
                <div className="col-6 order-card" key={order._id}>
                <Link to={{
                    pathname:"/dashboard/orders/"+props.location.pathname.split('/')[3]+'/'+order._id,actionProvider
                }}  className="clickable" onClick={()=>dispatch(close())}>
            <div className="" key={order._id}>
            <div className="order-date">{order.orderDate} </div>
            <div className="order-details">
             <div className="order-name">{order.products?( order.products[0]?order.products[0].productName:"This is a product name"):"This is a product name"} </div>
             <div className="item-price">₹{order.productPrice ||10000} </div>
             <Button className="order-status-color" variant={`${order.orderStatus === 'Pending' ? "warning" : (order.orderStatus === 'Cancelled' ? "danger" : "success")}`}
                            >{order.orderStatus} </Button>
             </div>
             </div>
             </Link>
             </div>
            );
        })}
        </div>
        </div>
        </div>
    )
}
