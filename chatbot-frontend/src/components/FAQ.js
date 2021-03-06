import React from 'react';
import './App.css';
import { useLocation } from 'react-router-dom';

export default function FAQ(props) {
    const location = useLocation();
    const currentLoc = window.location.pathname;

    const mapper={
      "/stocks":"Stocks",
      "/fd":"FD",
      "/gold":"Gold",
      "/mutualfund":"Mutual Funds"
    }

    console.log(mapper[currentLoc])
    const options = [
        {
          text: "Account",
          handler: props.actionProvider.handleAccountList,
          id: 1,
        },
        { text: "Stocks", handler:props.actionProvider.handleAccountList, id: 2 },
        { text: "Mutual Funds", handler:props.actionProvider.handleAccountList, id: 3 },
        { text: "FD", handler:props.actionProvider.handleAccountList, id: 4 },
        { text: "Gold", handler:props.actionProvider.handleAccountList, id: 5 },
      ];
    
      const selectedOptions = options.filter((option)=> option.text == mapper[currentLoc])
      const optionsMarkup = selectedOptions.map((option) => (
        <button
          className="learning-option-button"
          key={option.id}
          onClick={()=>option.handler(option.text)}
        >
          {option.text}
        </button>
      ));
    
      return(
        <div className="learning-options-container">{optionsMarkup}</div>
      );
}
