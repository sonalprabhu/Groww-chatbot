import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../chatbot/ActionProvider';
import MessageParser from '../chatbot/MessageParser';
import Config from '../chatbot/config';
import Button from 'react-bootstrap/esm/Button';
import { BrowserRouter, useLocation} from 'react-router-dom';
function App(props) {

  const [showBot, toggleBot] = useState(false);
  const [user,setUser] =useState('guest');


 const saveMessages = (messages) => {
  localStorage.setItem("chat_messages", JSON.stringify(messages));
};

const loadMessages = () => {
  const messages = JSON.parse(localStorage.getItem("chat_messages"));
  return messages;
};


  return (
    <div className="App">
      <BrowserRouter>
      <Header refreshChatbot={() =>toggleBot(false) }/>
      <div className="chatbot">
      {showBot && ( 
      <Chatbot config={Config()} 
      actionProvider={ActionProvider} messageParser={MessageParser} 
      messageHistory={loadMessages()}
      saveMessages={saveMessages}/>)}
       <Button className="bot-btn" onClick={() => toggleBot((prev) => !prev)}>&nbsp;</Button>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
