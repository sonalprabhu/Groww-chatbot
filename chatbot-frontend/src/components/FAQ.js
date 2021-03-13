import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function FAQ(props) {
  var mapper={
    "stocks":'Stocks',
    "fd":'FDs',
    "gold":'Gold',
    "mutualfund":'Mutual Funds'
  }
    const currentLoc = window.location.pathname;
    const [options,setOptions]=useState([]);
   

    useEffect(async () => {
      const products = ['Stocks','FDs','Gold','Mutual Funds'];
      var userId;
      if(props.user == 'guest')
        userId = null;
      else
      userId ="604a5406f9fce44e70ed0f94";  //Sample user Id from database used for time being
      var context = currentLoc.split('/');
      var contextLength = context.length;
      var categoryName;
      var mainCategory = context[contextLength-1];
      if(contextLength === 2)
      {
        if(products.indexOf(mapper[context[contextLength-1]]) > -1 )
        {
          categoryName = mapper[context[contextLength-1]];
          var questions = await axios.get(`http://localhost:8081/search-on-category`,{ params: { categoryName:categoryName} })
          .then(res => {
            return res.data;
          });
          setOptions(questions);

        }
        else if(mainCategory=='orders' && props.user!='guest')
        {
          var questions = await axios.get(`http://localhost:8081/user-specific-order-details`,{ params: { user:userId} })
          .then(res => {
            return res.data;
          });
          setOptions(questions);

        }
        else if(mainCategory=='account' && props.user!='guest')
        {
          var questions = await axios.get(`http://localhost:8081/user-account-questions`,{ params: { user:userId} })
          .then(res => {
            return res.data;
          });
          setOptions(questions);
        }
      }
      else if(contextLength === 3)
      {
        var orderId;
        var productId="604a5406f9fce44e70ed0f97";
        mainCategory = mapper[context[contextLength-2]]
        if(products.indexOf(mapper[context[contextLength-2]]) > -1 )
        {
          var questions = await axios.get(`http://localhost:8081/product-specific-questions`,{ params: { product:productId,user:userId} })
          .then(res => {
            return res.data;
          });
          setOptions(questions);
        }
        else if(mainCategory === 'orders')
        {
          var questions = await axios.get(`http://localhost:8081/order-specific-questions`,{ params: { order: orderId,user:userId} })
          .then(res => {
            return res.data;
          });
          setOptions(questions);
        }
      }
  
      
  }, []); 
  

  
      const optionsMarkup = options.map((option) => (
        <button
          className="learning-option-button"
          key={option.QuestionId}
          onClick={()=>props.actionProvider.handleQuestionClick(option)}
        >
          {option.QuestionText}
        </button>
      ));
    
      return(
        <div className="learning-options-container">
        {optionsMarkup}</div>
      );
}
