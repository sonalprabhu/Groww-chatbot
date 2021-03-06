//import { Button } from 'react-bootstrap';
import {Component} from 'react';
import { BrowserRouter, Link,Switch,Route,Redirect} from 'react-router-dom';
import growwLogo from '../assets/groww-logo.png';
import './App.css';
import Categories from './Categories';

export default function Header(props) {

  function changeClass(event){
    var selected=document.querySelector(".selected-option");
    selected.classList.remove("selected-option");
    var ele=event.target;
    ele.classList.add("selected-option");
  }

  function onClick(event){
    changeClass(event);
    props.refreshChatbot(event);
  }

    return (
      <div className="container-fluid main">
          <div className="row" style={{'min-height':'81px'}}>
          <div className="container web-align">
          <img src={growwLogo} alt="logo" height="40px" width="148px" offset="1000"/>
          <a className="mainLabel" href="#">Explore</a>
          <a className="mainLabel" href="#">Investments</a>
          </div>
          </div>
          <BrowserRouter>
          <div className="row options">
          <div className="container web-align">
          <Link to="/stocks" className="subLabel selected-option" onClick={onClick}>Stocks</Link>
          <Link to="/mutualfund" className="subLabel" onClick={onClick}>Mutual Funds</Link>
          <Link to="/fd" className="subLabel" onClick={onClick}>Fixed Deposits</Link>
          <Link to="/gold" className="subLabel" onClick={onClick}>Gold</Link>
          <Redirect to="/stocks" from="/" />
          </div>
          </div>
          <div className="container web-align wrapper">
      <Switch> <Route path="/fd" render={()=> <Categories text="FD"/>} /> </Switch>
      <Switch> <Route path="/gold" render={()=> <Categories text="Gold"/>}/></Switch>
      <Switch> <Route path="/mutualfund" render={()=> <Categories text="Mutual Funds"/>} /></Switch>
      <Switch> <Route exact path="/stocks" render={()=> <Categories text="Stocks"/>} /> </Switch>
      </div>
          </BrowserRouter>
      </div>
    );
   
  }
  
