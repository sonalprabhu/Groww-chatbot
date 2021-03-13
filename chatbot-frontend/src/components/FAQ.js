import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function FAQ(props) {
  const mapper={
    "/stocks":"Stocks",
    "/fd":"FDs",
    "/gold":"Gold",
    "/mutualfund":"Mutual Funds"
  }

    const currentLoc = window.location.pathname;
    const [options,setOptions]=useState([]);
    const currentRoute = mapper[currentLoc];

    useEffect(async () => {

      var questions = await axios.get(`http://localhost:8081/search-on-category`,{ params: { categoryName: currentRoute } })
      .then(res => {
        return res.data;
      });
      setOptions(questions);

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
