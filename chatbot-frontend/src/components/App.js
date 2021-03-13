import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../chatbot/ActionProvider';
import MessageParser from '../chatbot/MessageParser';
import Button from 'react-bootstrap/Button';
import { createChatBotMessage} from "react-chatbot-kit";
import FAQ from '../components/FAQ';
import { BrowserRouter, Link,Switch,Route,Redirect} from 'react-router-dom';
import Categories from './Categories';
import ProductPage from './ProductPage'
import Orders from './Orders';
import Account from './Account';
import PrivateRoute from './PrivateRoute';

function App(props) {

  const [showBot, toggleBot] = useState(false);
  const [user,setUser] =useState('guest');

function login()
{
  setUser('Sonal');
}


 const saveMessages = (messages) => {
  localStorage.setItem("chat_messages", JSON.stringify(messages));
};

const loadMessages = () => {
  const messages = JSON.parse(localStorage.getItem("chat_messages"));
  return messages;
};

const config={
  botName:"Groww Chatbot",
    initialMessages: [createChatBotMessage(`Hello ${user} !What do you want to know?`,{widget:"FAQ"}),],
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
       props: {user:user}
      },
  ],
}


  return (
    <div className="App">
      <Header user={user} login={()=>login()} refreshChatbot={() =>toggleBot(false) }/>
      <div className="container web-align wrapper">
          <Switch><Route path="/:product/:id" component={ProductPage }/>}/> </Switch> 
          <Switch> <Route exact path="/fd" render={()=> <Categories text="FD"/>} /> </Switch>
          <Switch> <Route exact path="/gold" render={()=> <Categories text="Gold"/>}/></Switch>
          <Switch> <Route exact path="/mutualfund" render={()=> <Categories text="Mutual Funds"/>} /></Switch>
          <Switch> <Route exact path="/stocks" component={()=> <Categories text="Stocks"/>} /> </Switch>
          <Switch> <PrivateRoute exact path="/orders" isAuthenticated={user !== 'guest'} component={Orders} /> </Switch>
          <Switch> <PrivateRoute exact path="/account" isAuthenticated={user !== 'guest'} component={Account} /> </Switch>
      </div>
      <div className="chatbot">
      {showBot && ( 
      <Chatbot config={config} 
      actionProvider={ActionProvider} messageParser={MessageParser} />)}
       <Button className="bot-btn" onClick={() => toggleBot((prev) => !prev)}>&nbsp;</Button>
      </div>
    </div>
  );
}

export default App;
