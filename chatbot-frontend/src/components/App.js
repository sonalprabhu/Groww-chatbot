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
import {close, changeState } from '../app/reducers/chatbotToggle';
import {clearMessages,storeMessages} from '../app/reducers/chatbotMessages';
import {connect} from 'react-redux';
import OrderPage from './OrderPage';
import FullFAQ from './FullFAQ';
import CategorySubQuestions from './CategorySubQuestion';

function App(props) {
  const userName=useSelector(state=>state.users.user.value);
  const userId=useSelector(state=>state.users.userId.value);
  const chatbotMessages=useSelector(state=>state.messages.value);
  const [currentMessages,setCurrent]=useState([]);
  const [user,setUser] =useState({userName,userId});
  const isOpen = useSelector(state => state.chatbot.value)
  const dispatch = useDispatch()
  if(document.querySelector(".react-chatbot-kit-chat-input-container")){
  document.querySelector(".react-chatbot-kit-chat-input-container").style.display = 'none';
  }

useEffect( () => {
  
    if(props)
    {
      setUser({userName:props.user.user,userId:props.user.userId})
    }
}, [props.user,props.messages]);


 const saveMessages = (messages) => {
   dispatch(storeMessages(messages))
};

const loadMessages = () => {
  var oldMessages=JSON.parse(JSON.stringify(chatbotMessages));
  let initialMessage;
  if(oldMessages)
  oldMessages=oldMessages.filter((messages)=>{
  if(messages.message && messages.message.includes('Hello'))
  initialMessage=messages;
  else if(messages.message && !messages.message.includes('Feel free to explore our wide category list') 
  && !messages.message.includes('These are some more categories') &&
  !messages.message.includes('These are the questions under this category') )
  return messages;
  })

  if(initialMessage)
  oldMessages.push(initialMessage)
  
  return oldMessages;
  // var oldMessages=chatbotMessages;
  // oldMessages=[]
  // return oldMessages;
};

const config={
  botName:"Groww Chatbot",
    initialMessages: [createChatBotMessage(`Hello !What would you like to know?`,{widget:"FAQ"}),],
    customStyles: {
      botMessageBox: {
        backgroundColor: "#00d09c",
      },
      chatButton: {
        backgroundColor: "#00d09c",
      },
    },
    customComponents: {
     header: () => <div className="react-chatbot-kit-chat-header">Groww Chatbot Assistant</div>
    },
    widgets: [
      {
        widgetName: "FAQ",
       widgetFunc: (props) => <FAQ {...props} />,
       props: {user:userName,userId:user.userId}
      },
      {
        widgetName:"FullFAQ",
        widgetFunc: (props) => <FullFAQ {...props} />,
      },
      {
        widgetName:"faqSubCategory",
        widgetFunc: (props) => <CategorySubQuestions {...props} />,
      }
  ],
};




  return (
    <div className="App">
      <Header user={user.userName} />
      <Switch><Route exact path={["/stocks/:id","/mutualfund/:id","/fd/:id","/gold/:id"]} component={ProductPage }/>}/> </Switch>
          <Switch> <Route exact path="/fd" render={()=> <Categories text="FD"/>} /> </Switch>
          <Switch> <Route exact path="/gold" render={()=> <Categories text="Gold"/>}/></Switch>
          <Switch> <Route exact path="/mutualfund" render={()=> <Categories text="Mutual Funds"/>} /></Switch>
          <Switch> <Route exact path="/stocks" component={()=> <Categories text="Stocks"/>} /> </Switch>
          <Switch> <Route exact path="/login" component={Login} /> </Switch>
          <Switch> <PrivateRoute exact path="/logout" isAuthenticated={user.userName !== 'guest'} component={Logout} /> </Switch>
          <Switch> <PrivateRoute path={["/dashboard/orders/stocks/:id","/dashboard/orders/mutualfund/:id","/dashboard/orders/fd/:id","/dashboard/orders/gold/:id"]} isAuthenticated={user.userName !== 'guest'} component={OrderPage} /> </Switch>
          <Switch> <PrivateRoute exact path={["/dashboard/orders/stocks","/dashboard/orders/mutualfund","/dashboard/orders/fd","/dashboard/orders/gold"]} isAuthenticated={user.userName !== 'guest'} component={Orders} /> </Switch>
          <Switch> <PrivateRoute exact path="/dashboard/account" isAuthenticated={user.userName !=='guest'} component={Account} /> </Switch> 
          <Redirect to="/stocks" from="/" />

      <div className="chatbot">
      {isOpen && ( 
        chatbotMessages.length==0 ? (
        <Chatbot config={config} 
        actionProvider={ActionProvider} messageParser={MessageParser} 
        saveMessages={saveMessages}
        />)
        :
      <Chatbot config={config} 
      actionProvider={ActionProvider} messageParser={MessageParser} 
      saveMessages={saveMessages} messageHistory={loadMessages()}
      />)}
      </div>  
      {!isOpen && chatbotMessages.length!=0 && (<Button className="clear-btn" onClick={() => dispatch(clearMessages())}><i className="fa fa-trash" aria-hidden="true"></i></Button>)}     
      <Button className="bot-btn" onClick={() => dispatch(changeState())}>&nbsp;</Button>
     

    </div>
  );
}

const mapStateToProps = (store) => {
  return { user: store.users ,messages:store.messages}
}

export default connect(mapStateToProps)(App);
