import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../chatbot/ActionProvider';
import MessageParser from '../chatbot/MessageParser';
import Button from 'react-bootstrap/Button';
import { createChatBotMessage} from "react-chatbot-kit";
import FAQ from '../components/FAQ';
import { Switch,Route,Redirect} from 'react-router-dom';
import Categories from './Categories';
import ProductPage from './ProductPage'
import Orders from './Orders';
import Account from './Account';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Logout from './Logout';
import { useSelector, useDispatch } from 'react-redux'
import { changeState } from '../app/reducers/chatbotToggle'
import {connect} from 'react-redux';
import OrderPage from './OrderPage';

function App(props) {
  const userName=useSelector(state=>state.users.user.value);
  const userId=useSelector(state=>state.users.userId.value);
  const [user,setUser] =useState({userName,userId});
  const isOpen = useSelector(state => state.chatbot.value)
  const dispatch = useDispatch()
  const [isLogIn,setIsLogIn] = useState(false)
  async function checkAuth(){
    const isLoggedIn = await axios.get('http://localhost:8081/checkAuth',{params:{user:user.userId}},{withCredentials:true})
    .then((response)=>{
  return response.data.auth})
    .catch((err)=>{
      return false})
      setIsLogIn(isLoggedIn)
  }
  checkAuth()

useEffect( () => {
    if(props)
    {
      setUser({userName:props.user.user,userId:props.user.userId})
    }
}, [props.user]);


 const saveMessages = (messages) => {
  localStorage.setItem("chat_messages", JSON.stringify(messages));
};

const loadMessages = () => {
  const messages = JSON.parse(localStorage.getItem("chat_messages"));
  return messages;
};

const config={
  botName:"Groww Chatbot",
    initialMessages: [createChatBotMessage(`Hello ${user.userName} !What do you want to know?`,{widget:"FAQ"}),],
    customStyles: {
      botMessageBox: {
        backgroundColor: "#00d09c",
      },
      chatButton: {
        backgroundColor: "#00d09c",
      },
    },
    widgets: [
      {
        widgetName: "FAQ",
       widgetFunc: (props) => <FAQ {...props} />,
       props: {user:userName,userId:user.userId}
      }
  ],
}


  return (
    <div className="App">
      <Header user={user.userName} />
      <Switch><Route exact path={["/stocks/:id","/mutualfund/:id","/fd/:id","/gold/:id"]} component={ProductPage }/>}/> </Switch>
          <Switch> <Route exact path="/fd" render={()=> <Categories text="FD"/>} /> </Switch>
          <Switch> <Route exact path="/gold" render={()=> <Categories text="Gold"/>}/></Switch>
          <Switch> <Route exact path="/mutualfund" render={()=> <Categories text="Mutual Funds"/>} /></Switch>
          <Switch> <Route exact path="/stocks" component={()=> <Categories text="Stocks"/>} /> </Switch>
          <Switch> <Route exact path="/login" component={Login} /> </Switch>
          <Switch> <PrivateRoute exact path="/logout" isAuthenticated={userName !== 'guest'} component={Logout} /> </Switch>
          <Switch> <PrivateRoute path={["/dashboard/orders/stocks/:id","/dashboard/orders/mutualfund/:id","/dashboard/orders/fd/:id","/dashboard/orders/gold/:id"]} isAuthenticated={isLogIn === true} component={OrderPage} /> </Switch>
          <Switch> <PrivateRoute exact path={["/dashboard/orders/stocks","/dashboard/orders/mutualfund","/dashboard/orders/fd","/dashboard/orders/gold"]} isAuthenticated={isLogIn === true} component={Orders} /> </Switch>
          <Switch> <PrivateRoute exact path="/dashboard/account" isAuthenticated={isLogIn === true} component={Account} /> </Switch> 

      <div className="chatbot">
      {isOpen && ( 
      <Chatbot config={config} 
      actionProvider={ActionProvider} messageParser={MessageParser} state={userId}/>)}
      </div>       
      <Button className="bot-btn" onClick={() => dispatch(changeState())}>&nbsp;</Button>

    </div>
  );
}

const mapStateToProps = (store) => {
  return { user: store.users }
}

export default connect(mapStateToProps)(App);
