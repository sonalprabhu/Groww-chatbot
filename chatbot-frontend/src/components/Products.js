import './App.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SubHeader from './SubHeader';
import { useDispatch } from 'react-redux'
import { close } from '../app/reducers/chatbotToggle';

function Products(props) {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    if (document.querySelector(".react-chatbot-kit-chat-input-container")) {
        document.querySelector(".react-chatbot-kit-chat-input-container").style.display = 'none';
    }
    var mapper = {
        "Stocks": 'Stocks',
        "FD": 'FDs',
        "Gold": 'Gold',
        "Mutual Funds": 'Mutual Funds'
    }

    useEffect(() => {
        async function fetchData() {
            var item = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAllProducts`, { params: { category: mapper[props.text] } })
                .then(res => {
                    return res.data;
                });
            setItems(item);
        }
        fetchData();

    }, []);
    const reverseMapper = {
        "Stocks": "/stocks",
        "FD": "/fd",
        "Gold": "/gold",
        "Mutual Funds": "/mutualfund"
    }

    return (
        <div>
            <SubHeader />
            <div className="container web-align wrapper">
                {props.text !== 'FD' && props.text !== 'Gold' && <h1 className="heading">{props.text} in News</h1>}
                {props.text === 'FD' && <h1 className="heading">Equitas Bank FDs</h1>}
                <div className="row d-flex justify-content-center">
                    {items.map((item) => {
                        return (
                            <Link to={{
                                pathname: reverseMapper[props.text] + '/' + item._id, aboutProps: { item }
                            }}
                                className="clickable" key={item._id} onClick={() => dispatch(close())}>
                                {props.text !== 'FD' &&
                                    <div className="item-card col-4" key={item._id}>
                                        {<img src={item.productUrl} alt="Product" width="36" height="36" />}
                                        <div className="item-name">{item.productName}</div>
                                        {(props.text === 'Stocks') && <div className="item-price">₹{item.productPrice.stockPrice.bse}</div>}
                                        {(props.text === 'Mutual Funds') && <div className="price-change">{item.productPrice.fundReturns.threeYear} (3Y)</div>}
                                        {(props.text === 'Stocks') && <div className="price-change">5.90(1.2%)</div>}
                                    </div>}
                                {props.text === 'FD' && <div className="item-card col-4" key={item._id}>
                                    {<img src={item.productUrl} alt="Product" width="36" height="36" />}
                                    <div className="item-price">{item.productPrice.fd.rateOfInterest}</div>
                                    <div className="item-name">{(item.productName.split(' ').slice(1, ).join(' '))}</div>
                                </div>}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Products;
