import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function FAQ(props) {
    const currentLoc = window.location.pathname;
    const [options,setOptions]=useState([]);

    useEffect(async () => {

      var questions = await axios.get(`http://localhost:8081/questions`)
      .then(res => {
        return res.data.questions;
      });
      setOptions(questions);

  }, []);


    const mapper={
      "/stocks":"Stocks",
      "/fd":"FD",
      "/gold":"Gold",
      "/mutualfund":"Mutual Funds"
    }
  
    
      //const selectedOptions = options.filter((option)=> option.text === mapper[currentLoc])
      const optionsMarkup = options.map((option) => (
        <button
          className="learning-option-button"
          key={option.id}
          onClick={()=>props.actionProvider.handleQuestionClick(option)}
        >
          {option.questionText}
        </button>
      ));
    
      return(
        <div className="learning-options-container">
        {optionsMarkup}</div>
      );
}
