import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import Cookies from "js-cookie";

export default function CategoryQuestions(props) {
    const currentLoc = window.location.pathname;
    const [options,setOptions]=useState([]);
    const userId=useSelector(state=>state.users.userId.value)
   

    useEffect(async () => {
        var categoryId=Cookies.get('categoryId');
          var questions =  await axios.get(`http://localhost:8081/get-question-by-category/${categoryId}`)
          .then(res => {
            return res.data;
          });
          setOptions(questions);
          Cookies.remove('categoryId')
       
      
  }, []); 
  

  
      const optionsMarkup = options.map((option) =>
      {
      return (
  
        <button
          className="learning-option-button"
          key={option.QuestionId}
          onClick={()=>{props.actionProvider.handleQuestionClick(option)}}        > 
          {option.QuestionText}
        </button>
      )});
    
      return(
        <div className="learning-options-container">
        {optionsMarkup}</div>
      );
}
