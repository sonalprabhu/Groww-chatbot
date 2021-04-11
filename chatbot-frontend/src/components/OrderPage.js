import React from 'react';
import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';
import { useSelector} from 'react-redux';
import Button from 'react-bootstrap/Button';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function OrderPage(props) {
    var date = (new Date()).toJSON().slice(0, 10);
    var nDate = date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4);

    const [order, setOrder] = useState([]);
    const userId = useSelector(state => state.users.userId);

    const createNotification = (type, msg = "") => {
        switch (type) {
            case 'info':
                NotificationManager.info('Order in pending state', 3000);
                break;
            case 'success':
                NotificationManager.success(msg, 'Success');
                break;
            case 'warning':
                NotificationManager.warning(msg, 'Warning');
                break;
            case 'error':
                NotificationManager.error('Error message', 'Click me!', 5000, () => {
                    alert('callback');
                });
                break;
            default: console.log('No message');
        }
    };

    useEffect(() => {
        async function fetchData() {
            var item = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getOrderDetails/${props.match.params.id}`, { params: { user: userId } })
                .then(res => {
                    return res.data;
                });
            setOrder(item);
        }
        fetchData();

    }, []);


    async function confirmProductOrder() {
        var orderId = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/confirmOrder`, { orderId: order._id, orderDate: nDate }, { params: { user: userId } })
        createNotification('success', 'Order Placed Successfully');
        var item = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getOrderDetails/${order._id}`, { params: { user: userId } })
            .then(res => {
                return res.data;
            });
        setOrder(item);
    }


    async function cancelOrder() {
        var orderId = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/cancelOrder`, { orderId: order._id, orderDate: nDate }, { params: { user: userId } })
        var item = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getOrderDetails/${order._id}`, { params: { user: userId } })
            .then(res => {
                return res.data;
            });
        setOrder(item);
        createNotification('success', 'Order Cancelled Successfully');
    }


    return (
        <div>

            <div className="container web-align wrapper">
                <div className="row justify-content-center">
                    <div className="order-card col-12" key={order._id}>
                        <div className="order-date">{order.orderDate} </div>
                        <div className="order-details">
                            <div className="order-name">{order.products ? (order.products[0] ? order.products[0].productName : "This is a product name") : "This is a product name"} </div>
                            <div className="item-price">₹{order.productPrice || 10000} </div>
                            <Button style={{ height: "40px" }} variant={`${order.orderStatus === 'Pending' ? "warning" : (order.orderStatus === 'Cancelled' ? "danger" : "success")}`}
                            >{order.orderStatus} </Button>
                            <div className="status-container">
                                {order.orderStatus === 'Pending' && <Button onClick={() => confirmProductOrder()}>Complete Order</Button>}
                                {(order.orderStatus === 'Completed' || order.orderStatus === 'Pending') && <Button onClick={() => cancelOrder()}>Cancel Order</Button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
