import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Link,Switch,Route,Redirect} from 'react-router-dom';

function Categories(props) {
    const reverseMapper={
        "Stocks":"/stocks",
        "FD":"/fd",
        "Gold":"/gold",
        "Mutual Funds":"/mutualfund"
      }

    const products=[
   {_id:1,name:"Bharti Airtel",price:123,change:23,icon:"https://assets-netstorage.groww.in/stock-assets/logos/INE397D01024.png"},
   {_id:2,name:"Yes Bank",price:123,change:23,icon:"https://assets-netstorage.groww.in/stock-assets/logos/INE528G01027.png"},
   {_id:3,name:"Ircon International",price:123,change:23,icon:"https://assets-netstorage.groww.in/stock-assets/logos/INE962Y01013.png"},
   {_id:4,name:"Ruchi Soya Inds",price:123,change:23,icon:"https://assets-netstorage.groww.in/stock-assets/logos/INE619A01027.png"},
          ];

   return (
       <div >
            <h1 className="heading">{props.text} in News</h1>
               <div className="row d-flex justify-content-center">
               {products.map((item)=>{
                   return(
                    <Link to={{
                        pathname:reverseMapper[props.text]+'/'+item._id, aboutProps:{item}
                    }} 
                    className="clickable" name="stock">
                   <div className="item-card col-4" key={item._id}>
                       <img src={item.icon} width="36" height="36"/>
                       <div className="item-name">{item.name}</div>
                       <div className="item-price">{item.price}</div>
                       <div className="price-change">{item.change}</div>
                   </div>
                   </Link>
                   );
               })}
               </div>
       </div>
   );
}

export default Categories;
