import React from 'react';
import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';
import { useSelector} from 'react-redux'
import SubHeader from './SubHeader';
import userLogo from '../assets/user-male.png';

export default function Account(props) {
    const [user,setUser] = useState([]);
    const userId=useSelector(state=>state.users.userId);
    
    useEffect(() => {
        async function fetchData(){ 
        var user = await axios.get(`http://localhost:8081/getUserDetails/${userId}`)
      .then(res => {
        return res.data;
      });
        setUser(user);
    }
    fetchData();
  
    }, []);


    return (
        <div>
        <SubHeader/>
        <div className="container web-align wrapper">
        <div className="account-section">
            <div className="leftBox">
            <div className="account-wrapper">
            <div><img class=" profilePic circle" alt="Groww" src={userLogo} /></div>
            <div class="">{user.userName}</div>
            </div>
            </div>
            <div className="rightBox">
             <div className="label">Name :</div>
             <div className="label-value"> {user.userName} </div>
             <div className="label" >DOB:</div>
             <div className="label-value"> {user.userDOB} </div>
             <div className="label">Marital Status :</div>
             <div className="label-value"> {user.userMaritalStatus} </div>
             </div>
        </div>
        </div>
        </div>
    )
}
