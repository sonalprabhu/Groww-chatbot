import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './components/App';
import { BrowserRouter} from 'react-router-dom';
import store from './app/store';
import {persistor} from './app/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
if(document.querySelector(".react-chatbot-kit-chat-input-container")){
  document.querySelector(".react-chatbot-kit-chat-input-container").style.display = 'none';
  }

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </PersistGate>
  </Provider>,
  document.getElementById('root')
);

if(module.hot){
  module.hot.accept()
}

