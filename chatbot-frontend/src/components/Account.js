import React from 'react';
import { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';
import { useSelector} from 'react-redux'
import userLogo from '../assets/user-male.png';
import { Link} from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { close} from '../app/reducers/chatbotToggle';

export default function Account(props) {
    const [user,setUser] = useState([]);
    const userId=useSelector(state=>state.users.userId);
    const dispatch = useDispatch();
    
    useEffect(() => {
        async function fetchData(){ 
        var user = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getUserDetails/${userId}`)
      .then(res => {
        return res.data;
      });
        setUser(user);
    }
    fetchData();
  
    }, [userId]);


    return (
        <div>
       
        <div className="container web-align wrapper">
        <div className="account-section">
            <div className="leftBox">
            <div className="account-wrapper">
            <div><img className=" profilePic circle" alt="Groww" src={userLogo} /></div>
            <div className="">{user.userName}</div>
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
        <Link  to="/dashboard/account/settings" className="sideLabel" onClick={()=>dispatch(close())}>Configure settings</Link>
        </div>
    )
}
