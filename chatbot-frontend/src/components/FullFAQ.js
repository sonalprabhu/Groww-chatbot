import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector} from 'react-redux'

export default function FullFAQ(props) {

    const currentLoc = window.location.pathname;
    const [options,setOptions]=useState([]);
    const userId=useSelector(state=>state.users.userId.value)
   

    useEffect(async () => {
        var queryParams ={};
        if(userId!== '')
        queryParams.user = userId;
          var questions = await axios.get(`http://localhost:8081/get-all-categories`,{params:queryParams})
          .then(res => {
            return res.data;
          });
          setOptions(questions);
       
      
  }, []); 
  

  
      const optionsMarkup = options.map((option) => (
        <button
          className="learning-option-button"
          key={option.categoryId}
          onClick={()=>props.actionProvider.handleCategoryClick(option)}
        >
          {option.Name}
        </button>
      ));
    
      return(
        <div className="learning-options-container">
        {optionsMarkup}</div>
      );
}
