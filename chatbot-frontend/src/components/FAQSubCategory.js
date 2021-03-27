import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import Cookies from "js-cookie";

export default function FAQSubCategory(props) {
    const currentLoc = window.location.pathname;
    const [options,setOptions]=useState([]);
    const userId=useSelector(state=>state.users.userId.value)
   

    useEffect(async () => {
        var queryParams ={};
        var categoryId=Cookies.get('categoryId');
        if(userId!== '')
        queryParams.user = userId;
          var questions = await axios.get(`http://localhost:8081/get-question-by-category/${categoryId}`)
          .then(res => {
            return res.data;
          });
          setOptions(questions);
       
      
  }, []); 
  

  
      const optionsMarkup = options.map((option) => (
        <button
          className="learning-option-button"
          key={option.categoryId}
          onClick={()=>props.actionProvider.handleCategoryClick(option.Name)}
        >
          {option.Name}
        </button>
      ));
    
      return(
        <div className="learning-options-container">
        {optionsMarkup}</div>
      );
}
