import '../components/App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import Cookies from "js-cookie";

export default function CategoryQuestions(props) {
    const currentLoc = window.location.pathname;
    const [options,setOptions]=useState([]);
    const userId=useSelector(state=>state.users.userId.value);
    if(document.querySelector(".react-chatbot-kit-chat-input-container")){
      document.querySelector(".react-chatbot-kit-chat-input-container").style.display = 'none';
      }
   

    useEffect(async () => {
        var categoryId=Cookies.get('categoryId');
          var questions =  await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-question-by-category/${categoryId}`)
          .then(res => {
            return res.data;
          });
          setOptions(questions);
          Cookies.remove('categoryId')
       
      
  }, []); 
  

  
      const optionsMarkup = options.map((option) =>
      {
      return (
        <div>
        <button
          className="custom-button"
          key={option.QuestionId+option.QuestionPos}
          onClick={()=>{props.actionProvider.handleQuestionClick(option)}}        > 
          {option.QuestionText}
        </button>
        <div>
        <button onClick={()=>props.actionProvider.handleQuestionLike(option)} ><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></button>
        <button onClick={()=>props.actionProvider.handleQuestionDislike(option)} ><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></button>
        </div>
        </div>
      )});
    
      return(
        <div className="learning-options-container">
        {optionsMarkup}</div>
      );
}
