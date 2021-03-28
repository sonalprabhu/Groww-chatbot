import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector} from 'react-redux'
import Cookies from "js-cookie";

export default function FullFAQ(props) {

    const currentLoc = window.location.pathname;
    const [options,setOptions]=useState([]);
    const userId=useSelector(state=>state.users.userId.value)
   

    useEffect(async () => {
      var queryParams ={};
        if(userId!== '')
        queryParams.user = userId;
        var categoryId=Cookies.get('categoryId');
        if(categoryId)
        queryParams.id=categoryId;
          var questions = await axios.get(`http://localhost:8081/get-all-categories`,{params:queryParams})
          .then(res => {
            return res.data;
          });
          setOptions(questions);
          Cookies.remove('categoryId')
       
      
  }, []); 
  

  
      const optionsMarkup = options.map((option) => {
      return(
        <button
          className="learning-option-button"
          key={option.categoryId}
          onClick={()=>{if(option.hasSubCategory) props.actionProvider.handleCategoryClick(option);
            else if(option.hasSubCategory === false) props.actionProvider.handleCategoryQuestionClick(option);
          else props.actionProvider.handleCategoryClick(option);}}
        >
          {option.Name}
        </button>
      )});
    
      return(
        <div className="learning-options-container">
        {optionsMarkup}</div>
      );
}
