import React from 'react';
import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';
import SubHeader from './SubHeader';
import growthGraph from '../assets/graph.JPG';
import { useSelector, useDispatch } from 'react-redux';
import { open } from '../app/reducers/chatbotToggle';
import { createChatBotMessage } from "react-chatbot-kit";
import { storeMessages } from '../app/reducers/chatbotMessages';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function ProductPage(props) {
    const dispatch = useDispatch();
    const [product, setProduct] = useState([]);
    const [placeOrder, setPlaceOrder] = useState(false);
    const [confirmOrder, setConfirmOrder] = useState(false);
    const [orderLimit, setOrderLimit] = useState();
    const [orderId, setOrderId] = useState();
    const userId = useSelector(state => state.users.userId);
    const messages = useSelector(state => state.messages.value);
    var date = (new Date()).toJSON().slice(0, 10);
    var nDate = date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4);

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
            default : console.log('No message')
        }
    };

    useEffect(() => {
        async function fetchData() {
            var item = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getProductDetails/${props.match.params.id}`)
                .then(res => {
                    return res.data;
                });
            if (userId !== '') {
                var userMaxOrder = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getMaxOrderLimit`, { params: { user: userId } })
                    .then(res => {
                        return res.data.maxOrderCount;
                    })
                    .catch((err) => []);
                setOrderLimit(userMaxOrder);
            }
            setProduct(item);
        }
        fetchData();

    }, []);


    function setAlert() {
        var newMessage = [];
        const message = JSON.parse(JSON.stringify(messages));
        newMessage[0] = createChatBotMessage(`ALERT:`, { widget: "alert", withAvatar: true });
        message.push(...newMessage)
        dispatch(storeMessages(message))
        dispatch(open())
    }

    async function placeProductOrder() {
        var ordersToday = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getUserDetails/${userId}`)
            .then(res => {
                return res.data.userOrderPlacedToday;
            });
        if (orderLimit !== 0 && ordersToday >= orderLimit)
            setAlert();
        else {
            var order = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/placeOrder`, { products: [product._id], units: [1], category: product.productCategory, orderDate: nDate, }, { params: { user: userId } })
            setOrderId(order.data.orderId);
            setPlaceOrder(true);
        }
    }

    async function confirmProductOrder() {
        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/confirmOrder`,{ orderId: orderId, orderDate: nDate }, { params: { user: userId } })
        setConfirmOrder(false);
        setPlaceOrder(false);
        createNotification('success', 'Order Placed Successfully');
    }

    function placePendingOrder() {
        createNotification('warning', 'Order in pending state');
        createNotification('warning', 'Confirm Order in Orders Page');
        setPlaceOrder(false);
        setConfirmOrder(false);
    }


    return (
        <div>
            <SubHeader remove={true} />
            <div className="container web-align wrapper">
                {product.productCategory !== 'FDs' &&
                    <div className="specific-card" key={product._id}>
                        <div className="card-top">
                            <div>
                                {<img src={product.productUrl} alt="Product" width="36" height="36" />}
                                <div className="item-name">{product.productName}</div>
                            </div>
                            <div className="item-details">
                                {(product.productCategory === 'Stocks') && <div className="item-price">₹{product.productPrice.stockPrice.bse}</div>}
                                {(product.productCategory === 'Mutual Funds') && <div className="price-change">{product.productPrice.fundReturns.threeYear} (3Y)</div>}
                                {(product.productCategory === 'Stocks') && <div className="price-change">5.90(1.2%)</div>}
                                {(product.productCategory === 'Gold') && <div className="item-price">{product.productPrice.purity}</div>}
                            </div>
                        </div>
                        <img src={growthGraph} alt="Graph" width="600px" height="400px" />
                        {userId !== '' && !placeOrder && <button className="btn-primary" onClick={() => placeProductOrder()}>Place Order</button>}
                        {userId !== '' && placeOrder && !confirmOrder && (<div><button className="btn-primary" onClick={() => confirmProductOrder()}>Confirm</button>
                            <button className="btn-primary" onClick={() => placePendingOrder()}>Don't Confirm</button></div>)}
                    </div>}
                {product.productCategory === 'FDs' &&
                    <div className="specific-card" key={product._id}>
                        <div className="card-top">
                            <div>
                                <img src={product.productUrl} alt="Product" width="36" height="36" />
                                <div className="item-name">Equitas {(product.productName.split(' ').slice(1, ).join(' '))}</div>
                            </div>
                            <div className="item-price">{product.productPrice.fd.rateOfInterest}</div>
                        </div>
                        <img src={growthGraph} alt="Graph" width="600px" height="400px" />
                        {userId !== '' && !placeOrder && <button className="btn-primary" onClick={() => placeProductOrder()}>Place Order</button>}
                        {userId !== '' && placeOrder && !confirmOrder && (<div><button className="btn-primary" onClick={() => confirmProductOrder()}>Confirm</button>
                            <button className="btn-primary" onClick={() => placePendingOrder()}>Don't Confirm</button></div>)}
                    </div>}




            </div>
        </div>
    )
}
