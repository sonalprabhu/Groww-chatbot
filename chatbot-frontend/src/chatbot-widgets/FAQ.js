import '../components/App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function FAQ(props) {
  if (document.querySelector(".react-chatbot-kit-chat-input-container")) {
    document.querySelector(".react-chatbot-kit-chat-input-container").style.display = 'none';
  }
  var mapper = {
    "stocks": 'Stocks',
    "fd": 'FDs',
    "gold": 'Gold',
    "mutualfund": 'Mutual Funds'
  }
  const currentLoc = window.location.pathname;
  const [options, setOptions] = useState([]);
  var optionsMarkup;



  useEffect(async () => {
    const products = ['Stocks', 'FDs', 'Gold', 'Mutual Funds'];
    var context = currentLoc.split('/');
    var contextLength = context.length;
    var questions;
    var mainCategory = context[contextLength - 1];
    var urlParams = {};
    if (props.userId !== '')
      urlParams.user = props.userId;
    if (contextLength === 2) {
      if (products.indexOf(mapper[context[contextLength - 1]]) > -1) {
        urlParams.categoryName = mapper[context[contextLength - 1]];
        questions = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/search-on-category`, { params: urlParams })
          .then(res => {
            return res.data;
          });
        setOptions(questions);
      }
    }
    else if (contextLength === 3) {
      if (mainCategory === 'account' && props.user !== 'guest') {
        questions = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user-account-questions`, { params: urlParams })
          .then(res => {
            return res.data;
          });
        setOptions(questions);
      }
      else if (products.indexOf(mapper[context[contextLength - 2]]) > -1) {
        urlParams.product = context[contextLength - 1];
        questions = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/product-specific-questions`, { params: urlParams })
          .then(res => {
            return res.data;
          });
        setOptions(questions);
      }
    }
    else if (contextLength === 4) {
      mainCategory = context[contextLength - 2]
      if (mainCategory === 'orders' && props.user !== 'guest') {
        questions = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user-specific-order-details`, { params: urlParams })
          .then(res => {
            return res.data;
          });
        setOptions(questions);

      }
    }
    else if (contextLength === 5) {
      mainCategory = context[2];
      urlParams.order = context[contextLength - 1];
      if (mainCategory === 'orders') {
        questions = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/order-specific-questions`, { params: urlParams })
          .then(res => {
            return res.data;
          });
        setOptions(questions);
      }
    }


  }, []);


  optionsMarkup = options.slice(0,options.length > 7 ? 7:options.length).map((option) => (
    <div>
      <button
        className="custom-button"
        key={option.QuestionId + option.QuestionPos}
        onClick={() => props.actionProvider.handleQuestionClick(option)}
      >
        {option.QuestionText}
      </button>
      <div>
        <button onClick={() => props.actionProvider.handleQuestionLike(option)} ><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></button>
        <button onClick={() => props.actionProvider.handleQuestionDislike(option)} ><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></button>
      </div>
    </div>
  ));
  optionsMarkup.push(<button
    className="custom-button"
    key="1"
    onClick={() => props.actionProvider.handleMoreQuestionsClick()}
  >
    {"Have more queries?"}
  </button>)

  return (
    <div className="learning-options-container">
      {optionsMarkup}
      {optionsMarkup && props.scrollIntoView}</div>
  );
}
