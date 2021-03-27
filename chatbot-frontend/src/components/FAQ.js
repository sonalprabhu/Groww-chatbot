import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector} from 'react-redux'

export default function FAQ(props) {
  var mapper={
    "stocks":'Stocks',
    "fd":'FDs',
    "gold":'Gold',
    "mutualfund":'Mutual Funds'
  }
    const currentLoc = window.location.pathname;
    const [options,setOptions]=useState([]);
    const userId=useSelector(state=>state.users.userId.value)
   

    useEffect(async () => {
      const products = ['Stocks','FDs','Gold','Mutual Funds'];
      var context = currentLoc.split('/');
      var contextLength = context.length;
      var categoryName,questions;
      var mainCategory = context[contextLength-1];
      if(contextLength === 2)
      {
        if(products.indexOf(mapper[context[contextLength-1]]) > -1 )
        {
          categoryName = mapper[context[contextLength-1]];
          questions = await axios.get(`http://localhost:8081/search-on-category`,{ params: { categoryName:categoryName,user:props.userId} })
          .then(res => {
            return res.data;
          });
          setOptions(questions);
        }
      }
      else if(contextLength === 3)
      {
        var orderId;
        if(mainCategory === 'account' && props.user !== 'guest')
        {
          questions = await axios.get(`http://localhost:8081/user-account-questions`,{ params: { user:props.userId} })
          .then(res => {
            return res.data;
          });
          setOptions(questions);
        } 
        else if(products.indexOf(mapper[context[contextLength-2]]) > -1 )
        {
          var productId=context[contextLength-1];
          questions = await axios.get(`http://localhost:8081/product-specific-questions`,{ params: { product:productId,user:props.userId} })
          .then(res => {
            return res.data;
          });
          setOptions(questions);
        }
      }
      else if(contextLength === 4){
        mainCategory = context[contextLength-2]
        if(mainCategory === 'orders' && props.user!== 'guest')
        {
          questions = await axios.get(`http://localhost:8081/user-specific-order-details`,{ params: { user:props.userId} })
          .then(res => {
            return res.data;
          });
          setOptions(questions);

        }
      }
      else if(contextLength === 5){
        mainCategory = context[2];
        var orderId = context[contextLength-1];
        if(mainCategory === 'orders')
        {
          questions = await axios.get(`http://localhost:8081/order-specific-questions`,{ params: { order: orderId,user:props.userId} })
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