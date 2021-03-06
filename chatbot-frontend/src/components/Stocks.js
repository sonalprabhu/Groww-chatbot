import { Component } from 'react';
import botlogo from '../assets/botlogo.jpg'
import './App.css';

export default class Stocks extends Component {

    constructor(props){
        super(props);
        this.state={
            items:[
                {name:"Bharti Airtel",price:123,change:23,icon:"https://assets-netstorage.groww.in/stock-assets/logos/INE397D01024.png"},
                {name:"Yes Bank",price:123,change:23,icon:"https://assets-netstorage.groww.in/stock-assets/logos/INE528G01027.png"},
                {name:"Ircon International",price:123,change:23,icon:"https://assets-netstorage.groww.in/stock-assets/logos/INE962Y01013.png"},
                {name:"Ruchi Soya Inds",price:123,change:23,icon:"https://assets-netstorage.groww.in/stock-assets/logos/INE619A01027.png"},
            ]
        }
    }
    render() {
        return (
            <div>
                <h1 className="heading">Stocks in News</h1>
                <div className="row d-flex justify-content-center">
                {this.state.items.map((item)=>{
                    return(
                    <div className="item-card col-4">
                        <img src={item.icon} width="36" height="36"/>
                        <div className="item-name">{item.name}</div>
                        <div className="item-price">{item.price}</div>
                        <div className="price-change">{item.change}</div>
                    </div>
                    );
                })}
                </div>
            </div>
        )
    }
}
