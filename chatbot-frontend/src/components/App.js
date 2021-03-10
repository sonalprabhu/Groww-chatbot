import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../chatbot/ActionProvider';
import MessageParser from '../chatbot/MessageParser';
import config from '../chatbot/config';
import Button from 'react-bootstrap/esm/Button';
import { BrowserRouter, useLocation} from 'react-router-dom';
import { createChatBotMessage} from "react-chatbot-kit";
import FAQ from '../components/FAQ';

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
      <BrowserRouter>
      <Header user={user} login={()=>login()} refreshChatbot={() =>toggleBot(false) }/>
      <div className="chatbot">
      {showBot && ( 
      <Chatbot config={config} 
      actionProvider={ActionProvider} messageParser={MessageParser} />)}
       <Button className="bot-btn" onClick={() => toggleBot((prev) => !prev)}>&nbsp;</Button>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
